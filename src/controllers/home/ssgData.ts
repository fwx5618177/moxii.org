import { NextResponse } from "next/server";
import {
  imageData,
  recentArticles,
  tags,
  websiteStats,
  profileInfo,
} from "@/mocks/ssg";
import { localDataList } from "@/controllers/post/cache";
import { HomeResponse } from "Response";

export async function ssgData(): Promise<NextResponse<HomeResponse>> {
  try {
    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: {
          imageData,
          list: localDataList,
          recentArticles,
          tags,
          websiteStats,
          profileInfo,
        },
      })
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "999",
        data: {
          imageData,
          list: [],
          recentArticles,
          tags,
          websiteStats,
          profileInfo,
        },
      })
    );
  }
}
