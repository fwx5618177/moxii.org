declare module "Response" {
  import { AxiosRequestConfig } from "axios";
  import { CODE_CONFIG } from "@/utils/code.config";

  interface ResponseConfig<U> extends AxiosRequestConfig {
    data: {
      code: CODE_CONFIG;
      message: string;
      data: U;
    };
  }

  interface SSGHomeImageResponse {
    id: string;
    link: string;
    small: string;
    welcome: string;
  }

  interface MetaDataResponse {
    isSticky: boolean;
    type: string;
    date: string | Date | number;
    readCount: string | number;
    wordCount: string | number;
    readTimeCost: string | number;
  }

  interface DetailArticleDisplayResponse {
    id: string;
    key: number;
    slug: string;
    imageUrl: string;
    title: string;
    createdDate: string | Date | number;
    publishedDate: string | Date | number;
    updatedDate: string | Date | number;
    content: string;
    position: "left" | "right";
    meta: MetaDataResponse;
    description: string;
    excerpt: string;
    author: string;
    tags: string[];
    readCount: number;
    commentsCount: number;
    status: "published" | "draft" | "archived";
    type: string;
    addition: string[];
  }

  type ArticleListResponse = DetailArticleDisplayResponse[];

  interface RecentArticleResponse {
    title: string;
    date: string;
    imageUrl: string;
  }

  type RecentArticleListResponse = RecentArticleResponse[];

  interface TagCloudResponse {
    name: string;
    count: number;
    key: string;
  }

  type TagCloudListResponse = TagCloudResponse[];

  interface WebsiteStatsResponse {
    articleCount: number;
    totalWordCount: number;
    totalVisitors: number;
    totalVisits: number;
    lastUpdated: string | Date | number;
  }

  interface ProfileCardResponse {
    avatarUrl: string;
    name: string;
    description: string;
    articlesCount: number;
    tagsCount: number;
    categoriesCount: number;
    qqLink: string;
    emailLink: string;
    githubLink: string;
  }

  type HomeResponse = {
    imageData: SSGHomeImageResponse;
    list: ArticleListResponse;
    recentArticles: RecentArticleListResponse;
    tags: TagCloudListResponse;
    websiteStats: WebsiteStatsResponse;
    profileInfo: ProfileCardResponse;
  };
}
