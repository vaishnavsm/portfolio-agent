import { createAgentCard } from "@/lib/agent/card";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const siteUrl = new URL(request.url).origin;

  return Response.json(createAgentCard(siteUrl), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
