declare module "Post" {
  import { ReactNode } from "react";
  import {
    ArticleDisplayProps,
    PostPageProps as ComponentPostPageProps,
    WebsiteStatsProps,
  } from "Components";

  interface PostPageProps {
    params: {
      slug: string;
    };
  }

  interface Author {
    name: string;
    picture?: string;
  }

  type PostMetadata = Omit<ArticleDisplayProps, "meta"> & {
    excerpt?: string;
    author: Author;
    tags?: string[];
    readCount?: number;
    commentsCount?: number;
    status: "published" | "draft" | "archived";
  };

  type PostMetaDataStore = PostMetadata & {
    meta: WebsiteStatsProps;
  };

  type Post = PostMetaDataStore & {
    id: string;
  };

  // 用于描述getAllPosts函数返回值的类型
  type Posts = Post[];

  type MatterResult = Omit<Post, "id">;

  type PostDetailProps = ComponentPostPageProps;
}
