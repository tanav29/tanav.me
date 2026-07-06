export interface Project {
  img: string;
  name: string;
  brief: string;
  git?: string;
  video?: string;
  web?: string;
  info?: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    img: "/images/drawble.png",
    git: "https://github.com/tanav29/drawble",
    video: "ANSXcxYZffs",
    name: "Drawble",
    web: "https://drawble-web.vercel.app/",
    brief:
      "Skribbl.io with synchronized YouTube Music to make game rooms more interactive.",
    tech: ["ScoketIO", "Vite", "Zustand", "Tanstack", "Hono"],
  },
  {
    img: "/images/vidora.png",
    git: "https://github.com/tanav29/vidora",
    info: "https://x.com/tanavtwt/status/2007356766284329173?s=20",
    name: "Vidora",
    web: "https://vidora.tanav.me",
    brief:
      "a complete Mux-like video transcoding and streaming platform with a web interface.",
    tech: ["NextJs", "FFMPEG", "Docker", "Redis", "R2"],
  },
  {
    img: "/images/ship.png",
    git: "https://github.com/tanav29/ship",
    name: "Ship",
    web: "https://ship.tanav.me",
    brief:
      "publish your ai generated clop to the world with just two clicks, always free.",
    tech: ["NextJs", "Blob", "Redis"],
  },
  {
    img: "/images/scoutly.png",
    info: "https://x.com/tanavtwt/status/1994856020099920261?s=20",
    git: "https://github.com/tanav29/scoutly/",
    name: "scoutly",
    brief: "a dead simple perplexity clone with docling and web scraping.",
    tech: ["Python", "Langchain", "Vector DB", "Embeddings"],
  },
  {
    img: "/images/crawler.png",
    git: "https://github.com/tanav29/crawler/",
    info: "https://x.com/tanavtwt/status/2001326270731444275?s=20",
    name: "crawler",
    brief:
      "a tiny search engine that scrapes all pages in a domain and maps them to titles for search",
    tech: ["BunJS", "React"],
  },
  {
    img: "/images/uber.png",
    git: "https://github.com/tanav29/uber",
    name: "Ober",
    brief:
      "an end-to-end Uber clone made with the latest tech stack and best practices.",
    tech: ["ElysiaJS", "NextJS", "Socketio", "Redis"],
  },
  {
    img: "/images/chess-app.png",
    git: "https://github.com/tanav29/chess",
    name: "chess",
    brief: "multiplayer chess game with websockets.",
    tech: ["WebSocket", "NextJs", "ChessJs", "Turborepo"],
  },
  {
    img: "/images/trading.png",
    git: "https://github.com/tanav29/trade",
    info: "https://x.com/tanavtwt/status/2008236317537431580",
    name: "exchange",
    brief: "real-time trading app with live order book.",
    tech: ["Express", "NextJs", "Redis", "ChartJs", "WebSocket"],
  },
  {
    img: "/images/linkmash.png",
    web: "https://linkmash.netlify.app/",
    name: "linkmash",
    brief: "compare your linkedin profile with others.",
    tech: ["React", "Convex"],
  },
];
