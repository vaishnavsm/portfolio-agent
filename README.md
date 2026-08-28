# A2A Portfolio

A portfolio that is meant to be used through [Agent2Agent (A2A)](https://a2a-protocol.org/), not browsed as a conventional website. It is a single Next.js application designed to run on Vercel without a database, queue, separate backend, or paid platform service.

The page intentionally contains no chat box. Agent clients discover the service through `/.well-known/agent-card.json` and communicate over A2A JSON-RPC at `/a2a`.

## What is included

- A minimal handoff page that points people and agents to the Agent Card.
- One validated content source for the UI and machine interfaces.
- A2A v1 Agent Card and synchronous JSON-RPC endpoint.
- OpenAI-compatible `POST /chat/completions` model adapter.
- Grounded text plus structured JSON responses with source links.
- `/api/profile`, `/llms.txt`, JSON-LD, robots, and sitemap routes.
- No runtime persistence or external service besides the model provider.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure these variables in `.env.local` and in Vercel:

```dotenv
OPENAI_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The default provider is Kado at `https://awesome.kado.so/openai/v1`, using the `kado` model. For future forks, `OPENAI_BASE_URL` and `OPENAI_MODEL` can optionally override those defaults. A replacement base URL must implement the OpenAI-compatible Chat Completions contract and must not include `/chat/completions`.

## Test the A2A interface with Kado

With the development server running:

```bash
kado a2a card get http://localhost:3000 --output json
kado a2a send \
  --agent-card http://localhost:3000 \
  --transport jsonrpc \
  --output json \
  "What has Vaishnav built around infrastructure?"
```

The first command validates discovery. The second resolves the Agent Card, negotiates the advertised interface, and sends a real A2A message.

## Customize it

Most forks only need to change [`src/content/portfolio.ts`](src/content/portfolio.ts). Its schema lives beside it in [`src/content/schema.ts`](src/content/schema.ts), and invalid content fails during the build.

The other main extension points are:

- `src/app/globals.css` — colors, typography, spacing, and responsive design.
- `src/lib/agent/card.ts` — advertised A2A identity and skills.
- `src/lib/agent/openai-compatible.ts` — model provider contract and agent policy.
- `src/lib/agent/knowledge.ts` — public corpus and lightweight source ranking.

Keep private data out of the content module. The starter treats everything there as public and may include it in model prompts, API responses, and agent answers.

## Deploy to Vercel

Import the repository into Vercel, add `OPENAI_KEY` and `NEXT_PUBLIC_SITE_URL`, and deploy. `NEXT_PUBLIC_SITE_URL` should be the final production origin. Preview Agent Cards automatically use the preview request origin.

The agent is deliberately synchronous and read-only so it fits ordinary Vercel functions. It does not advertise streaming, push notifications, durable tasks, or authenticated actions.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## License

MIT
