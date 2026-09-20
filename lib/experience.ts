export interface Experience {
  company: string;
  img: string;
  url: string;
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
    description: "Contributed to OSS projects includign dodo payments billing sdk.",
  },
  {
    company: "Hirewiser",
    img: "/company/hw.jpg",
    url: "https://www.hirewiser.in/",
    role: "Full Stack Engineer",
    period: "Sept 2025 - Oct 2025",
    location: "Remote",
    description: "Building scalable backend using Next.js and TRPC.",
  },
  {
    company: "BlockSeBlock",
    img: "/company/bsb.png",
    url: "https://blockseblock.com/",
    role: "Blockchain Engineer",
    period: "July 2025 - Sept 2025",
    location: "Remote",
    description: "Building dapps on ICP blockchain with Rust.",
  },
];
