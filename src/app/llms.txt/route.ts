import { portfolio } from "@/content/portfolio";

export function GET(request: Request): Response {
  const siteUrl = new URL(request.url).origin;
  const projectLinks = portfolio.projects
    .map((project) => `- [${project.title}](${new URL(project.links[0]?.href ?? "/", siteUrl)}) — ${project.description}`)
    .join("\n");
  const writingLinks = portfolio.writing
    .map((article) => `- [${article.title}](${article.href}) — ${article.description}`)
    .join("\n");

  const body = `# ${portfolio.person.name}

> ${portfolio.site.description}

This is the public, curated portfolio for ${portfolio.person.name}. The A2A service is an automated, read-only representative and must not be treated as a personal commitment from Vaishnav.

## Agent discovery

- [A2A Agent Card](${siteUrl}/.well-known/agent-card.json) — Protocol, skills, and interface discovery.
- [Structured portfolio](${siteUrl}/api/profile) — Canonical public portfolio data as JSON.

## Selected work

${projectLinks}

## Writing

${writingLinks}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
