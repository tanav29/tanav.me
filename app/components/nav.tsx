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
    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium sm:gap-x-6">
      {navItems.map(({ href, name }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
          className={`py-2 focus-visible:outline-2 focus-visible:outline-offset-4 ${pathname === href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {name}
        </Link>
      ))}
    </nav>
  );
}

