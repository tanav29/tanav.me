import type { Metadata } from "next";
import { experience } from "../../lib/experience";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experience",
  description: "My work experience.",
};

export default function ExperiencePage() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="page-title">
        Experience
      </h1>
      <div className="flex flex-col gap-8">
        {experience.map((job) => (
          <div className="flex sm:flex-row flex-col gap-3 w-full" key={job.url}>
            <Image
              alt={job.company}
              width={40}
              height={40}
              className="w-10 h-10 sm:mb-0 mb-2 rounded-md border border-[var(--border)]"
              src={job.img}
            />
            <div className="flex flex-2 flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <a
                    href={job.url}
                    className="font-medium text-[var(--text)] hover:underline text-sm"
                  >
                    {job.company}
                  </a>
                  <p className="text-xs text-[var(--text-muted)]">{job.role}</p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="text-xs text-[var(--text-muted)]">
                    {job.period}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {job.location}
                  </span>
                </div>
              </div>

              <p className="text-xs leading-5 text-[var(--text-muted)]">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
