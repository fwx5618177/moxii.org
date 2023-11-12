declare module "Components" {
  import { ReactNode } from "react";

  type PaginationProps = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number, pageSize?: number, total?: number) => void;
  };

  interface PageSet {
    page: number;
    pageSize: number;
    total: number;
  }

  interface HomeImageProps {
    id: string;
    link: string;
    small: string;
    welcome: string;
  }

  interface BackScrollProps {
    children?: ReactNode;
    header?: ReactNode;
    imageData: HomeImageProps;
  }

  interface HomePageProps {
    imageData: HomeImageProps;
    list: ArticleDisplayProps[];
    recentArticles: Article[];
    tags: string[];
    websiteStats: WebsiteStatsProps;
    profileInfo: ProfileCardProps;
  }

  interface ArticleDisplayProps {
    key?: number;
    slug?: string;
    imageUrl: string;
    title: string;
    date: string | Date | number;
    publishedDate?: string | Date | number;
    updatedDate?: string | Date | number;
    content?: string;
    position?: "left" | "right";
    meta: MetaDataResponse;
    description: string;
  }

  type WebsiteStatsProps = {
    articleCount: number;
    totalWordCount: number;
    totalVisitors: number;
    totalVisits: number;
    lastUpdated: string | Date | number;
  };

  type TagCloudProps = {
    tags: string[];
    title: string;
  };

  interface ListSectionProps {
    defaultArticles: ArticleDisplayProps[];
  }

  interface DetailInfoProps {
    data?: ArticleDisplayProps[];
    recentArticles?: Article[];
    tags?: string[];
    websiteStats?: WebsiteStatsProps;
    profileInfo?: ProfileCardProps;
    isHomeList?: boolean;
    children?: ReactNode;
  }

  interface Article {
    title: string;
    date: string;
    imageUrl: string;
  }

  interface NewPressProps {
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
    addition?: string[];
  }

  interface RelativeArticleProps {
    title: string;
    updatedDate: string | number | Date;
    imageUrl: string;
    type: "pre" | "next" | string;
    slug: string;
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
