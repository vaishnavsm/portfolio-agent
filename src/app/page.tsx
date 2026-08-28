import type { Metadata } from "next";
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

      <div className="signal" aria-hidden="true">
        A2A
      </div>

      <section className="message" aria-labelledby="page-title">
        <p className="identity">[ Vaishnav&apos;s Portfolio Agent ]</p>
        <h1 id="page-title">Use your agent.</h1>
        <p className="instruction">
          This site is not meant to be browsed. Give your agent the Agent Card
          below and ask it to speak to mine.
        </p>

        <a className="agent-card" href={agentCardUrl}>
          <span>Agent Card</span>
          <code>{agentCardUrl}</code>
          <span aria-hidden="true">↗</span>
        </a>

        <p className="protocol">Public · read-only · A2A 1.0 · JSON-RPC</p>
      </section>
    </main>
  );
}
