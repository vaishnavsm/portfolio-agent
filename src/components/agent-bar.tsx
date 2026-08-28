"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

const agents = [
  {
    kind: "codex",
    label: "Codex",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/codex.svg",
  },
  {
    kind: "claude",
    label: "Claude",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg",
  },
  {
    kind: "copy",
    label: "OpenCode",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/opencode.svg",
  },
  {
    kind: "copy",
    label: "Pi",
    iconUrl: "https://agentskills.io/images/logos/pi/pi-logo-light.svg",
  },
  {
    kind: "copy",
    label: "Grok",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/grok.svg",
  },
  {
    kind: "cursor",
    label: "Cursor",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/cursor.svg",
  },
  {
    kind: "copy",
    label: "Gemini",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
  },
  {
    kind: "copy",
    label: "Hermes",
    iconUrl:
      "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/website/static/img/logo.png",
  },
  {
    kind: "copy",
    label: "OpenClaw",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openclaw.svg",
  },
  {
    kind: "copy",
    label: "Kimi",
    iconUrl:
      "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/kimi.svg",
  },
] as const;

type Agent = (typeof agents)[number];

export function AgentBar({ agentCardUrl }: { agentCardUrl: string }) {
  const [status, setStatus] = useState("");
  const prompt = useMemo(
    () =>
      `Connect to the A2A agent at ${agentCardUrl} and ask what Vaishnav has built around infrastructure and distributed systems.`,
    [agentCardUrl],
  );

  const copyPrompt = async (agentLabel: string) => {
    setStatus(`Prompt copied for ${agentLabel}`);
    window.setTimeout(() => setStatus(""), 3000);

    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  };

  const deepLinks = useMemo(() => {
    const encodedPrompt = encodeURIComponent(prompt);
    return {
      codex: `codex://new?prompt=${encodedPrompt}`,
      claude: `claude://claude.ai/new?q=${encodedPrompt}`,
      cursor: `cursor://anysphere.cursor-deeplink/prompt?text=${encodedPrompt}`,
    };
  }, [prompt]);

  return (
    <section className="agent-tools" aria-labelledby="agent-picker-title">
      <button
        aria-label="Copy the A2A instruction"
        className="prompt-card"
        onClick={() => void copyPrompt("your agent")}
        type="button"
      >
        <span className="prompt-card-mark" aria-hidden="true">
          ✦
        </span>
        <span className="prompt-card-text">{prompt}</span>
        <span className="prompt-card-action">
          {status ? "Copied" : "Copy prompt"}
        </span>
      </button>

      <div className="agent-picker">
        <p className="agent-picker-title" id="agent-picker-title">
          Open with your agent
        </p>

        <div className="agent-picker-mobile">
          <AgentGroup agents={agents} copyPrompt={copyPrompt} deepLinks={deepLinks} />
        </div>

        <div className="agent-marquee">
          <div className="agent-marquee-track">
            <AgentGroup agents={agents} copyPrompt={copyPrompt} deepLinks={deepLinks} />
            <AgentGroup
              agents={agents}
              copyPrompt={copyPrompt}
              deepLinks={deepLinks}
              duplicate
            />
          </div>
        </div>

        <p className="agent-status" aria-live="polite" role="status">
          {status || "Every option uses the same prompt."}
        </p>
      </div>
    </section>
  );
}

function AgentGroup({
  agents: availableAgents,
  copyPrompt,
  deepLinks,
  duplicate = false,
}: {
  agents: readonly Agent[];
  copyPrompt: (agentLabel: string) => Promise<void>;
  deepLinks: Record<"codex" | "claude" | "cursor", string>;
  duplicate?: boolean;
}) {
  return (
    <div className="agent-group" aria-hidden={duplicate || undefined}>
      {availableAgents.map((agent) => {
        const content = (
          <>
            <img src={agent.iconUrl} alt="" className="agent-icon" />
            <span>{agent.label}</span>
          </>
        );

        if (agent.kind !== "copy") {
          return (
            <a
              className="agent-option"
              href={deepLinks[agent.kind]}
              key={agent.label}
              onClick={() => void copyPrompt(agent.label)}
              tabIndex={duplicate ? -1 : undefined}
              title={`Open with ${agent.label}`}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            className="agent-option"
            key={agent.label}
            onClick={() => void copyPrompt(agent.label)}
            tabIndex={duplicate ? -1 : undefined}
            title={`Copy prompt for ${agent.label}`}
            type="button"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
