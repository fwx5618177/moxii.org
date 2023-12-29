declare module "Dashboard" {
  import { ReactNode } from "react";
  import { ArticleListResponse } from "Response";

  interface QueryLocalPostListResponse {
    data: ArticleListResponse;
  }

  interface EditableTagGroupProps {
    value: string[];
    onChange: (newTags: string[]) => void;
  }

  // 定义Tag类型
  type TagType = string;

  interface UseTagsProps {
    tags: TagType[];
    setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
    color?: string;
  }
}
