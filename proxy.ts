import { NextRequest, NextResponse } from "next/server";
import { negotiateRepresentation } from "./lib/accept";

const VARY_HEADERS = "Accept, Accept-Encoding";

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();

  const representation = negotiateRepresentation(request.headers.get("accept"));
  if (representation === "not-acceptable") {
    return new NextResponse("Not Acceptable", {
      status: 406,
      headers: { Vary: VARY_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (representation === "markdown") {
    const url = request.nextUrl.clone();
    url.pathname = "/agent-markdown";
    url.search = "";
    url.searchParams.set("path", request.nextUrl.pathname);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-agent-original-path", request.nextUrl.pathname);
    return NextResponse.rewrite(url, {
      headers: { Vary: VARY_HEADERS },
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({ headers: { Vary: VARY_HEADERS } });
}

export const config = {
  matcher: ["/((?!_next/|agent-markdown/|api/|ingest/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)"],
};
