import {
  DefaultRequestHandler,
  InMemoryTaskStore,
  JsonRpcTransportHandler,
  ServerCallContext,
} from "@a2a-js/sdk/server";
import { createAgentCard } from "./card";
import { PortfolioAgentExecutor } from "./executor";

function headersToState(headers: Headers): Map<string, unknown> {
  return new Map([["headers", Object.fromEntries(headers.entries())]]);
}

export async function handleA2ARequest(request: Request): Promise<Response> {
  const siteUrl = new URL(request.url).origin;
  const card = createAgentCard(siteUrl);
  const requestHandler = new DefaultRequestHandler(
    card,
    new InMemoryTaskStore(),
    new PortfolioAgentExecutor(siteUrl),
  );
  const transport = new JsonRpcTransportHandler(requestHandler);
  const requestedVersion = request.headers.get("A2A-Version") || "1.0";
  const context = new ServerCallContext({
    requestedVersion,
    state: headersToState(request.headers),
  });

  const body = await request.text();
  const result = await transport.handle(body, context);

  if (Symbol.asyncIterator in Object(result)) {
    return Response.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32004, message: "Streaming is not supported by this agent." },
      },
      { status: 400 },
    );
  }

  return Response.json(result, {
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
