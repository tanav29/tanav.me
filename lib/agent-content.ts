import fs from "fs";
import matter from "gray-matter";
import { experience } from "./experience";
import { projects } from "./projects";
import getBlogMetadata from "./posts";

const SITE_URL = "https://tanav.me";

const home = `# Tanav Poswal — Full-stack Software Engineer

Tanav Poswal is a full-stack software engineer based in India. He builds intelligent, scalable, and reliable software, with particular interest in backend engineering, distributed systems, system design, AI-powered applications, and clean architecture. His approach starts with first principles: understand the problem, weigh the trade-offs, and build systems that stay maintainable as they grow.

This portfolio documents Tanav's selected projects, professional experience, open-source work, and technical writing. Browse [projects](${SITE_URL}/projects), [experience](${SITE_URL}/experience), or the [writing archive](${SITE_URL}/blog). For developer-oriented resources and machine-readable entry points, visit [Developer Resources](${SITE_URL}/developer) and [llms.txt](${SITE_URL}/llms.txt).
`;

const notFound = `# Page not found

The requested page does not exist on Tanav Poswal's portfolio.

- [Home](${SITE_URL}/)
- [Projects](${SITE_URL}/projects)
- [Experience](${SITE_URL}/experience)
- [Writing](${SITE_URL}/blog)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [LLMs guide](${SITE_URL}/llms.txt)
`;

export function getAgentMarkdown(pathname: string): { body: string; status: number } {
  if (pathname === "/") return { body: home, status: 200 };

  if (pathname === "/projects") {
    const items = projects
      .map((project) => `## ${project.name}\n\n${project.brief}\n\nTechnologies: ${project.tech.join(", ")}.\n\n${project.web ? `[Website](${project.web})` : ""}${project.git ? ` [Source](${project.git})` : ""}`)
      .join("\n\n");
    return { body: `# Projects by Tanav Poswal\n\n${items}\n`, status: 200 };
  }

  if (pathname === "/experience") {
    const items = experience
      .map((job) => `## [${job.company}](${job.url})\n\n${job.role} — ${job.period}, ${job.location}\n\n${job.description}`)
      .join("\n\n");
    return { body: `# Experience\n\n${items}\n`, status: 200 };
  }

  if (pathname === "/blog") {
    const posts = getBlogMetadata("blogs")
      .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}) — ${post.date.toISOString().slice(0, 10)}`)
      .join("\n");
    return { body: `# Writing by Tanav Poswal\n\n${posts}\n`, status: 200 };
  }

  if (pathname === "/developer") {
    return {
      body: `# Tanav Poswal Developer Resources

- [llms.txt](${SITE_URL}/llms.txt) — concise site guide for language models and agents.
- [sitemap.xml](${SITE_URL}/sitemap.xml) — machine-readable public-page inventory.
- [Projects](${SITE_URL}/projects) — project-specific source and deployment links.

Tanav Poswal does not currently publish a public API, OpenAPI specification, authentication guide, webhook service, or MCP server for this portfolio.
`,
      status: 200,
    };
  }

  const match = pathname.match(/^\/blog\/([a-z0-9-]+)$/i);
  if (match) {
    const file = `blogs/${match[1]}.md`;
    if (fs.existsSync(file)) {
      const post = matter(fs.readFileSync(file, "utf8"));
      return { body: `# ${post.data.title}\n\n${post.content.trim()}\n`, status: 200 };
    }
  }

  return { body: notFound, status: 404 };
}

export const llmsText = `# Tanav Poswal

> Personal portfolio of Tanav Poswal, a full-stack software engineer focused on AI-powered applications, backend systems, distributed systems, and clean architecture.

## Main pages

- [Home](${SITE_URL}/): biography and portfolio overview.
- [Projects](${SITE_URL}/projects): selected software projects and source links.
- [Experience](${SITE_URL}/experience): professional experience.
- [Writing](${SITE_URL}/blog): technical writing archive.

## Developer resources

- [Developer Resources](${SITE_URL}/developer): canonical developer-resource index for Tanav Poswal.
- [Sitemap](${SITE_URL}/sitemap.xml): machine-readable URL inventory.
- [Markdown content negotiation](${SITE_URL}/): send \`Accept: text/markdown\` to receive Markdown from the main portfolio pages.

Tanav Poswal does not currently publish a public API, OpenAPI specification, authentication guide, webhook service, or MCP server for this portfolio. Project-specific source code is linked from the Projects page.
`;
