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
    <section className="page-stack">
      <h1 className="page-title">
        Writing
      </h1>
      <div className="content-list">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums sm:w-24">
              {formatDate(post.date)}
            </span>
            <h2 className="section-heading min-w-0 group-hover:underline underline-offset-4">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
