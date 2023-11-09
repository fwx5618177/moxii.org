import { cache } from "react";
import { ssgData } from "@/app/api/post/route";
import { PostResponse } from "Api";
import { useFetchData } from "../fetchData";

export const revalidate = 3600;

/**
 * Get Post Data
 */
export const getDefaultPostData = cache(async (slug: string) => {
  const res = await ssgData(slug);

  const data = await useFetchData<PostResponse>(res);

  return data;
});
