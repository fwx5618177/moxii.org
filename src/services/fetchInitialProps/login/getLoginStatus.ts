import { cache } from "react";

export const revalidate = 3600;

export const getLoginStatus = cache(
  async (token: string, url = "http://localhost:3000/api/login") => {
    const res = await fetch(url, {
      cache: "no-cache",
      method: "GET",
      mode: "same-origin",
      next: {
        tags: ["token_tags"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);
