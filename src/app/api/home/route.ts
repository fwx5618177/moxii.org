import { NextRequest, NextResponse } from "next/server";
import {
  imageData,
  articles,
  recentArticles,
  tags,
  websiteStats,
  profileInfo,
} from "@/mocks/ssg";

export async function GET(request: NextRequest) {
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

export async function ssgData() {
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
