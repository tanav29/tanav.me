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
    <article className="group flex items-start gap-3">
      {icon &&
        React.createElement(icon, {
          className: "mt-1 size-4 shrink-0 text-muted-foreground",
          "aria-hidden": true,
        })}
      <div className="flex min-w-0 flex-1 flex-col">
        <Tooltip
          containerClassName="section-heading w-fit capitalize"
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
        <p className="mt-1 w-full text-xs leading-5 text-muted-foreground first-letter:capitalize wrap-anywhere">
          {brief}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {video && (
            <Dialog>
              <DialogTrigger
                render={
                  <button type="button" className="icon-action" aria-label={`Watch ${name} demo`}>
                    <Youtube
                      aria-hidden="true"
                      className="size-4"
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
              className="icon-action"
              aria-label={`Open ${name} website`}>
              <Globe
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}
          {git && (
            <a
              href={git}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action"
              aria-label={`Open ${name} GitHub repository`}>
              <IconBrandGithub
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}
          {info && (
            <a
              href={info}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action"
              aria-label={`Open ${name} announcement`}>
              <IconBrandTwitter
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="page-stack">
      <h1 className="page-title">Completed Projects</h1>
      <div className="content-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
