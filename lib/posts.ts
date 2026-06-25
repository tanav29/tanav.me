import fs from "fs";
import matter from "gray-matter";

export default function getBlogMetadata(basePath) {
  const folder = basePath + "/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // get the file data
  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`${basePath}/${filename}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: new Date(matterResult.data.date),
      slug: filename.replace(".md", ""),
    };
  });
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}
