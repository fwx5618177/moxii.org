declare module "Components" {
  import { ReactNode } from "react";
  import { HomeResponse } from "Api";

  export interface BackScrollProps {
    children?: ReactNode;
    header?: ReactNode;
    imageData: ImageResponse;
  }

  export interface ImageResponse {
    id: string;
    link: string;
    small: string;
    welcome: string;
  }

  // 定义组件props的接口
  export interface MetaDataProps {
    isSticky?: boolean; // 可选属性，默认为false
    type: string;
    date?: string | Date | number;
    readCount?: string | number;
    wordCount?: string | number;
    readTimeCost?: string | number;
  }

  export interface ArticleDisplayProps {
    key?: number;
    slug?: string;
    imageUrl: string;
    title: string;
    date: string | Date | number;
    publishedDate?: string | Date | number;
    updatedDate?: string | Date | number;
    content: string;
    position?: "left" | "right";
    meta: MetaDataProps;
  }

  export type WebsiteStatsProps = {
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

  export interface DetailInfoProps {
    data?: ArticleDisplayProps[];
    recentArticles?: Article[];
    tags?: string[];
    websiteStats?: WebsiteStatsProps;
    profileInfo?: ProfileCardProps;
    isHomeList?: boolean;
    children?: ReactNode;
  }

  export interface Article {
    title: string;
    date: string;
    imageUrl: string;
  }

  export interface NewPressProps {
    title: string | ReactNode;
    articles: Article[];
  }

  interface ProfileCardProps {
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

  interface HeaderProps {
    small: string;
    children?: ReactNode;
    height?: number;
    isPost?: boolean;
    postData?: ArticleDisplayProps;
  }

  interface PostPageProps {
    content: string;
    title: string;
    updatedDate: string | number | Date;
    author: string;
    type: string;
    slug: string;
    relativeArticles: RelativeArticleProps[];
  }

  interface RelativeArticleProps {
    title: string;
    updatedDate: string | number | Date;
    imageUrl: string;
    type: "pre" | "next" | string;
  }

  interface PostViewProps {
    children?: ReactNode;
    defaultData: HomeResponse;
    postData?: PostResponse;
  }

  interface InfoBoxProps {
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode;
    scrollable?: boolean;
    infoBoxStyle?: React.CSSProperties;
  }

  interface HeaderTitleProps {
    title: string;
    publishedDate: string | Date | number;
    updatedDate: string | Date | number;
    readCount: string | number;
    wordCount: string | number;
    readTimeCost: string | number;
    type: string | ReactNode;
  }
}
