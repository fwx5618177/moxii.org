import { articles } from "@/mocks/ssg";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: articles,
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

export const ssgData = async (slug: string) => {
  try {
    const findData = articles.find((item) => item?.slug === slug);

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
