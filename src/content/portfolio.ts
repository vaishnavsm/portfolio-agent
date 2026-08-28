import { portfolioSchema, type Portfolio } from "./schema";

const content = {
  site: {
    name: "Vaishnav Sreekanth Menon",
    shortName: "VSM",
    title: "Vaishnav Sreekanth Menon — Software builder",
    description:
      "Software builder working across infrastructure, developer tools, distributed systems, and agentic products.",
    canonicalUrl: "https://vaishnavsm.com",
    locale: "en_IN",
    lastUpdated: "2026-08-28",
  },
  person: {
    name: "Vaishnav Sreekanth Menon",
    initials: "VSM",
    eyebrow: "Software builder · Systems thinker · Writer",
    headline: "I build systems that make complexity feel tractable.",
    introduction:
      "I work across infrastructure, developer experience, distributed systems, and agentic products. I like going past the abstraction, understanding what is actually happening, and turning that understanding into tools people can use.",
    status:
      "Currently exploring better interfaces between people, software, and autonomous agents.",
    email: "hey@vaishnavsm.com",
    links: [
      { label: "GitHub", href: "https://github.com/vaishnavsm" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vaishnavsm/" },
      { label: "Writing", href: "https://vaishnavsm.com" },
      { label: "Schedule a call", href: "https://calendly.com/vaishnavsm/catch-up" },
    ],
  },
  capabilities: [
    {
      title: "Infrastructure & distributed systems",
      description:
        "Reasoning about networks, storage, topology, failure modes, and the operational reality behind abstractions.",
    },
    {
      title: "Developer tools",
      description:
        "Building small, focused tools that reduce friction and make complicated workflows easier to understand.",
    },
    {
      title: "Product engineering",
      description:
        "Taking ambiguous product ideas from first principles to a complete interface, with equal attention to utility and detail.",
    },
    {
      title: "Technical communication",
      description:
        "Explaining systems through experiments and practical walkthroughs instead of stopping at received wisdom.",
    },
  ],
  projects: [
    {
      number: "01",
      title: "A2A-native portfolio",
      description:
        "A personal site designed for both people and autonomous agents, with protocol-level discovery instead of a decorative chatbot.",
      detail:
        "The same curated content drives public JSON, llms.txt, and a grounded A2A agent running entirely on Vercel; the root page only points visitors to its Agent Card.",
      status: "Current",
      tags: ["A2A", "Next.js", "AI agents"],
      links: [{ label: "You are here", href: "/" }],
    },
    {
      number: "02",
      title: "Jaga",
      description: "An exploration of what a different interface to source control could look like.",
      detail:
        "Jaga — Just Another Git Alternative — is an active experiment in developer tooling and the workflows around versioned work.",
      status: "Work in progress",
      tags: ["Developer tools", "Version control"],
      links: [{ label: "Source", href: "https://github.com/vaishnavsm/jaga" }],
    },
    {
      number: "03",
      title: "Secrets File Manager",
      description: "A deliberately small tool for managing encrypted secrets files inside Git repositories.",
      detail:
        "The workflow keeps plaintext configuration ignored, encrypted versions committed, and synchronization simple enough to run from Git hooks.",
      status: "Open source",
      tags: ["Go", "Security", "Git", "Infrastructure"],
      links: [
        { label: "Source", href: "https://github.com/vaishnavsm/secrets-file-manager" },
      ],
    },
    {
      number: "04",
      title: "Redis Topology Monitor",
      description: "Tools for inspecting Redis Cluster topology and making correlated failure risk visible.",
      detail:
        "A proof of concept that groups replicas by hash slot and host allocation to surface topology that looks healthy but fails together.",
      status: "Proof of concept",
      tags: ["Redis", "DevOps", "Failure modes", "Infrastructure", "Distributed systems"],
      links: [
        { label: "Source", href: "https://github.com/vaishnavsm/redis-topology-monitor" },
        {
          label: "Read the case study",
          href: "https://vaishnavsm.com/2024-01-01-redis-hash-slot-failure-via-topology/",
        },
      ],
    },
    {
      number: "05",
      title: "TCP connection lab",
      description: "A practical experiment answering how many TCP connections are actually possible.",
      detail:
        "A companion C lab tests the four-tuple model directly, including reused source ports across destination addresses and ports.",
      status: "Published experiment",
      tags: ["C", "Networking", "TCP", "Infrastructure", "Distributed systems"],
      links: [
        { label: "Source", href: "https://github.com/vaishnavsm/blog-tcp-connection-limit" },
        {
          label: "Read the walkthrough",
          href: "https://vaishnavsm.com/2024-06-08-how-many-tcp-connections/",
        },
      ],
    },
  ],
  principles: [
    {
      title: "Go one layer deeper",
      description:
        "An explanation becomes useful when it survives contact with the system itself. Reproduce it, inspect it, and make the hidden layer tangible.",
    },
    {
      title: "Prefer legible systems",
      description:
        "Good tools make their model clear. They should help people reason, not merely hide complexity until the next failure.",
    },
    {
      title: "Keep the human in the interface",
      description:
        "Technology should extend judgment and agency. Automation is strongest when its boundaries and evidence stay visible.",
    },
  ],
  writing: [
    {
      title: "Core Values",
      description: "A snapshot of values I believe in both as a person and to build organizations.",
      publishedAt: "2024-11-24",
      category: "Thoughts",
      tags: ["values", "organizations", "culture"],
      href: "https://vaishnavsm.com/2024-11-24-core-values/",
    },
    {
      title: "How Many TCP Connections Can You Make?",
      description: "Tackling a classical TCP interview question beyond just theory.",
      publishedAt: "2024-06-08",
      category: "Networking",
      tags: ["networking", "TCP", "systems"],
      href: "https://vaishnavsm.com/2024-06-08-how-many-tcp-connections/",
    },
    {
      title: "A Practical TLS Handshake Walkthrough",
      description: "Manually performing each step of a TLS handshake to understand what it does.",
      publishedAt: "2024-01-14",
      category: "Walkthrough",
      tags: ["TLS", "security", "networking", "cryptography"],
      href: "https://vaishnavsm.com/2024-01-14-a-practical-tls-handshake-walkthrough/",
    },
    {
      title: "Redis Hash Slot Failure via Topology",
      description: "How an apparently healthy Redis Cluster topology can preserve correlated failure.",
      publishedAt: "2024-01-01",
      category: "DevOps",
      tags: ["Redis", "topology", "distributed systems", "failure modes"],
      href: "https://vaishnavsm.com/2024-01-01-redis-hash-slot-failure-via-topology/",
    },
    {
      title: "What Follows",
      description: "A quieter piece from the poetry archive.",
      publishedAt: "2024-08-30",
      category: "Poetry",
      tags: ["poetry"],
      href: "https://vaishnavsm.com/2024-08-30-what-follows/",
    },
  ],
  agent: {
    name: "Vaishnav's Portfolio Agent",
    description:
      "A public, read-only agent that answers questions about Vaishnav's published work, writing, capabilities, and ways to get in touch.",
    version: "1.0.0",
    suggestedPrompts: [
      "What has Vaishnav built around infrastructure and distributed systems?",
      "Which project best demonstrates developer tooling work?",
      "Find Vaishnav's writing about networks and security.",
      "How can I get in touch with Vaishnav?",
    ],
  },
} satisfies Portfolio;

export const portfolio = portfolioSchema.parse(content);
