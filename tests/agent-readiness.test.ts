import { describe, expect, test } from "bun:test";
import fs from "fs";
import matter from "gray-matter";
import { getAgentMarkdown, getFullPortfolio, llmsText } from "../lib/agent-content";
import { negotiateRepresentation } from "../lib/accept";
import { experience } from "../lib/experience";
import { oss } from "../lib/oss";
import { projects } from "../lib/projects";
import getBlogMetadata from "../lib/posts";

describe("Markdown content negotiation", () => {
  test("selects the preferred supported representation", () => {
    expect(negotiateRepresentation("text/markdown, text/html;q=0.8")).toBe("markdown");
    expect(negotiateRepresentation("text/html;q=0.9, text/markdown;q=0.1")).toBe("html");
    expect(negotiateRepresentation("application/json")).toBe("not-acceptable");
  });
});

describe("agent-facing portfolio", () => {
  test("the index points to the complete portfolio and individual sections", () => {
    expect(llmsText).toContain("https://tanav.me/llms-full.txt");
    for (const path of ["home", "projects", "experience", "blog"]) {
      expect(llmsText).toContain(`https://tanav.me/text/${path}`);
    }
    expect(llmsText).not.toContain("Developer Resources");
  });

  test("includes every portfolio entry and its relevant details", () => {
    const full = getFullPortfolio();
    for (const project of projects) {
      for (const value of [project.name, project.brief, ...project.tech, project.web, project.git, project.info, project.video, project.img]) {
        if (value) expect(full).toContain(value);
      }
    }
    for (const job of experience) {
      for (const value of Object.values(job)) expect(full).toContain(value);
    }
    for (const pr of oss) {
      for (const value of Object.values(pr)) expect(full).toContain(value);
    }
    for (const post of getBlogMetadata("blogs")) {
      const article = matter(fs.readFileSync(`blogs/${post.slug}.md`, "utf8"));
      expect(full).toContain(post.title);
      expect(full).toContain(post.date.toISOString().slice(0, 10));
      expect(full).toContain(article.content.trim());
      expect(getAgentMarkdown(`/blog/${post.slug}`).body).toContain(article.content.trim());
    }
    expect(full).toContain("mailto:hey@tanav.me");
  });

  test("unknown paths return a useful 404", () => {
    const page = getAgentMarkdown("/not-a-real-page");
    expect(page.status).toBe(404);
    expect(page.body).toContain("llms-full.txt");
  });
});
