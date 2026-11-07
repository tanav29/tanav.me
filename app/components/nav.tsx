"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", name: "home" },
  { href: "/projects", name: "projects" },
  { href: "/experience", name: "experience" },
  { href: "/blog", name: "writing" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-medium">
      <div className="flex flex-wrap items-center gap-x-3">
        {navItems.map(({ href, name }) => {
          const active = href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-10 items-center transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {name}
            </Link>
          );
        })}
      </div>
      <div aria-label="Viewing mode" className="flex items-center rounded-lg border border-border p-1 text-xs">
        <span aria-current="page" className="rounded-md bg-muted px-2 py-1 text-foreground">human</span>
        <a href="/llm.txt" className="section-link rounded-md px-2 py-1">agent</a>
      </div>
    </nav>
  );
}
