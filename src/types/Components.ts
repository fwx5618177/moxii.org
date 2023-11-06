declare module "Components" {
  import { ReactNode } from "react";

  export interface BackScrollProps {
    children?: ReactNode;
    header?: ReactNode;
    backgroundImage: ImageResponse;
  }

  export interface ImageResponse {
    id: string;
    link: string;
    small: string;
  }

  // 定义组件props的接口
  interface MetaDataProps {
    isSticky?: boolean; // 可选属性，默认为false
    date?: string | Date | number;
    type: string;
    count?: number;
  }

  interface ArticleDisplayProps {
    key?: number;
    imageUrl: string;
    title: string;
    date: string | Date | number;
    content: string;
    position?: "left" | "right";
    meta: MetaDataProps;
  }

  type WebsiteStatsProps = {
    articleCount: number;
    totalWordCount: number;
    totalVisitors: number;
    totalVisits: number;
    lastUpdated: string | Date | number;
  };

  export type TagCloudProps = {
    tags: string[];
    title: string;
  };

  export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number, pageSize?: number, total?: number) => void;
  };

  export interface PageSet {
    page: number;
    pageSize: number;
    total: number;
  }

  export interface ListSectionProps {
    defaultArticles: ArticleDisplayProps[];
  }
}
