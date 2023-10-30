import { get } from "@/utils/post.method";

export class Api {
  static async fetchImage<U, T>(params?: T): Promise<U> {
    return await get<U>("/api/bg", params);
  }
}
