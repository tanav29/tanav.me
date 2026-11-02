import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { experience } from "@/lib/experience";
import { oss } from "@/lib/oss";
import { projects } from "@/lib/projects";
import GitHubActivity from "@/components/ui/github-activity";
import MergedPullRequests from "./components/merged-pull-requests";
import ViewerNumber from "./components/viewer";

const section = "border-t border-neutral-100 py-7";
const heading = "text-sm font-medium text-neutral-900";
const more = "text-xs text-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4";
const link = "text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4";

export default function Page() {
  return (
    <div className="px-5 sm:px-7">
      <section className="pb-8 pt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/pfp.png" alt="" width={44} height={44} priority className="size-11 rounded-full object-cover" />
            <div>
              <h1 className="text-xl font-medium tracking-tight text-neutral-900">tanav poswal</h1>
              <p className="mt-0.5 text-xs text-neutral-500">software engineer based in india</p>
            </div>
          </div>
          <Suspense fallback={null}><ViewerNumber /></Suspense>
        </div>
        <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600">i build web applications, backend systems, and open-source software.</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a className={link} href="https://github.com/tanav29">github</a>
          <a className={link} href="https://linkedin.com/in/tanav29">linkedin</a>
          <a className={link} href="https://dub.sh/tanav-resume">resume</a>
          <a className={link} href="mailto:hey@tanav.me">email</a>
          <a className={link} href="https://cal.com/tanav29">contact</a>
        </div>
      </section>

      <section className={section} aria-labelledby="activity-heading">
        <div className="flex items-center justify-between gap-4">
          <h2 id="activity-heading" className={heading}>github activity</h2>
          <a href="https://github.com/tanav29" className={more}>view profile ↗</a>
        </div>
        <GitHubActivity username="tanav29" className="mt-4" />
      </section>

      <section className={section} aria-labelledby="oss-heading">
        <h2 id="oss-heading" className={heading}>open source</h2>
        <div className="mt-2"><Suspense fallback={<span className="text-xs text-neutral-500">loading merged pull requests…</span>}><MergedPullRequests /></Suspense></div>
        <h3 className="mt-5 text-xs text-neutral-500">notable pull requests</h3>
        <ul className="mt-2 divide-y divide-neutral-100">
          {oss.map((pr) => (
            <li key={pr.link}>
              <a href={pr.link} className="group flex items-start justify-between gap-3 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-4">
                <span><span className="block text-neutral-800 group-hover:underline underline-offset-4">{pr.name}</span><span className="mt-1 block text-xs text-neutral-500">{pr.repo}</span></span>
                <span aria-hidden="true" className="text-xs text-neutral-400">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={section} aria-labelledby="projects-heading">
        <div className="flex items-center justify-between gap-4"><h2 id="projects-heading" className={heading}>selected projects</h2><Link href="/projects" className={more}>all projects →</Link></div>
        <div className="mt-3 divide-y divide-neutral-100">
          {projects.slice(0, 3).map((project) => (
            <article key={project.name} className="py-3 first:pt-1 last:pb-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-medium text-neutral-800">{project.name}</h3>
                <div className="flex shrink-0 gap-3">
                  {project.git && <a className={more} href={project.git}>code<span className="sr-only"> for {project.name}</span> ↗</a>}
                  {project.web && <a className={more} href={project.web}>live<span className="sr-only"> site for {project.name}</span> ↗</a>}
                </div>
              </div>
              <p className="mt-1 text-xs leading-5 text-neutral-500">{project.brief}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={section} aria-labelledby="experience-heading">
        <div className="flex items-center justify-between gap-4"><h2 id="experience-heading" className={heading}>experience</h2><Link href="/experience" className={more}>more details →</Link></div>
        <div className="mt-4 space-y-4">
          {experience.map((job) => (
            <article key={job.company} className="flex items-start justify-between gap-3">
              <div><h3 className="text-sm font-medium text-neutral-800"><a href={job.url} className="hover:underline underline-offset-4">{job.company}</a></h3><p className="mt-1 text-xs text-neutral-500">{job.role}</p></div>
              <span className="shrink-0 text-xs text-neutral-500">{job.period}</span>
            </article>
          ))}
        </div>
      </section>
      <section className={`${section} flex items-center justify-between gap-4`}><h2 className={heading}>writing</h2><Link href="/blog" className={more}>read the blog →</Link></section>
    </div>
  );
}
