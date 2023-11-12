import { NextResponse } from "next/server";
import {
  imageData,
  recentArticles,
  tags,
  websiteStats,
  profileInfo,
} from "@/mocks/ssg";
import { PostActions } from "@/actions/post/PostActions";
import { HomeResponse } from "Api";

export async function ssgData(): Promise<NextResponse<HomeResponse>> {
  try {
    const list = PostActions.getAllPostsData();

    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: {
          imageData,
          list,
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
