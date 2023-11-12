import { NextResponse } from "next/server";

export const useFetchData = async <U, T>(res: NextResponse<U>): Promise<T> => {
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const result = await res.json();

  return result?.data;
};
