import { createHash, randomUUID } from "crypto";
import matter from "gray-matter";
import path from "path";
import fs from "fs";
import {
  ArticleListResponse,
  BaseLocalDataResponse,
  DetailArticleDisplayResponse,
} from "Response";

enum PostStatusEnum {
  PUBLISHED = "published",
  DRAFT = "draft",
  ARCHIVED = "archived",
  UPLOAD = "upload",
}

export class LocalPostActions {
  static postsDirectory = path.join(process.cwd(), "posts");
  static maxSubstringLength = 30;

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
    // 返回前16个字符作为slug
    return hash.substring(0, this.maxSubstringLength);
  }

  /**
   * Parse markdown content of a post and extract metadata and content
   * @param fileName FileName
   * @param markdownContent The markdown content of the post
   * @returns The Post object
   */
  static parsePost(
    markdownContent: string,
    options?: {
      fileName: string;
      fileCreationDate: string;
      updateDate: string;
    }
  ): DetailArticleDisplayResponse {
    const { data, content } = matter(markdownContent);

    // 使用title生成一个特殊的id值
    const id = createHash("sha256")
      .update(data.title || "")
      .digest("hex")
      .substring(0, this.maxSubstringLength);

    // 读取的本地文件数据
    const {
      title,
      date,
      author,
      tags,
      description,
      excerpt,
      addition,
      type,
      language,
    } = data as BaseLocalDataResponse;

    // 数据组合
    const metadata: DetailArticleDisplayResponse = {
      id: randomUUID(),
      type: type || "article",
      slug: LocalPostActions.generateSlug(data.title || ""),
      imageUrl: "https://picsum.photos/950/300",
      title: title || options?.fileName || "Untitled",
      language: language || "中文",
      createdDate:
        date || options?.fileCreationDate || new Date().toISOString(),
      publishedDate: new Date().toISOString(),
      updatedDate: options?.updateDate || new Date().toISOString(),
      content: content || "",
      excerpt: excerpt || "",
      author: {
        name: author,
        url: "",
        avatarUrl: "",
        description: "",
      },
      tags: tags || [],
      readCount: 0,
      commentsCount: 0,
      status: PostStatusEnum.UPLOAD,
      description: description || "",
      websiteStats: {
        articleCount: 0,
        totalWordCount: 0,
        totalVisitors: 0,
        totalVisits: 0,
        lastUpdated: new Date().toISOString(),
      },
      meta: {
        isSticky: false,
        type: data?.meta?.type || "article",
        date: new Date().toISOString(),
        readCount: 0,
        wordCount: 0,
        readTimeCost: 0,
      },
      addition: addition || [],
    };

    return { id: id, ...metadata };
  }

  /**
   * 递归读取目录下的所有文件。一边扫描一边处理文件
   * @param dirPath 目录路径
   * @param callback 回调函数-读取到文件后的处理
   */
  static readDirRecursively(
    dirPath: string,
    callback: (filePath: string) => void
  ): void {
    fs.readdirSync(dirPath).forEach((file) => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat && stat.isDirectory()) {
        LocalPostActions.readDirRecursively(fullPath, callback);
      } else if (fullPath.endsWith(".md")) {
        callback(fullPath);
      }
    });
  }

  /**
   * 处理目录下的文件内容
   * @param filePath 目录路径
   * @param type 文件类型
   * @returns
   */
  static processFile(filePath: string, type = ".md") {
    try {
      const fileName = path.basename(filePath, type);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const stats = fs.statSync(filePath);
      const fileCreationDate = stats.birthtime.toISOString();
      const updateDate = stats.mtime.toISOString();

      return this.parsePost(fileContents, {
        fileName,
        fileCreationDate,
        updateDate,
      });
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 获取所有文章的数据
   * @returns {ArticleListResponse} An array of Post objects
   */
  static getAllPostsData(): ArticleListResponse {
    const allPostsData: ArticleListResponse = [];

    this.readDirRecursively(this.postsDirectory, (filePath) => {
      const postData = this.processFile(filePath);

      if (postData) {
        allPostsData.push(postData);
      }
    });

    return allPostsData
      .filter((post): post is DetailArticleDisplayResponse => post !== null)
      .sort((a, b) => {
        const dateA = new Date(a.updatedDate).getTime();
        const dateB = new Date(b.updatedDate).getTime();

        return dateB - dateA;
      });
  }

  /**
   * Get a list of markdown file slugs from the posts directory
   * @returns {fileName[]} An array of fileName derived from the file names
   */
  static getListOfSlugs(): string[] {
    const filenames = fs.readdirSync(LocalPostActions.postsDirectory);
    const fileName = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => filename.replace(/\.md$/, ""));
    return fileName;
  }
}
