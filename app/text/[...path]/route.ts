import { NextResponse } from "next/server";
import { getAgentMarkdown } from "@/lib/agent-content";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathname = path.length === 1 && path[0] === "home" ? "/" : `/${path.join("/")}`;
  const page = getAgentMarkdown(pathname);

  return new NextResponse(page.body, {
    status: page.status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
