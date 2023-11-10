declare module "Post" {
  import { ReactNode } from "react";
  import { PostPageProps as ComponentPostPageProps } from "Components";

  interface PostPageProps {
    params: {
      slug: string;
    };
  }

  interface Author {
    name: string;
    picture?: string;
  }

  interface PostMetadata {
    title: string; // The title of the post
    slug: string; // A URL-friendly string derived from the title
    excerpt?: string; // A short summary or introduction to the post
    coverImage?: string; // URL to the image used as a cover for the post
    date: string; // Publication date in ISO format
    updateDate?: string; // Last update date in ISO format, if applicable
    author: Author;
    tags?: string[]; // An array of tags associated with the post
    readCount?: number; // Number of times the post has been read
    commentsCount?: number; // Number of comments on the post
    status: "published" | "draft" | "archived"; // Publication status
    description?: string; // A detailed description or summary of the post
  }

  interface Post {
    id: string;
    content: string; // 假设内容是字符串格式，如果是HTML或Markdown，也可以是这样
    metadata: PostMetadata;
  }

  // 用于描述getAllPosts函数返回值的类型
  type Posts = Post[];

  type MatterResult = Omit<Post, "id">;

  type PostDetailProps = ComponentPostPageProps;
}
