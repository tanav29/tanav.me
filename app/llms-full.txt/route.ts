import { NextResponse } from "next/server";
import { getFullPortfolio } from "@/lib/agent-content";

export function GET() {
  return new NextResponse(getFullPortfolio(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
