import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const projectSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
  links: z.array(linkSchema),
});

const writingSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  href: z.string().url(),
});

export const portfolioSchema = z.object({
  site: z.object({
    name: z.string(),
    shortName: z.string(),
    title: z.string(),
    description: z.string(),
    canonicalUrl: z.string().url(),
    locale: z.string(),
    lastUpdated: z.string(),
  }),
  person: z.object({
    name: z.string(),
    initials: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    introduction: z.string(),
    status: z.string(),
    email: z.string().email(),
    links: z.array(linkSchema),
  }),
  capabilities: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  projects: z.array(projectSchema),
  principles: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  writing: z.array(writingSchema),
  agent: z.object({
    name: z.string(),
    description: z.string(),
    version: z.string(),
    suggestedPrompts: z.array(z.string()),
  }),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
export type PortfolioProject = z.infer<typeof projectSchema>;
export type PortfolioWriting = z.infer<typeof writingSchema>;
