declare module "BgImage" {
  import { ReactNode } from "react";

  export interface BackScrollProps {
    children?: ReactNode;
    header?: ReactNode;
    backgroundImage: ImageResponse;
  }

  export interface ImageResponse {
    id: string;
    link: string;
    small: string;
  }
}
