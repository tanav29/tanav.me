import { oss } from "../lib/oss";
import getBlogMetadata from "../lib/posts";
import { experience } from "../lib/experience";
import {
  ChevronRightIcon,
  GitPullRequestArrowIcon,
  FileTextIcon,
  SendIcon,
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
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import Border from "./components/border";
import { TechMarquee } from "./components/techmarquee";
import HomeText from "./components/home-text";
import ImagePop from "./components/image-pop";
import Email from "./components/email";
import { Suspense } from "react";

export default function Page() {
  // const recentProjects = projects.slice(0, 3);
  const recentPosts = getBlogMetadata("blogs").slice(0, 3);

  return (
    <section className="flex flex-col gap-6">
      <section className="flex flex-col gap-6 px-4 sm:px-6">
        <div className="rounded-lg border border-(--border) overflow-hidden relative h-auto aspect-18/6">
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
        </div>
        <div className="flex items-end gap-3 relative">
          <ImagePop />

          <div className="absolute top-0 right-0">
            <Suspense>
              <ViewerNumber />
            </Suspense>
          </div>

          <div className="w-full flex items-center justify-between">
            <HomeText />
            <div
              className="gap-2 items-center hidden sm:flex"
              aria-hidden="true"
            >
              <TypeScript className="w-5 h-5" />
              <Go className="w-7 h-7" />
              <Python className="w-5 h-5" />
              <CPlusPlus className="w-5 h-5" />
              <SiRust className="w-5 h-5" />
            </div>
          </div>
        </div>

        <p className="text-[var(--text-muted)] leading-relaxed max-w-prose">
          Full-stack web developer with a strong interest in GenAI. I design
          minimal interfaces, robust APIs, and scalable architectures built to
          last. I prefer intelligent systems over monolithic solutions.
          Constantly learning, execution-driven, and motivated to create
          real-world impact while helping others grow.
        </p>

        <div className="flex gap-2 text-sm p-1/2">
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
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[var(--text)] items-center mt-2">
          <IconLink link="https://x.com/tanav29" tooltip="X">
            <IconBrandX className="w-5 h-5" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://github.com/tanav29" tooltip="Github">
            <IconBrandGithub className="w-5 h-5" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://linkedin.com/in/tanav29" tooltip="Linkedin">
            <IconBrandLinkedin className="w-5 h-5" aria-hidden="true" />
          </IconLink>
          <IconLink link="https://leetcode.com/tanav29" tooltip="Leetcode">
            <SiLeetcode className="w-5 h-5" aria-hidden="true" />
          </IconLink>
          <Email />
        </div>
      </section>

      <Border />

      <section>
        <TechMarquee />
      </section>

      <Border />

      <Suspense>
        <GithubCalendarClient username="thetanav" blockSize={7} />
      </Suspense>

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
