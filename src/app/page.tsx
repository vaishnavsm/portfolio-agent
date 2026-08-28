import type { Metadata } from "next";
import { AgentBar } from "@/components/agent-bar";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Vaishnav's Agentic Portfolio",
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
        <span className="a2a-label">A2A portfolio agent</span>
      </header>

      <section className="message" aria-labelledby="page-title">
        <h1 id="page-title">Vaishnav&apos;s Agentic Portfolio</h1>
        <p className="instruction">Connect to portfolio with an A2A browser:</p>

        <AgentBar agentCardUrl={agentCardUrl} />
      </section>

      <footer className="protocol">
        <a href={agentCardUrl}>Agent Card ↗</a>
        <span aria-hidden="true">·</span>
        <span>Public · read-only · A2A 1.0 · JSON-RPC</span>
      </footer>
    </main>
  );
}
