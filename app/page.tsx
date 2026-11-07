import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { experience } from "@/lib/experience";
import { oss } from "@/lib/oss";
import { projects } from "@/lib/projects";
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
        <p className="mt-4 text-sm leading-6 text-muted-foreground">i build web applications, backend systems, and open-source software.</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a className="inline-link" href="https://github.com/tanav29">github</a>
          <a className="inline-link" href="https://linkedin.com/in/tanav29">linkedin</a>
          <a className="inline-link" href="https://dub.sh/tanav-resume">resume</a>
          <a className="inline-link" href="mailto:hey@tanav.me">email</a>
          <a className="inline-link" href="https://cal.com/tanav29">contact</a>
        </div>
      </section>

      <div className="pb-6">
        <GitHubActivity username="tanav29" />
      </div>

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
          {projects.slice(0, 3).map((project) => (
            <article key={project.name}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="section-heading">{project.name}</h3>
                <div className="flex shrink-0 gap-3">
                  {project.git && <a className="section-link" href={project.git}>code<span className="sr-only"> for {project.name}</span> </a>}
                  {project.web && <a className="section-link" href={project.web}>live<span className="sr-only"> site for {project.name}</span> </a>}
                </div>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{project.brief}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="experience-heading">
        <div className="section-header"><h2 id="experience-heading" className="section-heading">experience</h2><Link href="/experience" className="section-link">details</Link></div>
        <div className="content-list mt-4">
          {experience.map((job) => (
            <article key={job.company} className="flex items-start justify-between gap-3">
              <div className="min-w-0"><h3 className="section-heading"><a href={job.url} className="hover:underline underline-offset-4">{job.company}</a></h3><p className="mt-1 text-xs text-muted-foreground">{job.role}</p></div>
              <span className="shrink-0 text-xs text-muted-foreground">{job.period}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="portfolio-section section-header"><h2 className="section-heading">writing</h2><Link href="/blog" className="section-link">blogs</Link></section>
    </div>
  );
}
