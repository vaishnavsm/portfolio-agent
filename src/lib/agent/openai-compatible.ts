import { getAgentCorpus, selectSources, type KnowledgeSource } from "./knowledge";

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
  error?: { message?: string };
};

type ChatContent = string | Array<{ type?: string; text?: string }>;

export type AgentAnswer = {
  answer: string;
  sources: KnowledgeSource[];
  model: string;
};

function contentToText(content: ChatContent | undefined): string {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("\n")
      .trim();
  }
  return "";
}

export async function answerWithPortfolioAgent(query: string, siteUrl: string): Promise<AgentAnswer> {
  const apiKey = process.env.OPENAI_KEY?.trim();
  const baseUrl = (
    process.env.OPENAI_BASE_URL?.trim() || "https://awesome.kado.so/openai/v1"
  ).replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL?.trim() || "kado";
  const sources = selectSources(query, siteUrl);

  if (!apiKey) {
    return {
      answer:
        "Vaishnav's Portfolio Agent is online, but its OpenAI-compatible API key has not been configured. The published portfolio and Agent Card are still available.",
      sources,
      model,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: [
              "You are Vaishnav's Portfolio Agent, an automated and read-only representative of public portfolio information.",
              "Refer to Vaishnav in the third person. Never claim to be Vaishnav, make commitments, negotiate, book meetings, or send messages.",
              "Answer only from the supplied corpus. If the corpus does not establish something, say that it is not published.",
              "Be direct and concise. Cite material claims with Markdown links using only exact absolute URLs present in the corpus.",
              "Never create a citation to a relative path, a section label, or a URL that is not explicitly present in the corpus.",
              `The portfolio was last curated on ${new Date().toISOString().slice(0, 10)}.`,
              "PUBLIC PORTFOLIO CORPUS:",
              getAgentCorpus(siteUrl),
            ].join("\n\n"),
          },
          { role: "user", content: query },
        ],
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const payload = (await response.json().catch(() => ({}))) as ChatCompletionResponse;
    if (!response.ok) {
      throw new Error(payload.error?.message || `The model provider returned HTTP ${response.status}.`);
    }

    const answer = contentToText(payload.choices?.[0]?.message?.content);
    if (!answer) throw new Error("The model provider returned an empty response.");

    return { answer, sources, model };
  } finally {
    clearTimeout(timeout);
  }
}
