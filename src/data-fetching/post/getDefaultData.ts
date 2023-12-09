import { cache } from "react";
import { ssgData } from "@/app/api/post/ssgData";
import { useFetchData } from "../fetchData";
import { DetailArticleDisplayResponse } from "Response";
import { ArticleDisplayProps } from "Components";

export const revalidate = 3600;

/**
 * Get Post Data
 */
export const getDefaultPostData = cache(
  async (slug: string): Promise<ArticleDisplayProps> => {
    const res = await ssgData(slug);

    const data = await useFetchData<
      DetailArticleDisplayResponse,
      ArticleDisplayProps
    >(res);

    return data;
  }
);
