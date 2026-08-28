export function getSiteUrl(requestUrl?: string): string {
  if (requestUrl) {
    const origin = new URL(requestUrl).origin;
    if (origin !== "null") return origin;
  }

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction}`;

  const vercelPreview = process.env.VERCEL_URL?.trim();
  if (vercelPreview) return `https://${vercelPreview}`;

  return "http://localhost:3000";
}
