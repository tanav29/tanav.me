import type { Metadata } from "next";
import { experience } from "../../lib/experience";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experience",
  description: "My work experience.",
};

export default function ExperiencePage() {
  return (
    <section className="page-stack">
      <h1 className="page-title">
        Experience
      </h1>
      <div className="content-list">
        {experience.map((job) => (
          <article className="flex w-full items-start gap-3" key={job.company}>
            {job.img ? <Image
              alt={job.company}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-lg border border-border"
              src={job.img}
            /> : <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">{job.company.charAt(0)}</span>}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="section-header gap-x-3">
                <div>
                  {job.url ? <a
                    href={job.url}
                    className="section-heading underline-offset-4 hover:underline"
                  >
                    {job.company}
                  </a> : <h2 className="section-heading">{job.company}</h2>}
                  <p className="mt-1 text-xs text-muted-foreground">{job.role}</p>
                </div>
                <div className="flex flex-col text-xs text-muted-foreground sm:ml-auto sm:items-end">
                  <span>
                    {job.period}
                  </span>
                  <span className="mt-1">
                    {job.location}
                  </span>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {job.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
