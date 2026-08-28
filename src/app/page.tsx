import type { Metadata } from "next";
import { AgentBar } from "@/components/agent-bar";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Use Vaishnav's agent",
  description:
    "Give your agent Vaishnav's A2A Agent Card to learn about his work, writing, and experience.",
};

export default function Home() {
  const siteUrl = getSiteUrl();
  const agentCardUrl = new URL("/.well-known/agent-card.json", siteUrl).toString();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vaishnav S M",
    url: siteUrl,
    sameAs: [
      "https://github.com/vaishnavsm",
      "https://www.linkedin.com/in/vaishnavsm/",
    ],
  };

  return (
    <main className="handoff">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="site-header">
        <span className="wordmark">
          vaishnav<span>.</span>
        </span>
        <span className="a2a-label">A2A portfolio agent</span>
      </header>

      <section className="message" aria-labelledby="page-title">
        <h1 id="page-title">Use your agent.</h1>
        <p className="instruction">
          Connect to the A2A agent at
        </p>

        <a className="agent-card" href={agentCardUrl}>
          <span className="agent-card-mark" aria-hidden="true">
            ✦
          </span>
          <code>{agentCardUrl}</code>
          <span className="agent-card-action">Agent Card&nbsp; ↗</span>
        </a>

        <p className="suggested-question">
          and ask what Vaishnav has built around infrastructure and distributed
          systems.
        </p>

        <AgentBar agentCardUrl={agentCardUrl} />
      </section>

      <footer className="protocol">Public · read-only · A2A 1.0 · JSON-RPC</footer>
    </main>
  );
}
