"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolvedTheme || theme || "light";

  const toggleTheme = () => {
    setTheme(current === "light" ? "dark" : "light");
  };

  useHotkey("D", () => {
    toggleTheme();
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${current === "light" ? "dark" : "light"} theme`}
          aria-pressed={current === "dark"}
          className="group relative inline-flex h-7 w-7 items-center justify-center text-(--text) cursor-pointer outline-none duration-300"
        >
          {mounted && (
            <div className="relative w-4 h-4">
              <MoonIcon
                className={`absolute inset-0 w-full h-full transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  current === "light"
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-50 rotate-90"
                }`}
                aria-hidden="true"
              />
              <SunIcon
                className={`absolute inset-0 w-full h-full transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  current === "dark"
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-50 -rotate-90"
                }`}
                aria-hidden="true"
              />
            </div>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Toggle Theme{" "}
          <KbdGroup>
            <Kbd>D</Kbd>
          </KbdGroup>
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
