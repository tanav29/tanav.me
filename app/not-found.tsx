import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col gap-6 px-4 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text)]">Page not found</h1>
        <p className="text-[var(--text-muted)] leading-relaxed">This page does not exist. Try one of these useful starting points:</p>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
        <li><Link className="underline hover:text-[var(--text)]" href="/">Home</Link></li>
        <li><Link className="underline hover:text-[var(--text)]" href="/projects">Projects</Link></li>
        <li><Link className="underline hover:text-[var(--text)]" href="/blog">Writing</Link></li>
        <li><Link className="underline hover:text-[var(--text)]" href="/sitemap.xml">Sitemap</Link> or <Link className="underline hover:text-[var(--text)]" href="/llms.txt">llms.txt</Link></li>
      </ul>
    </section>
  );
}
