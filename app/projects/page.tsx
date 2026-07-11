import type { Metadata } from "next";
import React from "react";
import { projects } from "../../lib/projects";
import type { Project } from "../../lib/projects";
import Image from "next/image";
import { Globe, Youtube } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip-card";

const mono = Geist_Mono({
  subsets: ["latin"],
});

export function ProjectCard({
  img,
  icon,
  name,
  brief,
  tech,
  web,
  git,
  info,
  video,
}: Project) {
  return (
    <div className="group flex sm:flex-row flex-col items-start gap-4">
      {icon &&
        React.createElement(icon, {
          className: "w-5 h-5 m-1/2 text-muted-foreground",
        })}
      <div className="flex flex-col flex-1">
        <Tooltip
          containerClassName="text-md sm:text-lg font-semibold text-[var(--text)] capitalize first-letter:text-lg -mt-1 w-fit"
          content={
            <Image
              width={200}
              height={200}
              src={img}
              alt={name}
              draggable={false}
              loading="lazy"
              className="object-cover aspect-video w-56 h-fit select-none"
            />
          }>
          {name}
        </Tooltip>
        <p className="text-sm text-[var(--text-muted)] first-letter:capitalize w-full wrap-anywhere mt-1">
          {brief}
        </p>
        <div className={`flex flex-wrap ${mono.className} gap-1 mt-1`}>
          {tech.map((t) => (
            <span
              key={t}
              className="transition text-xs text-(--text-muted) pr-1">
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {video && (
          <Dialog>
            <DialogTrigger
              render={
                <button className="outline-none cursor-pointer">
                  <Youtube
                    aria-hidden="true"
                    className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                  />
                </button>
              }
            />
            <DialogContent className="sm:max-w-xl">
              <DialogTitle>{name}</DialogTitle>
              <div
                style={{
                  overflow: "hidden",
                  paddingBottom: "56.25%",
                  position: "relative",
                  height: 0,
                }}>
                <iframe
                  style={{
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                  }}
                  src={`https://www.youtube.com/embed/${video}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded YouTube Video"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        {web && (
          <a
            href={web}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name} website`}>
            <Globe
              aria-hidden="true"
              className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
            />
          </a>
        )}
        {git && (
          <a
            href={git}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name} GitHub repository`}>
            <IconBrandGithub
              aria-hidden="true"
              className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
            />
          </a>
        )}
        {info && (
          <a
            href={info}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name} announcement`}>
            <IconBrandTwitter
              aria-hidden="true"
              className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="flex flex-col gap-6 px-4 sm:px-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text)]">
          Completed Projects
        </h1>
      </div>
      <div className="flex flex-col space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
