import type { Metadata } from "next";
import React from "react";
import { projects } from "../../lib/projects";
import type { Project } from "../../lib/projects";
import Image from "next/image";
import { Globe, Youtube } from "lucide-react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip-card";

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
          className: "w-4 h-4 m-1/2 text-muted-foreground",
        })}
      <div className="flex flex-col flex-1">
        <Tooltip
          containerClassName="text-sm cursor-pointer font-medium text-[var(--text)] capitalize -mt-1 w-fit"
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
        <p className="text-xs leading-5 text-[var(--text-muted)] first-letter:capitalize w-full wrap-anywhere mt-1">
          {brief}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
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
                    className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
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
    <section className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="page-title">
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
