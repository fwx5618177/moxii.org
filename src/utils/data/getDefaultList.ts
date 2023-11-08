import { GET } from "@/app/api/home/route";
import { cache } from "react";

export const revalidate = 3600;

export const getDefaultList = cache(async () => {
  return await GET();
});
