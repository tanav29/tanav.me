import { NextRequest, NextResponse } from "next/server";
import { cachedGithubData, validGithubUsername } from "@/lib/github-cache";

const PAGE_SIZE = 100;
const MAX_RESULTS = 1000; // GitHub search exposes at most 1,000 results per query.

type Commit = {
  repository: {
    full_name: string;
    html_url: string;
    owner: { avatar_url: string };
  };
};
type SearchResult = { total_count: number; incomplete_results: boolean; items: Commit[] };

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") ?? "";
  if (!validGithubUsername(username)) {
    return NextResponse.json({ error: "Invalid GitHub username" }, { status: 400 });
  }

  const since = new Date();
  const day = since.getUTCDate();
  since.setUTCDate(1);
  since.setUTCMonth(since.getUTCMonth() - 3);
  const lastDay = new Date(Date.UTC(since.getUTCFullYear(), since.getUTCMonth() + 1, 0)).getUTCDate();
  since.setUTCDate(Math.min(day, lastDay));
  const query = `author:${username} committer-date:>=${since.toISOString().slice(0, 10)}`;
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "User-Agent": "tanav-portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  async function search(page: number): Promise<SearchResult> {
    const params = new URLSearchParams({ q: query, sort: "committer-date", order: "desc", per_page: String(PAGE_SIZE), page: String(page) });
    const response = await fetch(`https://api.github.com/search/commits?${params}`, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`GitHub search failed: ${response.status}`);
    return response.json();
  }

  try {
    const result = await cachedGithubData(`github:repos:${username.toLowerCase()}`, async () => {
      const first = await search(1);
      const pageCount = Math.ceil(Math.min(first.total_count, MAX_RESULTS) / PAGE_SIZE);
      const pages = await Promise.all(Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => search(i + 2)));
      const counts = new Map<string, { name: string; count: number; href: string; avatar: string }>();
      for (const { items } of [first, ...pages]) {
        for (const { repository } of items) {
          const existing = counts.get(repository.full_name);
          if (existing) existing.count++;
          else counts.set(repository.full_name, { name: repository.full_name, count: 1, href: repository.html_url, avatar: repository.owner.avatar_url });
        }
      }
      const repos = Array.from(counts.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 3);
      return { repos, sampled: first.total_count > MAX_RESULTS || [first, ...pages].some((page) => page.incomplete_results) };
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "GitHub activity is unavailable" }, { status: 502 });
  }
}

