import {
  IconPencil,
  IconVideo,
  IconRocket,
  IconSearch,
  IconWorldSearch,
  IconCar,
  IconChessKnight,
  IconChartLine,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { NotebookTextIcon, TerminalIcon, ScanEyeIcon } from "lucide-react";

export interface Project {
  img: string;
  name: string;
  brief: string;
  icon: any;
  git?: string;
  video?: string;
  web?: string;
  info?: string;
  tech: string[];
  featured?: boolean;
  caseStudy?: {
    problem: string;
    implementation: string;
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    img: "/images/opendevin.svg",
    icon: TerminalIcon,
    git: "https://github.com/tanav29/opendevin",
    name: "OpenDevin",
    brief: "An AI coding workspace with sandboxes, live terminals, and file diffs.",
    tech: ["Next.js", "Express", "AI SDK", "E2B", "PostgreSQL", "WebSocket"],
    featured: true,
    caseStudy: {
      problem: "Run agent code with visible, reviewable changes.",
      implementation: "E2B sandboxes, WebSocket terminals, saved sessions, and per-file revert.",
      outcome: "An experimental workspace for reviewing agent changes before pushing to GitHub.",
    },
  },
  {
    img: "/images/trading.png",
    icon: IconChartLine,
    git: "https://github.com/tanav29/trade",
    info: "https://x.com/tanavtwt/status/2008236317537431580",
    name: "Trading simulator",
    brief: "Simulated trading with order matching and live market depth.",
    tech: ["Next.js", "Hono", "Redis", "PostgreSQL", "SSE", "Turborepo"],
    featured: true,
    caseStudy: {
      problem: "Match orders and keep market data in sync.",
      implementation: "Redis order books, PostgreSQL persistence, and SSE updates in a typed Bun monorepo.",
      outcome: "Simulated trades, live order books, and portfolio tracking.",
    },
  },
  {
    img: "/images/vidora.png",
    icon: IconVideo,
    git: "https://github.com/tanav29/vidora",
    info: "https://x.com/tanavtwt/status/2007356766284329173?s=20",
    name: "Vidora",
    web: "https://vidora.tanav.me",
    brief:
      "Video uploads, queued transcoding, and adaptive HLS playback.",
    tech: ["Next.js", "FFmpeg", "Docker", "Redis", "PostgreSQL", "Cloudflare R2"],
    featured: true,
    caseStudy: {
      problem: "Process large videos without blocking API requests.",
      implementation: "Direct R2 uploads, Redis queues, and Docker workers with retries.",
      outcome: "Independent uploads and encoding with progress tracking; public UI demo.",
    },
  },
  {
    img: "/images/road-vision.png",
    icon: ScanEyeIcon,
    git: "https://github.com/tanav29/road-vision",
    name: "ADAS",
    brief: "Real-time vehicle, pedestrian, and road-sign detection.",
    tech: ["Python", "PyTorch", "YOLOv8", "OpenCV", "Matplotlib", "Google Colab"],
    featured: true,
    caseStudy: {
      problem: "Detect road objects from live camera footage.",
      implementation: "YOLOv8 trained on 2+ GB of footage, OpenCV lane detection, and proximity alerts.",
      outcome: "Experimental video overlays and tools for evaluating detections.",
    },
  },
  {
    img: "/images/drawble.png",
    icon: IconPencil,
    git: "https://github.com/tanav29/drawble",
    video: "ANSXcxYZffs",
    name: "Drawble",
    web: "https://drawble-web.vercel.app/",
    brief:
      "Multiplayer drawing with synced YouTube Music.",
    tech: ["Socket.IO", "Vite", "Zustand", "TanStack", "Hono"],
  },
  {
    img: "/images/logbip.png",
    icon: NotebookTextIcon,
    git: "https://github.com/tanav29/logbip",
    name: "Log Build in Public",
    web: "https://logbip.vercel.app/",
    brief:
      "A place for builders to share progress.",
    tech: ["Prisma", "Better Auth", "Hono"],
  },
  {
    img: "/images/ship.png",
    icon: IconRocket,
    git: "https://github.com/tanav29/ship",
    name: "Ship",
    web: "https://ship.tanav.me",
    brief:
      "Publish AI-generated sites in two clicks.",
    tech: ["NextJs", "Blob", "Redis"],
  },
  {
    img: "/images/scoutly.png",
    icon: IconSearch,
    info: "https://x.com/tanavtwt/status/1994856020099920261?s=20",
    git: "https://github.com/tanav29/scoutly/",
    name: "scoutly",
    brief: "AI search with document parsing and web scraping.",
    tech: ["Python", "Langchain", "Vector DB", "Embeddings"],
  },
  {
    img: "/images/crawler.png",
    icon: IconWorldSearch,
    git: "https://github.com/tanav29/crawler/",
    info: "https://x.com/tanavtwt/status/2001326270731444275?s=20",
    name: "crawler",
    brief:
      "A tiny search engine for any domain.",
    tech: ["BunJS", "React"],
  },
  {
    img: "/images/uber.png",
    icon: IconCar,
    git: "https://github.com/tanav29/uber",
    name: "Ober",
    brief:
      "An Uber-style ride-booking app.",
    tech: ["ElysiaJS", "NextJS", "Socketio", "Redis"],
  },
  {
    img: "/images/chess-app.png",
    icon: IconChessKnight,
    git: "https://github.com/tanav29/chess",
    name: "chess",
    brief: "Multiplayer chess over WebSockets.",
    tech: ["WebSocket", "NextJs", "ChessJs", "Turborepo"],
  },
  {
    img: "/images/linkmash.png",
    icon: IconBrandLinkedin,
    web: "https://linkmash.netlify.app/",
    name: "linkmash",
    brief: "Compare LinkedIn profiles.",
    tech: ["React", "Convex"],
  },
];
