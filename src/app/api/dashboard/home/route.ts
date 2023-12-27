import { localDataList } from "@/actions/post/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const postList = localDataList;

    return NextResponse.json({
      status: "success",
      code: "200",
      data: postList,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: "error",
      code: "999",
      data: [],
    });
  }
};
