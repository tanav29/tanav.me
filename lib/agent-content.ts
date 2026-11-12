import fs from "fs";
import matter from "gray-matter";
import { experience } from "./experience";
import { oss } from "./oss";
import { projects } from "./projects";
import { profile, skillGroups } from "./profile";
import getBlogMetadata from "./posts";

const SITE_URL = "https://tanav.me";
const textUrl = (path: string) => `${SITE_URL}/text${path === "/" ? "/home" : path}`;

const home = `# Tanav Poswal

${profile.introduction}

${profile.availability}

## About me

${profile.approach}

${profile.education}

${profile.personal}

## What I work with

${skillGroups.map((group) => `### ${group.name}\n\n${group.description}`).join("\n\n")}

- [GitHub](https://github.com/tanav29)
- [LinkedIn](https://linkedin.com/in/tanav29)
- [Resume](https://dub.sh/tanav-resume)
- [Email](mailto:hey@tanav.me)
- [Contact](https://cal.com/tanav29)

## Open source

${oss.map((pr) => `- [${pr.name}](${pr.link}) — ${pr.repo}`).join("\n")}
`;

const projectContent = () => `# Projects by Tanav Poswal\n\n${projects.map((project) => {
  const links = [
    project.web && `[Website](${project.web})`,
    project.git && `[Source](${project.git})`,
    project.info && `[Announcement](${project.info})`,
    project.video && `[Video](https://www.youtube.com/watch?v=${project.video})`,
    project.img && `[Image](${SITE_URL}${project.img})`,
  ].filter(Boolean).join(" · ");
  const caseStudy = project.caseStudy
    ? `\n\nThe problem: ${project.caseStudy.problem}\n\nWhat I built: ${project.caseStudy.implementation}\n\nThe result: ${project.caseStudy.outcome}`
    : "";
  return `## ${project.name}\n\n${project.brief}${caseStudy}\n\nTechnologies: ${project.tech.join(", ")}.\n\n${links}`;
}).join("\n\n")}\n`;

const experienceContent = () => `# Experience\n\n${experience.map((job) =>
  `## ${job.url ? `[${job.company}](${job.url})` : job.company}\n\n${job.role} — ${job.period}, ${job.location}\n\n${job.description}${job.img ? `\n\n[Image](${SITE_URL}${job.img})` : ""}`
).join("\n\n")}\n`;

function blogPost(slug: string) {
  const file = `blogs/${slug}.md`;
  if (!fs.existsSync(file)) return null;
  const post = matter(fs.readFileSync(file, "utf8"));
  return `# ${post.data.title}\n\nDate: ${new Date(post.data.date).toISOString().slice(0, 10)}\n\n${post.content.trim()}\n`;
}

export function getAgentMarkdown(pathname: string): { body: string; status: number } {
  if (pathname === "/") return { body: home, status: 200 };
  if (pathname === "/projects") return { body: projectContent(), status: 200 };
  if (pathname === "/experience") return { body: experienceContent(), status: 200 };
  if (pathname === "/blog") {
    const posts = getBlogMetadata("blogs").map((post) =>
      `- [${post.title}](${textUrl(`/blog/${post.slug}`)}) — ${post.date.toISOString().slice(0, 10)}`
    ).join("\n");
    return { body: `# Writing by Tanav Poswal\n\n${posts}\n`, status: 200 };
  }
  const match = pathname.match(/^\/blog\/([a-z0-9-]+)$/i);
  const post = match && blogPost(match[1]);
  if (post) return { body: post, status: 200 };
  return { body: `# Page not found\n\nSee the [portfolio](${SITE_URL}/) or [complete portfolio text](${SITE_URL}/llms-full.txt).\n`, status: 404 };
}

export function getFullPortfolio() {
  const posts = getBlogMetadata("blogs").map((post) => blogPost(post.slug)).join("\n\n---\n\n");
  return [home, projectContent(), experienceContent(), `# Writing\n\n${posts}`].join("\n\n---\n\n");
}

export const llmsText = `# Tanav Poswal

> Portfolio of Tanav Poswal, a software engineer based in India.

- [Complete portfolio](${SITE_URL}/llms-full.txt): biography, links, projects, experience, open-source contributions, and full articles.
- [Home](${textUrl("/")})
- [Projects](${textUrl("/projects")})
- [Experience](${textUrl("/experience")})
- [Writing](${textUrl("/blog")})
`;
