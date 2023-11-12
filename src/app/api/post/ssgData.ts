import { localDataList } from "@/actions/post/cache";
import { NextResponse } from "next/server";

export const ssgData = async (slug: string | number) => {
  try {
    const findData = localDataList.find((item) => item?.slug === String(slug));

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
