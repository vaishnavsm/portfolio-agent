import { portfolio } from "@/content/portfolio";

export function GET(): Response {
  return Response.json(portfolio, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
