import type { MetadataRoute } from "next";
import getBlogMetadata from "@/lib/posts";

const baseUrl = "https://tanav.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/projects", "/experience", "/blog", "/developer"];
  const posts = getBlogMetadata("blogs");
  return [
    ...staticPages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })),
    ...posts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: post.date })),
  ];
}
