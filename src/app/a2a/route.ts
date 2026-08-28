import { handleA2ARequest } from "@/lib/agent/handler";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  return handleA2ARequest(request);
}

export async function GET(): Promise<Response> {
  return Response.json(
    {
      name: "A2A endpoint",
      message: "Discover this agent through /.well-known/agent-card.json and send A2A JSON-RPC requests with POST.",
      agentCard: "/.well-known/agent-card.json",
    },
    { status: 405, headers: { Allow: "POST" } },
  );
}
