import { NextRequest, NextResponse } from "next/server";
import { cachedGithubData, validGithubUsername } from "@/lib/github-cache";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") ?? "";
  if (!validGithubUsername(username)) {
    return NextResponse.json({ error: "Invalid GitHub username" }, { status: 400 });
  }

  try {
    const data = await cachedGithubData(`github:contributions:${username.toLowerCase()}`, async () => {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error(`Contribution service failed: ${response.status}`);
      const result = await response.json();
      if (!Array.isArray(result.contributions) || !result.contributions.length) throw new Error("Invalid contribution data");
      return { contributions: result.contributions };
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "GitHub contributions are unavailable" }, { status: 502 });
  }
}
