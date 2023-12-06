import { post } from "@/utils/post.method";

export class PostServiceApi {
  static async getDetailPost<U, T>(params?: T): Promise<U> {
    return await post<U>("/api/post/detail", params);
  }

  static async pushLocalPost<U, T>(params?: T): Promise<U> {
    return await post<U>("/api/post/pushLocalPost", params);
  }
}
