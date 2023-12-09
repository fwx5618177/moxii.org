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

  interface MetaDataProps {
    isSticky: boolean;
    type: string;
    date: string | Date | number;
    readCount: string | number;
    wordCount: string | number;
    readTimeCost: string | number;
  }

  type WebsiteStatsProps = {
    articleCount: number;
    totalWordCount: number;
    totalVisitors: number;
    totalVisits: number;
    lastUpdated: string | Date | number;
  };

  interface Author {
    url?: string | URL;
    name?: string;
  }

  interface RelativeArticleProps {
    title: string;
    updatedDate: string | number | Date;
    imageUrl: string;
    type: "pre" | "next" | string;
    slug: string;
  }

  type RelativeArticleListProps = RelativeArticleProps[];

  interface ArticleDisplayProps {
    id: string | number;
    slug: string;
    imageUrl: string;
    title: string;
    createdDate: string | Date | number;
    publishedDate: string | Date | number;
    updatedDate: string | Date | number;
    content: string;
    position: "left" | "right";
    meta: MetaDataProps;
    description: string;
    excerpt: string;
    author: Author | Array<Author>;
    tags: string[];
    readCount: number;
    commentsCount: number;
    status: "published" | "draft" | "archived";
    type: string;
    addition: string[];
    websiteStats: WebsiteStatsProps;
    relatives?: RelativeArticleListProps;
  }

  interface PostPageParmaProps {
    params: {
      slug: string;
    };
  }

  interface PostViewProps {
    children?: ReactNode;
    defaultData: HomePageProps;
    postData?: ArticleDisplayProps;
  }

  interface PostPageProps {
    content: string;
    slug: string;
    title: string;
    updatedDate: string | Date | number;
    author: Author | Array<Author>;
    type: string;
    addition?: string[];
    relatives: RelativeArticleListProps;
  }

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
