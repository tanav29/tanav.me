import { cachedGithubData } from "@/lib/github-cache";

const searchUrl = "https://github.com/search?q=author%3Atanav29+is%3Apr+is%3Amerged+-user%3Atanav29&type=pullrequests";

export default async function MergedPullRequests() {
  let count: number | null = null;
  try {
    count = await cachedGithubData("github:merged-prs:tanav29", async () => {
      const response = await fetch("https://api.github.com/search/issues?q=author%3Atanav29+is%3Apr+is%3Amerged+-user%3Atanav29&per_page=1", {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "tanav-portfolio" },
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error(`GitHub search failed: ${response.status}`);
      const data = await response.json();
      if (typeof data.total_count !== "number") throw new Error("Invalid GitHub search result");
      return data.total_count as number;
    });
  } catch {
    // A link to the search remains available if GitHub is unreachable.
  }

  return <a href={searchUrl} className="text-xs text-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4">{count === null ? "view merged pull requests" : <><span className="font-medium text-neutral-900 tabular-nums">{count}</span> prs</>}</a>;
}
