import { FC } from "react";
import styles from "./index.module.scss";
import InfoBox from "@/components/InfoBox";
import { PostPageProps } from "Components";

const PostPage: FC<PostPageProps> = ({ children }) => {
  return (
    <InfoBox
      width={"100%"}
      height={"140vh"}
      infoBoxStyle={{
        padding: "50px 40px",
      }}
    >
      {children}
    </InfoBox>
  );
};

export default PostPage;
