import { createHash } from "crypto";
import matter from "gray-matter";
import path from "path";
import fs from "fs";
import { ArticleListResponse, DetailArticleDisplayResponse } from "Response";

export class PostActions {
  static postsDirectory = path.join(process.cwd(), "posts");

  /**
   * Generate a slug from a title by hashing it, or directly use a provided slug
   * @param {string} title - The title from which to generate a slug
   * @param {string | undefined} slug - An optional slug to use directly
   * @returns {string} - A URL-friendly slug
   */
  static generateSlug(title: string, slug?: string): string {
    // 如果slug参数已经定义，直接使用它
    if (slug) {
      return slug.toLowerCase().replace(/\s+/g, "-");
    }

    // 如果没有提供slug，根据title生成一个哈希值
    // 创建一个 SHA-256 哈希
    const hash = createHash("sha256").update(title).digest("hex");
    // 返回前8个字符作为slug
    return hash.substring(0, 16);
  }

  /**
   * Parse markdown content of a post and extract metadata and content
   * @param fileName FileName
   * @param markdownContent The markdown content of the post
   * @returns The Post object
   */
  static parsePost(
    fileName: string,
    markdownContent: string
  ): DetailArticleDisplayResponse {
    const { data, content } = matter(markdownContent);

    // 使用title生成一个特殊的id值
    const id = createHash("sha256")
      .update(data.title || "")
      .digest("hex")
      .substring(0, 16);

    const metadata: DetailArticleDisplayResponse = {
      id: "",
      key: 0,
      type: "article",
      slug: data.slug || PostActions.generateSlug(data.title || ""),
      imageUrl: data.imageUrl || "https://picsum.photos/400/300",
      title: data.title || fileName || "Untitled",
      createdDate: data.date || new Date().toISOString(),
      publishedDate: data.publishedDate || "",
      updatedDate: data.updatedDate || "",
      content: content || "",
      position: data.position || "left",
      excerpt: data.excerpt || "",
      author: data.author || { name: "Unknown Author", url: "" },
      tags: data.tags || [],
      readCount: data.readCount || 0,
      commentsCount: data.commentsCount || 0,
      status: data.status || "draft",
      description: data.description || "",
      websiteStats: {
        articleCount: 0,
        totalWordCount: 0,
        totalVisitors: 0,
        totalVisits: 0,
        lastUpdated: new Date().toISOString(),
      },
      meta: {
        isSticky: false,
        type: "article",
        date: new Date().toISOString(),
        readCount: 0,
        wordCount: 0,
        readTimeCost: 0,
      },
      addition: [],
    };

    return { id: id, ...metadata };
  }

  static getAllPostsData(): ArticleListResponse {
    const filenames = fs.readdirSync(PostActions.postsDirectory);
    const allPostsData: ArticleListResponse = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const slug = filename.replace(/\.md$/, "");
        const fullPath = path.join(PostActions.postsDirectory, filename);
        try {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          return PostActions.parsePost(slug, fileContents);
        } catch (error) {
          console.error(`Error reading file ${filename}:`, error);
          return null;
        }
      })
      .filter((post): post is DetailArticleDisplayResponse => post !== null)
      .sort((a, b) => {
        if (a.createdDate < b.createdDate) {
          return 1;
        } else if (a.createdDate > b.createdDate) {
          return -1;
        } else {
          return 0;
        }
      });

    return allPostsData;
  }

  /**
   * Get a list of markdown file slugs from the posts directory
   * @returns {fileName[]} An array of fileName derived from the file names
   */
  static getListOfSlugs(): string[] {
    const filenames = fs.readdirSync(PostActions.postsDirectory);
    const fileName = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => filename.replace(/\.md$/, ""));
    return fileName;
  }
}
