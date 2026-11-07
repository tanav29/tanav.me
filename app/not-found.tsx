import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-stack">
      <div className="flex flex-col gap-2">
        <h1 className="page-title">Page not found</h1>
        <p className="text-sm leading-6 text-muted-foreground">This page does not exist. Try one of these useful starting points:</p>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-sm leading-6 text-muted-foreground">
        <li><Link className="inline-link" href="/">Home</Link></li>
        <li><Link className="inline-link" href="/projects">Projects</Link></li>
        <li><Link className="inline-link" href="/blog">Writing</Link></li>
        <li><Link className="inline-link" href="/sitemap.xml">Sitemap</Link> or <Link className="inline-link" href="/llms.txt">llms.txt</Link></li>
      </ul>
    </section>
  );
}
