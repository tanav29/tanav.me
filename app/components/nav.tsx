"use client";

import {
  BrainCircuit,
  BrainCircuitIcon,
  ChevronLeft,
  Ghost,
  GhostIcon,
  Home,
  HomeIcon,
  Notebook,
  NotebookIcon,
  Presentation,
  PresentationIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useHotkey } from "@tanstack/react-hotkeys";

const navItems = {
  "/": {
    name: "Home",
    icon: <Home className="size-4" />,
    short: "h",
  },
  "/blog": {
    name: "Blogs",
    icon: <Notebook className="size-4" />,
    short: "b",
  },
  "/projects": {
    name: "Projects",
    icon: <Presentation className="size-4" />,
    short: "p",
  },
  "/experience": {
    name: "Experience",
    icon: <Ghost className="size-4" />,
    short: "e",
  },
  // "/ai": {
  //   name: "AI",
  //   icon: <BrainCircuit />,
  //   short: "a",
  // },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // useHotkey("A", () => router.push("/ai"));
  useHotkey("P", () => router.push("/projects"));
  useHotkey("E", () => router.push("/experience"));
  useHotkey("B", () => router.push("/blog"));
  useHotkey("H", () => router.push("/"));

  return (
    <nav className="flex items-center justify-center gap-4 text-xs sm:text-sm font-medium overflow-hiddens ml-2">
      {Object.entries(navItems).map(([path, { name, icon, short }], index) => {
        return (
          <Tooltip key={path}>
            <TooltipTrigger asChild>
              <Link
                href={path}
                aria-label={name}
                aria-current={pathname === path ? "page" : undefined}
                className={`flex items-center group transition-colors text-muted-foreground hover:text-primary gap-1 justify-center duration-300 [&svg]:size-4 ${pathname == path && "text-primary"}`}
                prefetch={true}
              >
                <span className="sm:hidden block" aria-hidden="true">
                  {icon}
                </span>
                <span className="hidden sm:block">{name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {name}{" "}
                <KbdGroup>
                  <Kbd>{short.toUpperCase()}</Kbd>
                </KbdGroup>
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
      <Shimmer text={"Open to work"} />
    </nav>
  );
}

export default function Shimmer({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`inline-block select-none ${className}`}>
      <div className="relative overflow-hidden">
        {/* Base text */}
        <span className="text-(--text-muted)">{text}</span>

        {/* Shimmering overlay */}
        <div
          aria-hidden="true"
          className="absolute bg-clip-text text-transparent bg-gradient-to-r from-transparent via-(--text) to-transparent z-10 top-0 left-0 right-0 [background-size:50%_100%] [background-repeat:no-repeat]"
          style={{
            animation: "wave 2s linear infinite",
          }}
        >
          <style jsx>{`
            @keyframes wave {
              0% {
                background-position: -150% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
          `}</style>
          {text}
        </div>
      </div>
    </div>
  );
}
