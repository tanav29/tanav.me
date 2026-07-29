"use client";

import ActivityCalendar, {
  type Activity,
} from "react-activity-calendar";
import { useEffect, useState } from "react";

export default function GithubCalendarClient({
  username = "tanav29",
  blockSize = 1,
  contributions,
}: {
  username?: string;
  blockSize?: number;
  contributions: Activity[];
}) {
  const [theme, setTheme] = useState("light");

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

  return (
    <section
      aria-label={`${username}'s GitHub contribution calendar`}
      className="w-full flex items-center justify-center overflow-clip bg-background"
    >
      <ActivityCalendar
        data={contributions}
        style={{ width: "fit-content" }}
        blockRadius={2}
        colorScheme={theme === "dark" ? "dark" : "light"}
        theme={{
          light: ["#e5e5e5", "#a3a3a3", "#737373", "#525252", "#111111"],
          dark: ["#262626", "#52525b", "#71717a", "#a1a1aa", "#ededed"],
        }}
        blockSize={blockSize}
      />
    </section>
  );
}

