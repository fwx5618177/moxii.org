declare module "Api" {
  import { ReactNode } from "react";
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
  };
}
