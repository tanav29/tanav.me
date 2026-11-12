import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { experience } from "@/lib/experience";
import { oss } from "@/lib/oss";
import { projects } from "@/lib/projects";
import { profile, skillGroups } from "@/lib/profile";
import GitHubActivity from "@/components/ui/github-activity";
import MergedPullRequests from "./components/merged-pull-requests";
import ViewerNumber from "./components/viewer";
import styles from "./page.module.css";

// GitHub stats are fetched by server components; render this page per request
// so a static build cannot freeze the merged PR count at build time.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div>
      <section className="pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className={styles.macintosh}>
              <div className={styles.case}>
                <div className={styles.screen}>
                  <Image
                    src="/pfp.png"
                    alt="Tanav Poswal on a Macintosh screen"
                    fill
                    sizes="36px"
                    priority
                    className={styles.portrait}
                  />
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="page-title">Tanav Poswal</h1>
              <p className="text-xs text-muted-foreground">software engineer based in india</p>
            </div>
          </div>
          <Suspense fallback={null}><ViewerNumber /></Suspense>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{profile.introduction}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile.availability}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <a className="inline-link" href="https://github.com/tanav29">github</a>
          <a className="inline-link" href="https://linkedin.com/in/tanav29">linkedin</a>
          <a className="inline-link" href="https://dub.sh/tanav-resume">view résumé</a>
          <a className="inline-link" href="mailto:hey@tanav.me">email me</a>
          <a className="inline-link" href="https://cal.com/tanav29">contact</a>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-heading">about me</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
          <p>{profile.approach}</p>
          <p>{profile.education}</p>
          <p>{profile.personal}</p>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="oss-heading">
        <div className="section-header">
          <h2 id="oss-heading" className="section-heading">open source</h2>
          <Suspense fallback={<span className="text-xs text-muted-foreground">loading merged pull requests…</span>}><MergedPullRequests /></Suspense>
        </div>
        <ul className="content-list mt-4">
          {oss.map((pr) => (
            <li key={pr.link}>
              <a href={pr.link} className="group block text-sm">
                <span className="block text-foreground group-hover:underline underline-offset-4">{pr.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{pr.repo}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-section" aria-labelledby="projects-heading">
        <div className="section-header"><h2 id="projects-heading" className="section-heading">selected projects</h2><Link href="/projects" className="section-link">projects</Link></div>
        <div className="content-list mt-4">
          {projects.filter((project) => project.featured).map((project) => (
            <article key={project.name}>
              <div className="section-header gap-x-3">
                <h3 className="section-heading">{project.name}</h3>
                <div className="flex shrink-0 gap-3">
                  {project.git && <a className="section-link" href={project.git}>code<span className="sr-only"> for {project.name}</span> </a>}
                  {project.web && <a className="section-link" href={project.web}>live<span className="sr-only"> site for {project.name}</span> </a>}
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.brief}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.tech.join(", ")}</p>
              <Link href={`/projects#${project.name.toLowerCase().replace(/\s+/g, "-")}`} className="inline-link mt-2 inline-block text-sm">how I built it<span className="sr-only">: {project.name}</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="experience-heading">
        <div className="section-header"><h2 id="experience-heading" className="section-heading">experience</h2><Link href="/experience" className="section-link">details</Link></div>
        <div className="content-list mt-4">
          {experience.map((job) => (
            <article key={job.company}>
              <div className="section-header gap-x-3">
                <h3 className="section-heading">{job.url ? <a href={job.url} className="hover:underline underline-offset-4">{job.company}</a> : job.company}</h3>
                <span className="text-xs text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{job.role}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{job.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="portfolio-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="section-heading">what I work with</h2>
        <dl className="content-list mt-4">
          {skillGroups.map((group) => (
            <div key={group.name}>
              <dt className="text-sm font-medium">{group.name}</dt>
              <dd className="mt-1 text-sm leading-6 text-muted-foreground">{group.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="portfolio-section" aria-labelledby="writing-heading">
        <div className="section-header"><h2 id="writing-heading" className="section-heading">writing</h2><Link href="/blog" className="section-link">all articles</Link></div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">I use writing to work through the systems I'm learning and building.</p>
        <ul className="content-list mt-3 text-sm">
          <li><Link className="inline-link" href="/blog/asynchronous">Building a real-time notification engine</Link></li>
          <li><Link className="inline-link" href="/blog/modern-transformer">From the original transformer to modern LLMs</Link></li>
        </ul>
      </section>
      <section className="portfolio-section" aria-label="GitHub activity">
        <GitHubActivity username="tanav29" />
      </section>
    </div>
  );
}
