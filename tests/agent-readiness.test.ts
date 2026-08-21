import { describe, expect, test } from "bun:test";
import { getAgentMarkdown, llmsText } from "../lib/agent-content";
import { negotiateRepresentation } from "../lib/accept";

describe("Markdown content negotiation", () => {
  test("selects Markdown when it is preferred", () => {
    expect(negotiateRepresentation("text/markdown, text/html;q=0.8")).toBe("markdown");
  });

  test("honors q-values and returns 406 for unsupported media types", () => {
    expect(negotiateRepresentation("text/html;q=0.9, text/markdown;q=0.1")).toBe("html");
    expect(negotiateRepresentation("application/json")).toBe("not-acceptable");
  });
});

describe("agent-facing content", () => {
  test("home Markdown has an H1 and substantial server-rendered content", () => {
    const page = getAgentMarkdown("/");
    expect(page.status).toBe(200);
    expect(page.body).toStartWith("# Tanav Poswal");
    expect(page.body.length).toBeGreaterThan(500);
  });

  test("unknown paths have a recoverable Markdown 404", () => {
    const page = getAgentMarkdown("/not-a-real-page");
    expect(page.status).toBe(404);
    expect(page.body).toContain("sitemap.xml");
    expect(page.body).toContain("llms.txt");
  });

  test("llms.txt names the developer resource index", () => {
    expect(llmsText).toContain("Developer Resources");
    expect(llmsText).toContain("https://tanav.me/developer");
  });

  test("blog Markdown preserves published article content", () => {
    const page = getAgentMarkdown("/blog/first-post");
    expect(page.status).toBe(200);
    expect(page.body).toContain("my first post");
  });

  test("developer resources have a Markdown representation", () => {
    const page = getAgentMarkdown("/developer");
    expect(page.status).toBe(200);
    expect(page.body).toContain("llms.txt");
  });
});
