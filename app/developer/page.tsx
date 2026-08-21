import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tanav Poswal Developer Resources",
  description: "Developer resources and machine-readable entry points for Tanav Poswal's portfolio.",
};

export default function DeveloperResourcesPage() {
  return (
    <section className="flex flex-col gap-6 px-4 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text)]">
          Tanav Poswal Developer Resources
        </h1>
        <p className="text-[var(--text-muted)] leading-relaxed max-w-prose">
          Machine-readable entry points and development references for this portfolio.
        </p>
      </div>
      <ul className="list-disc pl-5 space-y-3 text-[var(--text-muted)]">
        <li><Link className="underline hover:text-[var(--text)]" href="/llms.txt">llms.txt</Link> — concise site guide for language models and agents.</li>
        <li><Link className="underline hover:text-[var(--text)]" href="/sitemap.xml">sitemap.xml</Link> — machine-readable inventory of public pages.</li>
        <li>Markdown negotiation — request a main portfolio page with <code>Accept: text/markdown</code>.</li>
        <li><Link className="underline hover:text-[var(--text)]" href="/projects">Projects</Link> — project-specific source and deployment links.</li>
      </ul>
      <p className="text-[var(--text-muted)] leading-relaxed max-w-prose">
        Tanav Poswal does not currently publish a public API, OpenAPI specification, authentication documentation, webhooks, or an MCP server for this portfolio.
      </p>
    </section>
  );
}
