import { Post, PostMetadata } from "Post";
import matter from "gray-matter";
import { generateSlug } from "./generateSlug";

export const parsePost = (slug: string, markdownContent: string): Post => {
  const { data, content } = matter(markdownContent);

  const metadata: PostMetadata = {
    title: data.title || "No Title",
    slug: data.slug || slug || generateSlug(data.title),
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "default-cover.jpg",
    date: data.date || new Date().toISOString(),
    updateDate: data.updateDate || "",
    author: data.author || { name: "Unknown Author" },
    tags: data.tags || [],
    readCount: data.readCount || 0,
    commentsCount: data.commentsCount || 0,
    status: data.status || "draft",
    description: data.description || "",
  };

  return { id: slug, content, metadata };
};
