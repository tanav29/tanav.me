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
    brief: "A coding workspace where an AI agent works in an isolated sandbox and you can review its terminal activity and file changes.",
    tech: ["Next.js", "Express", "AI SDK", "E2B", "PostgreSQL", "WebSocket"],
    featured: true,
    caseStudy: {
      problem: "An agent needs a place to run code while keeping its actions visible to the person using it.",
      implementation: "I built repository-aware agent tools in E2B sandboxes, a shared WebSocket terminal, and PostgreSQL-backed sessions. The interface exposes file diffs and per-file revert before pushing changes to GitHub.",
      outcome: "A local experimental workspace for opening a repository, working with an agent, and reviewing changes before publishing them.",
    },
  },
  {
    img: "/images/trading.png",
    icon: IconChartLine,
    git: "https://github.com/tanav29/trade",
    info: "https://x.com/tanavtwt/status/2008236317537431580",
    name: "Trading simulator",
    brief: "A stock market simulator with order matching, live market depth, and portfolio and trade history.",
    tech: ["Next.js", "Hono", "Redis", "PostgreSQL", "SSE", "Turborepo"],
    featured: true,
    caseStudy: {
      problem: "A trading simulator needs to match buy and sell orders and keep the dashboard in sync with market changes.",
      implementation: "I built limit and market order matching with Redis-backed order books, PostgreSQL persistence, and server-sent events for live depth and candlestick updates. The Next.js frontend and Hono API share types in a Bun monorepo.",
      outcome: "Users can place simulated trades, follow a live order book, and review their holdings and trade history.",
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
      "A video processing platform with direct uploads, queued FFmpeg transcoding, and adaptive HLS playback.",
    tech: ["Next.js", "FFmpeg", "Docker", "Redis", "PostgreSQL", "Cloudflare R2"],
    featured: true,
    caseStudy: {
      problem: "Large uploads and video encoding need to finish without holding an API request open.",
      implementation: "I separated browser-to-R2 uploads from transcoding with a Redis queue and Docker workers. Workers create HLS renditions and thumbnails, report progress, and retry failed jobs.",
      outcome: "Uploads and encoding run independently, with processing status and retry history visible in the app. The public demo offers a UI walkthrough without requiring backend services.",
    },
  },
  {
    img: "/images/road-vision.png",
    icon: ScanEyeIcon,
    git: "https://github.com/tanav29/road-vision",
    name: "ADAS",
    brief: "Road Vision is a camera-based detection project that identifies vehicles, pedestrians, and road signs with YOLOv8 and OpenCV.",
    tech: ["Python", "PyTorch", "YOLOv8", "OpenCV", "Matplotlib", "Google Colab"],
    featured: true,
    caseStudy: {
      problem: "Camera footage needs to be turned into useful object detections and road information frame by frame.",
      implementation: "I trained a custom YOLOv8 model on more than 2 GB of camera data in Google Colab, built a real-time OpenCV detection pipeline, and created Matplotlib visualizations to evaluate model performance. The project also includes lane detection and audio-visual proximity alerts.",
      outcome: "An experimental vision pipeline with labeled video overlays for detected vehicles, pedestrians, and road signs, plus tools for reviewing detection results.",
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
      "Skribbl.io with synchronized YouTube Music to make game rooms more interactive.",
    tech: ["Socket.IO", "Vite", "Zustand", "TanStack", "Hono"],
  },
  {
    img: "/images/logbip.png",
    icon: NotebookTextIcon,
    git: "https://github.com/tanav29/logbip",
    name: "Log Build in Public",
    web: "https://logbip.vercel.app/",
    brief:
      "A social platform for builders and learners to share their progress.",
    tech: ["Prisma", "Better Auth", "Hono"],
  },
  {
    img: "/images/ship.png",
    icon: IconRocket,
    git: "https://github.com/tanav29/ship",
    name: "Ship",
    web: "https://ship.tanav.me",
    brief:
      "publish your ai generated clop to the world with just two clicks, always free.",
    tech: ["NextJs", "Blob", "Redis"],
  },
  {
    img: "/images/scoutly.png",
    icon: IconSearch,
    info: "https://x.com/tanavtwt/status/1994856020099920261?s=20",
    git: "https://github.com/tanav29/scoutly/",
    name: "scoutly",
    brief: "a dead simple perplexity clone with docling and web scraping.",
    tech: ["Python", "Langchain", "Vector DB", "Embeddings"],
  },
  {
    img: "/images/crawler.png",
    icon: IconWorldSearch,
    git: "https://github.com/tanav29/crawler/",
    info: "https://x.com/tanavtwt/status/2001326270731444275?s=20",
    name: "crawler",
    brief:
      "a tiny search engine that scrapes all pages in a domain and maps them to titles for search",
    tech: ["BunJS", "React"],
  },
  {
    img: "/images/uber.png",
    icon: IconCar,
    git: "https://github.com/tanav29/uber",
    name: "Ober",
    brief:
      "an end-to-end Uber clone made with the latest tech stack and best practices.",
    tech: ["ElysiaJS", "NextJS", "Socketio", "Redis"],
  },
  {
    img: "/images/chess-app.png",
    icon: IconChessKnight,
    git: "https://github.com/tanav29/chess",
    name: "chess",
    brief: "multiplayer chess game with websockets.",
    tech: ["WebSocket", "NextJs", "ChessJs", "Turborepo"],
  },
  {
    img: "/images/linkmash.png",
    icon: IconBrandLinkedin,
    web: "https://linkmash.netlify.app/",
    name: "linkmash",
    brief: "compare your linkedin profile with others.",
    tech: ["React", "Convex"],
  },
];
