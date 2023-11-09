import { NextResponse } from "next/server";

export const useFetchData = async <T>(res: NextResponse<any>): Promise<T> => {
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const result = await res.json();

  return result?.data;
};
