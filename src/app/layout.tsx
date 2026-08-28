import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolio.site.title,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: portfolio.site.locale,
    url: "/",
    title: portfolio.site.title,
    description: portfolio.site.description,
    siteName: portfolio.site.name,
  },
  twitter: {
    card: "summary",
    title: portfolio.site.title,
    description: portfolio.site.description,
  },
  other: {
    "a2a-agent-card": "/.well-known/agent-card.json",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
