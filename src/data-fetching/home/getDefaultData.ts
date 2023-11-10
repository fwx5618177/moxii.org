import { ssgData } from "@/app/api/home/ssgData";
import { cache } from "react";
import { HomeResponse } from "Api";
import { useFetchData } from "../fetchData";

export const revalidate = 3600;

/**
 * Get Home Data
 */
export const getDefaultHomeData = cache(async () => {
  const res = await ssgData();
  const data = await useFetchData<HomeResponse>(res);

  return data;
});
