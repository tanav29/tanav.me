import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import getBlogMetadata from "lib/posts";
import CodeBlock from "app/components/codeblock";
import ImgBlock from "app/components/imgblock";
import { Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const headline = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: "italic",
});

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function getPostContent(slug) {
  const folder = "blogs/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const blogs = getBlogMetadata("blogs");
  return blogs.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(props) {
  const params = await props.params;
  const id = params?.slug ? params?.slug : "";
  const post = getPostContent(id);
  const title = post.data.title || id.replaceAll("_", " ");
  const description =
    post.data.description ||
    post.content.slice(0, 160).replace(/[#*`]/g, "") + "...";

  return {
    title: `${title} • Tanav Poswal`,
    description,
    openGraph: {
      title: `${title} • Tanav Poswal`,
      description,
      url: `https://tanav.me/blog/${id}`,
      siteName: "Tanav Poswal",
      images: [
        {
          url: `/blog/${id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.data.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} • Tanav Poswal`,
      description,
      images: [`/blog/${id}/opengraph-image`],
      creator: "@tanavtwt",
    },
  };
}

export default async function Page(props) {
  const slug = (await props.params).slug;
  const post = getPostContent(slug);
  const readingTime = getReadingTime(post.content);

  return (
    <section className="flex flex-col">
      <header className="flex flex-col gap-3 my-3">
        <h1
          className={cn(
            "text-4xl font-bold text-[var(--text)]",
            headline.className,
          )}
        >
          {post.data.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <span>{formatDate(post.data.date)}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
      </header>

      <article className="prose dark:prose-invert space-y-0">
        <Markdown
          options={{
            overrides: {
              code: {
                component: CodeBlock,
              },
              img: {
                component: ImgBlock,
              },
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </section>
  );
}
