import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl, lastModified: portfolio.site.lastUpdated, priority: 1 },
    { url: `${siteUrl}/.well-known/agent-card.json`, lastModified: portfolio.site.lastUpdated },
    { url: `${siteUrl}/api/profile`, lastModified: portfolio.site.lastUpdated },
    { url: `${siteUrl}/llms.txt`, lastModified: portfolio.site.lastUpdated },
  ];
}
