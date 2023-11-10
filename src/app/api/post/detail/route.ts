import { articles } from "@/mocks/ssg";
import { PostDetailResponse } from "Api";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { slug } = await request.json();
    const findItem = articles.find((item) => item?.slug === String(slug));

    const pre = {
      title: articles[0]?.title,
      updatedDate: articles[0]?.updatedDate,
      imageUrl: articles[0]?.imageUrl || "https://picsum.photos/950/150",
      type: "pre",
    };
    const next = {
      title: articles[1]?.title,
      updatedDate: articles[1]?.updatedDate,
      imageUrl: articles[1]?.imageUrl || "https://picsum.photos/950/150",
      type: "next",
    };

    const result: PostDetailResponse = {
      content: findItem?.content || "test",
      title: findItem?.title || "test",
      updatedDate: findItem?.updatedDate || Date.now(),
      author: "moxi",
      type: findItem?.meta?.type || "公告",
      slug: findItem?.slug,
      relativeArticles: [pre, next],
    };

    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: result,
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
