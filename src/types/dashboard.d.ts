declare module "Dashboard" {
  import { ReactNode } from "react";
  import { ArticleListResponse } from "Response";

  interface QueryLocalPostListResponse {
    data: ArticleListResponse;
  }
}
