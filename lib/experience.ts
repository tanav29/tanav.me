export interface Experience {
  company: string;
  img?: string;
  url?: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export const experience: Experience[] = [
  {
    company: "LFX Meshery Contributor",
    img: "/company/meshery.png",
    url: "https://meshery.com/",
    role: "Open Source Contributor",
    period: "Sep 2026",
    location: "Remote",
    description: "Contributed to OSS projects from Layer5 and Meshery.",
  },
  {
    company: "Hacktoberfest",
    img: "/company/hacktoberfest.png",
    url: "https://hacktoberfest.com/",
    role: "Open Source Contributor",
    period: "Oct 2025 - Nov 2025",
    location: "Remote",
    description: "Contributed to OSS projects including the Dodo Payments billing SDK.",
  },
  {
    company: "Cofounds",
    role: "Full Stack Intern",
    period: "Sept 2025 - Oct 2025",
    location: "Remote",
    description: "Optimized Prisma/tRPC database calls, reducing query latency by 40% for a critical user-facing feature. Built 5+ type-safe API endpoints to support a legacy component refactor using Next.js, tRPC, and PostgreSQL.",
  },
  {
    company: "BlockSeBlock",
    img: "/company/bsb.png",
    url: "https://blockseblock.com/",
    role: "Blockchain Engineer",
    period: "July 2025 - Sept 2025",
    location: "Remote",
    description: "Built decentralized applications on the Internet Computer (ICP) blockchain using Rust.",
  },
];

