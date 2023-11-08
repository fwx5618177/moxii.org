import { post } from "@/utils/post.method";

export class SubscribeEmailApi {
  static async subscribeEmail<U, T>(params?: T): Promise<U> {
    return await post<U>("/api/subscribeForm/subscribe", params);
  }
}
