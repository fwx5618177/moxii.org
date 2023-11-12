import { NextRequest, NextResponse } from "next/server";
import {
  imageData,
  articles,
  recentArticles,
  tags,
  websiteStats,
  profileInfo,
} from "@/mocks/ssg";
import { HomeResponse } from "Response";

export async function GET(
  _request: NextRequest
): Promise<NextResponse<HomeResponse>> {
  try {
    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: {
          imageData,
          list: articles,
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
          list: articles,
          recentArticles,
          tags,
          websiteStats,
          profileInfo,
        },
      })
    );
  }
}
