import getBlogMetadata from "lib/posts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs from Tanav Poswal",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const formatDate = (date: Date) => {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export default async function Page() {
  const posts = getBlogMetadata("blogs");

  return (
    <section className="flex flex-col gap-8">
      <h1 className="page-title">
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
            <h3 className="text-sm font-medium text-[var(--text)] group-hover:opacity-70 transition-opacity w-full">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
