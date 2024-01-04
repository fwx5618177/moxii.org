import { localDataList } from "@/controllers/post/cache";
import { NextResponse } from "next/server";
import { PostStatusEnum } from "@/types/common";
import { DashBoardDetailModifyProps } from "Response";
import LocalMarkdownService from "@/controllers/dashboard/LocalMarkdownService";
import path from "path";

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

    // TODO: 调用远端的接口，然后上传当前的数据给远端的接口
    // if (data.status !== PostStatusEnum.UPLOAD) {
    //   return NextResponse.json(
    //     {
    //       status: "success",
    //       code: "200",
    //       data: null,
    //       message: "修改成功",
    //     },
    //     {
    //       status: 200,
    //     }
    //   );
    // }

    // 解析、修改本地文件
    const baseDirectory = path.join(process.cwd(), "posts");
    // 使用 LocalMarkdownService 更新Markdown文件
    const localMarkdownService =
      LocalMarkdownService.getInstance(baseDirectory);
    const result = await localMarkdownService.updateMarkdown(data);

    return NextResponse.json(
      {
        status: "success",
        code: "200",
        data: result,
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
