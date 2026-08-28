import { A2A_PROTOCOL_VERSION, type AgentCard } from "@a2a-js/sdk";
import { portfolio } from "@/content/portfolio";

export function createAgentCard(siteUrl: string): AgentCard {
  return {
    name: portfolio.agent.name,
    description: portfolio.agent.description,
    supportedInterfaces: [
      {
        url: `${siteUrl}/a2a`,
        protocolBinding: "JSONRPC",
        protocolVersion: A2A_PROTOCOL_VERSION,
        tenant: "",
      },
    ],
    provider: {
      organization: portfolio.person.name,
      url: siteUrl,
    },
    version: portfolio.agent.version,
    documentationUrl: siteUrl,
    capabilities: {
      streaming: false,
      pushNotifications: false,
      extendedAgentCard: false,
      extensions: [],
    },
    securitySchemes: {},
    securityRequirements: [],
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/plain", "application/json"],
    skills: [
      {
        id: "answer-about-vaishnav",
        name: "Answer about Vaishnav",
        description:
          "Answer grounded questions about Vaishnav's public profile, capabilities, current interests, and contact options.",
        tags: ["profile", "capabilities", "contact"],
        examples: [portfolio.agent.suggestedPrompts[0], portfolio.agent.suggestedPrompts[3]],
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
        securityRequirements: [],
      },
      {
        id: "find-relevant-work",
        name: "Find relevant work",
        description: "Find and explain projects relevant to a problem, technology, or opportunity.",
        tags: ["projects", "developer tools", "infrastructure"],
        examples: [portfolio.agent.suggestedPrompts[1]],
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
        securityRequirements: [],
      },
      {
        id: "find-writing",
        name: "Find writing",
        description: "Find Vaishnav's published technical writing, thoughts, and poetry by topic.",
        tags: ["writing", "networking", "systems"],
        examples: [portfolio.agent.suggestedPrompts[2]],
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
        securityRequirements: [],
      },
    ],
    signatures: [],
  };
}
