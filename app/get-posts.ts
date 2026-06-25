import getBlogMetadata from "../lib/posts";

export async function getPosts() {
  const posts = getBlogMetadata("posts");
  return posts.map((post) => ({
    id: post.slug,
    title: post.title,
    date: post.date.toISOString(),
    viewsFormatted: "", // Placeholder, as views are not available
  }));
}
