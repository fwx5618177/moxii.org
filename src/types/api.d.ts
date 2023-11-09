declare module "Api" {
  import { ReactNode } from "react";
  import { AxiosRequestConfig, AxiosResponse } from "axios";
  import {
    ImageResponse,
    ArticleDisplayProps,
    Article,
    WebsiteStatsProps,
  } from "Components";

  export type HomeResponse = {
    imageData: ImageResponse;
    list: ArticleDisplayProps[];
    recentArticles: Article[];
    tags: string[];
    websiteStats: WebsiteStatsProps;
    profileInfo: ProfileCardProps;
  };

  type PostResponse = ArticleDisplayProps;

  interface RequestConfig extends AxiosRequestConfig {
    data?: {
      code: CODE_CONFIG;
      message?: string;
      data: any;
    };
  }
}
