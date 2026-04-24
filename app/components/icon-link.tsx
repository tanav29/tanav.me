"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IconLink({
  tooltip,
  link,
  children,
}: {
  tooltip: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 hover:rotate-6 text-neutral-600 dark:text-neutral-400 overflow-y-visible">
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
