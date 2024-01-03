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
      // TODO: 调用远端的接口，然后上传当前的数据给远端的接口
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

    // TODO: 解析、修改本地文件
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
