import { NextRequest, NextResponse } from "next/server";

// 示例的背景图像数据
const imageData = {
  id: "1",
  // link: "https://via.placeholder.com/1920x1080", // 你的背景图像链接
  link: "https://picsum.photos/2560/1600",
  small: "https://picsum.photos/2560/150",
};

export async function GET(_request?: NextRequest) {
  try {
    // 模拟异步获取背景图像数据
    // 你可以在这里实际获取数据
    // 例如，使用数据库查询或从外部API获取数据
    // 然后将数据发送回客户端

    return new NextResponse(
      JSON.stringify({
        status: "success",
        code: "200",
        data: imageData,
      })
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "999",
        data: imageData,
      })
    );
  }
}
