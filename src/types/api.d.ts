declare module "Api" {
  import { ReactNode } from "react";
  import { AxiosRequestConfig, AxiosResponse } from "axios";
  import {
    ImageResponse,
    ArticleDisplayProps,
    Article,
    WebsiteStatsProps,
    PostPageProps,
  } from "Components";
  import { Posts } from "Post";

  export type HomeResponse = {
    imageData: ImageResponse;
    list: Posts;
    recentArticles: Article[];
    tags: string[];
    websiteStats: WebsiteStatsProps;
    profileInfo: ProfileCardProps;
  };

  type PostResponse = Post;

  type PostDetailResponse = PostPageProps;

  interface RequestConfig extends AxiosRequestConfig {
    data?: {
      code: CODE_CONFIG;
      message?: string;
      data: any;
    };
  }
}
