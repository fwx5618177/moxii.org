import { ssgData } from "@/app/api/home/ssgData";
import { cache } from "react";
import { useFetchData } from "../fetchData";
import { HomeResponse } from "Response";
import { NextResponse } from "next/server";
import { HomePageProps } from "Components";

export const revalidate = 3600;

/**
 * Get Home Data
 */
export const getDefaultHomeData = cache(async () => {
  const res: NextResponse<HomeResponse> = await ssgData();
  const data = await useFetchData<HomeResponse, HomePageProps>(res);

  return data;
});
