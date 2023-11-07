import { GET } from "@/app/api/home/route";
import { NextRequest } from "next/server";
import { cache } from "react";

export const revalidate = 3600;

const imageData = {
  id: "1",
  // link: "https://via.placeholder.com/1920x1080", // 你的背景图像链接
  link: "https://picsum.photos/2560/1600",
  small: "https://picsum.photos/2560/150",
};

export const getList = cache(async () => {
  return await GET();
});
