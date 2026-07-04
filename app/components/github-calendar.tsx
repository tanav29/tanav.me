"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

export default function GithubCalendarClient({
  username = "tanav29",
  blockSize = 1,
}: {
  username?: string;
  blockSize?: number;
}) {
  const [theme, setTheme] = useState("light");
  const [shouldLoadCalendar, setShouldLoadCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const classBased = document.documentElement.classList.contains("dark");
    const saved = classBased
      ? "dark"
      : document.documentElement.getAttribute("data-theme") ||
        localStorage.getItem("theme") ||
        "light";

    setTheme(saved);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes") {
          if (m.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? "dark" : "light");
          } else if (m.attributeName === "data-theme") {
            const newTheme =
              document.documentElement.getAttribute("data-theme") || "light";
            setTheme(newTheme);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let didLoad = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadCalendar = () => {
      if (didLoad) return;
      didLoad = true;
      setShouldLoadCalendar(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadCalendar();
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    const calendar = calendarRef.current;
    if (calendar) observer.observe(calendar);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadCalendar, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(loadCalendar, 1200);
    }

    return () => {
      observer.disconnect();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={calendarRef}
      aria-label={`${username}'s GitHub contribution calendar`}
      className="w-full flex items-center justify-center overflow-clip bg-background"
    >
      {shouldLoadCalendar ? (
        <GitHubCalendar
          style={{
            width: "fit-content",
          }}
          blockRadius={2}
          username={username}
          colorScheme={theme === "dark" ? "dark" : "light"}
          theme={{
            light: ["#e5e5e5", "#a3a3a3", "#737373", "#525252", "#111111"],
            dark: ["#262626", "#52525b", "#71717a", "#a1a1aa", "#ededed"],
          }}
          blockSize={blockSize}
        />
      ) : (
        <CalendarSkeleton />
      )}
    </section>
  );
}

function CalendarSkeleton() {
  return (
    <div
      className="grid grid-flow-col grid-rows-7 gap-1 py-1"
      aria-hidden="true"
    >
      {Array.from({ length: 53 * 7 }).map((_, index) => (
        <div
          key={index}
          className="size-1.75 rounded-xs bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}
