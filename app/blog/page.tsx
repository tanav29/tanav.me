import getBlogMetadata from "lib/posts";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs from Tanav Poswal",
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default async function Page() {
  const posts = getBlogMetadata("blogs");

  return (
    <section className="flex flex-col gap-8">
      <h1 className="sm:text-2xl text-xl font-medium tracking-tight text-[var(--text)]">
        Writing
      </h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-center"
          >
            <span className="text-xs text-[var(--text-muted)] tabular-nums w-28">
              {formatDate(post.date)}
            </span>
            <h3 className="font-medium text-[var(--text)] group-hover:opacity-70 transition-opacity w-full">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
