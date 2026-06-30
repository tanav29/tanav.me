export interface Project {
  img: string;
  name: string;
  brief: string;
  git?: string;
  web?: string;
  info?: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    img: "/images/vidora.png",
    git: "https://github.com/tanav29/uber",
    info: "https://x.com/tanav29/status/2007356766284329173?s=20",
    name: "Vidora - complete video streaming",
    brief:
      "a complete Mux-like video transcoding and streaming platform with a web interface.",
    tech: ["NextJs", "FFMPEG", "Docker", "Redis", "R2"],
  },
  {
    img: "/images/uber.png",
    git: "https://github.com/tanav29/uber",
    name: "End to end uber clone",
    brief:
      "an end-to-end Uber clone made with the latest tech stack and best practices.",
    tech: ["ElysiaJS", "NextJS", "Socketio", "Redis"],
  },
  {
    img: "/images/scoutly.png",
    info: "https://x.com/tanav29/status/1994856020099920261?s=20",
    git: "https://github.com/tanav29/road-vision/",
    name: "scoutly - a research RAG",
    brief: "a dead simple perplexity clone with docling and web scraping.",
    tech: ["Python", "Langchain", "Vector DB", "Embeddings"],
  },
  {
    img: "/images/crawler.png",
    git: "https://github.com/tanav29/road-vision/",
    info: "https://x.com/tanav29/status/2001326270731444275?s=20",
    name: "crawler - search engine",
    brief:
      "a tiny search engine that scrapes all pages in a domain and maps them to titles for search",
    tech: ["BunJS", "React"],
  },
  {
    img: "/images/chess-app.png",
    git: "https://github.com/tanav29/chess",
    name: "multiplayer chess",
    brief: "multiplayer chess game with websockets.",
    tech: ["WebSocket", "NextJs", "ChessJs", "Turborepo"],
  },
  {
    img: "/images/trading.png",
    git: "https://github.com/tanav29/trading-system",
    info: "https://x.com/tanav29/status/2008236317537431580",
    name: "trade exchange",
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
