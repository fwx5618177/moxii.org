import { PostActions } from "@/actions/post/PostActions";
import { articles } from "@/mocks/ssg";
import { NextResponse } from "next/server";

export const ssgData = async (slug: string | number) => {
  try {
    // const list = PostActions.getAllPostsData();
    const findData = articles.find((item) => item?.slug === String(slug));

    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: findData,
      })
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "999",
        data: null,
      })
    );
  }
};
