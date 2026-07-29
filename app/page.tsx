import { oss } from "../lib/oss";
import getBlogMetadata from "../lib/posts";
import { experience } from "../lib/experience";
import {
  ChevronRightIcon,
  GitPullRequestArrowIcon,
  FileTextIcon,
  SendIcon,
  Calendar,
} from "lucide-react";
import GithubCalendarClient from "./components/github-calendar";
import Image from "next/image";
import { CPlusPlus, Go, Python, TypeScript } from "developer-icons";
import ViewerNumber from "./components/viewer";
import { SiLeetcode, SiRust } from "react-icons/si";
import Link from "next/link";
import IconLink from "./components/icon-link";
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandLinkedinFilled,
  IconBrandX,
  IconCalendarWeekFilled,
  IconFileFilled,
} from "@tabler/icons-react";
import Border from "./components/border";
import { TechMarquee } from "./components/techmarquee";
import HomeText from "./components/home-text";
import ImagePop from "./components/image-pop";
import Email from "./components/email";
import { Suspense } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./projects/page";

export default function Page() {
  const recentProjects = projects.slice(0, 2);
  const recentPosts = getBlogMetadata("blogs").slice(0, 3);

  return (
    <section className="flex flex-col gap-6">
      <section className="flex flex-col gap-6 px-4 py-6 sm:px-6">
        {/*<div className="rounded-lg border border-(--border) overflow-hidden relative h-auto aspect-18/6">
          <Image
            src="/header.jpg"
            alt=""
            width={2}
            loading="eager"
            height={0.5}
            className="w-full h-full object-contain blur-sm scale-105"
          />
          <Image
            src="/header.jpg"
            alt="Tanav Poswal portfolio banner"
            width={800}
            loading="lazy"
            height={200}
            quality={75}
            className="absolute top-0 bottom-0 z-10 h-full"
          />
        </div>*/}
        <div className="flex items-end gap-3 relative">
          <ImagePop />

          <div className="absolute top-0 right-0">
            <Suspense>
              <ViewerNumber />
            </Suspense>
          </div>

          <div className="w-full flex items-center justify-between">
            <HomeText />
          </div>
        </div>

        <p className="text-[var(--text-muted)] leading-relaxed max-w-prose">
          He is a software engineer passionate about building intelligent, scalable, and reliable systems. His work spans full stack development, AI powered applications, and distributed systems, with a strong focus on system design, backend engineering, and clean architecture. He enjoys solving complex problems by understanding first principles, carefully evaluating tradeoffs, and designing software that remains maintainable as it grows. Curious by nature and driven by execution, he is constantly learning, refining his craft, and building products that create meaningful real world impact while contributing to the developer community through open source and knowledge sharing.
        </p>

        {/*<div className="flex gap-2 text-sm p-1/2">
          <a
            href="https://dub.sh/tanav-resume"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 ring-1 ring-border active:translate-y-0.5 transition-transform rounded-xl flex gap-3 items-center justify-center cursor-pointer bg-linear-to-b from-(--bg) to-(--text)/10 group font-semibold"
          >
            <FileTextIcon
              aria-hidden="true"
              className="rotate-6 w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
            />
            Resume
          </a>
          <a
            href="https://cal.com/tanav29"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 ring-1 ring-border active:translate-y-0.5 transition-transform rounded-xl flex gap-3 items-center justify-center cursor-pointer bg-linear-to-b from-(--text) to-muted-foreground text-(--bg) group font-semibold"
          >
            <SendIcon
              aria-hidden="true"
              className="w-4 h-4 group-hover:-rotate-5 transition"
            />
            Get in touch
          </a>
        </div>*/}

        <div className="flex flex-wrap gap-2 text-sm text-[var(--text)] items-center mt-2">
          <IconLink link="https://x.com/tanavtwt" tooltip="X">
            <IconBrandX className="w-6 h-6 stroke-2" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://github.com/tanav29" tooltip="Github">
            <IconBrandGithubFilled className="w-6 h-6" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://linkedin.com/in/tanav29" tooltip="Linkedin">
            <IconBrandLinkedinFilled className="w-6 h-6" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://leetcode.com/tanav29" tooltip="Leetcode">
            <IconBrandLeetcode className="w-6 h-6 -stroke-3" aria-hidden="true" />
          </IconLink>
          <Email />
          <IconLink link="https://cal.com/tanav29" tooltip="CalCom">
            <IconCalendarWeekFilled  className="w-6 h-6 stroke-2" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://dub.sh/tanav-resume" tooltip="Resume">
            <IconFileFilled  className="w-6 h-6" aria-hidden="true" />
          </IconLink>
        </div>
      </section>

      <Border />

      <section>
        <TechMarquee />
      </section>

      <Border />

      <Suspense>
        <GithubCalendarClient username="tanav29" blockSize={7} />
      </Suspense>

      <Border />

      <h2 className="text-lg font-semibold text-(--text) px-4 sm:px-6 -my-3">
        Projects
      </h2>

      <Border />

      <section className="flex flex-col px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {recentProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="text-sm text-(--text-muted) hover:text-(--text) transition-colors pt-6"
        >
          View all projects →
        </Link>
      </section>

      <Border />

      <h2 className="text-lg font-semibold text-(--text) px-4 sm:px-6 -my-3">
        Experience
      </h2>

      <Border />

      <section className="flex flex-col px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {experience.map((job) => (
            <div key={job.company} className="flex gap-3 w-full">
              <Image
                alt={job.company}
                width={40}
                height={40}
                className="w-10 h-10 rounded-md border border-[var(--border)]"
                src={job.img}
              />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[var(--text)] hover:underline"
                    >
                      {job.company}
                    </a>
                    <p className="text-sm text-[var(--text-muted)]">
                      {job.role}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <span className="text-sm text-[var(--text-muted)]">
                      {job.period}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/experience"
          className="text-sm text-(--text-muted) hover:text-(--text) transition-colors pt-6"
        >
          View all experience →
        </Link>
      </section>

      <Border />

      <h2 className="text-lg font-semibold text-(--text) px-4 sm:px-6 -my-3">
        Open Source
      </h2>

      <Border />

      <section className="flex flex-col gap-8 px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {oss.map((contri) => (
            <a
              key={contri.name}
              href={contri.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-colors"
            >
              <GitPullRequestArrowIcon
                aria-hidden="true"
                className="h-4 w-4 text-purple-600"
              />
              <h3 className="text-(--text) group-hover:text-(--text-muted) text-sm transition-colors">
                {contri.name}
              </h3>
              <ChevronRightIcon
                aria-hidden="true"
                className="ml-auto h-4 w-4 text-(--text-muted)"
              />
            </a>
          ))}
        </div>
      </section>

      <Border />

      <h2 className="text-lg font-semibold text-(--text) px-4 sm:px-6 -my-3">
        Writing
      </h2>

      <Border />

      <section className="flex flex-col gap-8 px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm text-(--text) group-hover:text-(--text-muted) transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-(--text-muted) tabular-nums">
                  {
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][post.date.getUTCMonth()]
                  }{" "}
                  {post.date.getUTCFullYear()}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="text-sm text-(--text-muted) hover:text-(--text) transition-colors"
        >
          Read more →
        </Link>
      </section>
    </section>
  );
}
