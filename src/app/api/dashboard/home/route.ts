import { localDataList } from "@/actions/post/cache";
import { NextResponse } from "next/server";
import { PostStatusEnum } from "@/types/common";
import { DashBoardDetailModifyProps } from "Response";

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

export async function PUT(request: Request) {
  try {
    const data: DashBoardDetailModifyProps = await request.json();

    if (data.status !== PostStatusEnum.UPLOAD) {
      // TODO: call remote api
      return NextResponse.json(
        {
          status: "success",
          code: "200",
          data: null,
          message: "修改成功",
        },
        {
          status: 200,
        }
      );
    }

    // 修改本地文件

    return NextResponse.json(
      {
        status: "success",
        code: "200",
        data: null,
        message: "修改成功",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: "error",
        code: "999",
        data: null,
        message: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
