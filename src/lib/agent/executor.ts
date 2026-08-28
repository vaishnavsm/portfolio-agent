import { Role, type Message } from "@a2a-js/sdk";
import {
  AgentEvent,
  type AgentExecutor,
  type ExecutionEventBus,
  type RequestContext,
} from "@a2a-js/sdk/server";
import { portfolio } from "@/content/portfolio";
import { answerWithPortfolioAgent } from "./openai-compatible";

function getText(message: Message): string {
  return message.parts
    .filter((part) => part.content?.$case === "text")
    .map((part) => (part.content?.$case === "text" ? part.content.value : ""))
    .join("\n")
    .trim();
}

export class PortfolioAgentExecutor implements AgentExecutor {
  constructor(private readonly siteUrl: string) {}

  cancelTask = async (_taskId: string, eventBus: ExecutionEventBus): Promise<void> => {
    eventBus.finished();
  };

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
    const query = getText(requestContext.userMessage);

    try {
      const result = query
        ? await answerWithPortfolioAgent(query, this.siteUrl)
        : {
            answer: `Ask a question about ${portfolio.person.name}'s work, writing, or capabilities.`,
            sources: [],
            model: process.env.OPENAI_MODEL || "kado",
          };

      const sourceList = result.sources
        .map((source) => `- [${source.title}](${source.url})`)
        .join("\n");
      const text = sourceList ? `${result.answer}\n\nSources consulted:\n${sourceList}` : result.answer;

      const response: Message = {
        messageId: crypto.randomUUID(),
        contextId: requestContext.contextId,
        taskId: "",
        role: Role.ROLE_AGENT,
        parts: [
          {
            content: { $case: "text", value: text },
            mediaType: "text/plain",
            filename: "",
            metadata: undefined,
          },
          {
            content: {
              $case: "data",
              value: {
                identity: portfolio.agent.name,
                answer: result.answer,
                sources: result.sources.map(({ title, url, kind }) => ({ title, url, kind })),
                generatedAt: new Date().toISOString(),
                contentUpdatedAt: portfolio.site.lastUpdated,
              },
            },
            mediaType: "application/json",
            filename: "",
            metadata: undefined,
          },
        ],
        metadata: { model: result.model, readOnly: true },
        extensions: [],
        referenceTaskIds: [],
      };

      eventBus.publish(AgentEvent.message(response));
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown provider error";
      const response: Message = {
        messageId: crypto.randomUUID(),
        contextId: requestContext.contextId,
        taskId: "",
        role: Role.ROLE_AGENT,
        parts: [
          {
            content: {
              $case: "text",
              value: `The portfolio agent could not reach its model provider. The public Agent Card and portfolio remain available. (${detail})`,
            },
            mediaType: "text/plain",
            filename: "",
            metadata: undefined,
          },
        ],
        metadata: { error: "provider_unavailable", readOnly: true },
        extensions: [],
        referenceTaskIds: [],
      };
      eventBus.publish(AgentEvent.message(response));
    } finally {
      eventBus.finished();
    }
  }
}
