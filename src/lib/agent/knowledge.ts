import { portfolio } from "@/content/portfolio";

export type KnowledgeSource = {
  id: string;
  kind: "profile" | "project" | "writing";
  title: string;
  url: string;
  summary: string;
  tags: string[];
};

export function getKnowledgeSources(siteUrl: string): KnowledgeSource[] {
  return [
    {
      id: "profile",
      kind: "profile",
      title: `${portfolio.person.name} — profile`,
      url: siteUrl,
      summary: `${portfolio.person.eyebrow}. ${portfolio.person.introduction} ${portfolio.person.status}`,
      tags: ["profile", "capabilities", "availability", "contact"],
    },
    ...portfolio.projects.map((project) => ({
      id: `project:${project.number}`,
      kind: "project" as const,
      title: project.title,
      url: new URL(project.links[0]?.href ?? "/", siteUrl).toString(),
      summary: `${project.description} ${project.detail}`,
      tags: project.tags,
    })),
    ...portfolio.writing.map((article, index) => ({
      id: `writing:${index + 1}`,
      kind: "writing" as const,
      title: article.title,
      url: article.href,
      summary: article.description,
      tags: [article.category, "writing", ...article.tags],
    })),
  ];
}

function terms(value: string): string[] {
  const stopWords = new Set([
    "and",
    "about",
    "are",
    "around",
    "built",
    "does",
    "find",
    "for",
    "from",
    "has",
    "have",
    "his",
    "published",
    "that",
    "the",
    "this",
    "vaishnav",
    "what",
    "which",
    "with",
    "work",
    "you",
  ]);

  const aliases: Record<string, string> = {
    article: "writing",
    articles: "writing",
    network: "networking",
    networks: "networking",
    writings: "writing",
  };

  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#-]+/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopWords.has(term))
    .map((term) => aliases[term] ?? term);
}

export function selectSources(query: string, siteUrl: string, limit = 5): KnowledgeSource[] {
  const queryTerms = new Set(terms(query));
  const sources = getKnowledgeSources(siteUrl);

  const contactTerms = ["contact", "email", "reach", "schedule", "call", "meet"];
  if (contactTerms.some((term) => queryTerms.has(term))) {
    return sources.filter((source) => source.kind === "profile");
  }

  const candidates = queryTerms.has("writing")
    ? sources.filter((source) => source.kind === "writing")
    : sources;
  const relevanceTerms = new Set(
    [...queryTerms].filter((term) => term !== "writing"),
  );

  const ranked = candidates
    .map((source, index) => {
      const titleTerms = terms(source.title);
      const tagTerms = terms(source.tags.join(" "));
      const summaryTerms = terms(source.summary);
      const score =
        titleTerms.reduce((total, term) => total + (relevanceTerms.has(term) ? 5 : 0), 0) +
        tagTerms.reduce((total, term) => total + (relevanceTerms.has(term) ? 3 : 0), 0) +
        summaryTerms.reduce((total, term) => total + (relevanceTerms.has(term) ? 1 : 0), 0) +
        (source.kind === "profile" ? 0.25 : 0);

      return { source, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const matches = ranked.filter((item) => item.score > 0).slice(0, limit);
  if (matches.length > 0) return matches.map((item) => item.source);

  if (queryTerms.has("writing")) return candidates.slice(0, limit);

  return [sources[0], ...sources.filter((source) => source.kind !== "profile").slice(0, limit - 1)];
}

export function getAgentCorpus(siteUrl: string): string {
  const projects = portfolio.projects.map((project) => ({
    ...project,
    links: project.links.map((link) => ({
      ...link,
      href: new URL(link.href, siteUrl).toString(),
    })),
  }));

  return JSON.stringify(
    {
      identity: {
        name: portfolio.person.name,
        description: portfolio.person.introduction,
        currentStatus: portfolio.person.status,
        email: portfolio.person.email,
        links: portfolio.person.links,
      },
      capabilities: portfolio.capabilities,
      projects,
      principles: portfolio.principles,
      writing: portfolio.writing,
      sourceOfTruth: siteUrl,
      lastUpdated: portfolio.site.lastUpdated,
    },
    null,
    2,
  );
}
