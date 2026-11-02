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
      <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
      {navItems.map(({ href, name }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
          className={`py-2 focus-visible:outline-2 focus-visible:outline-offset-4 ${pathname === href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {name}
        </Link>
      ))}
      </div>
      <div aria-label="Viewing mode" className="flex items-center rounded-md border border-neutral-200 p-0.5 text-xs">
        <span aria-current="page" className="rounded bg-neutral-100 px-2 py-1 text-neutral-900">human</span>
        <a href="/llm.txt" className="rounded px-2 py-1 text-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2">agent</a>
      </div>
    </nav>
  );
}

