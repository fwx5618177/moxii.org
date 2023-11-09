import { FC } from "react";
import styles from "./index.module.scss";
import InfoBox from "@/components/InfoBox";
import { PostPageProps } from "Components";

const PostPage: FC<PostPageProps> = ({ children }) => {
  return (
    <InfoBox width={"100%"} height={"140vh"}>
      {children}
    </InfoBox>
  );
};

export default PostPage;
