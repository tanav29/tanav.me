import { NextRequest, NextResponse } from "next/server";
import { getAgentMarkdown } from "@/lib/agent-content";

export function GET(request: NextRequest) {
  const path = request.headers.get("x-agent-original-path") || request.nextUrl.searchParams.get("path") || "/";
  const response = getAgentMarkdown(path);
  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}
