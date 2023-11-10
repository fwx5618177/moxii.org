import { FC } from "react";
import styles from "./index.module.scss";
import InfoBox from "@/components/InfoBox";
import { PostPageProps } from "Components";
import CopyRight from "@/components/copyright";
import RelativeArticle from "../RelativeArticle";

const PostPage: FC<PostPageProps> = ({
  content,
  slug,
  title,
  updatedDate,
  author,
  relativeArticles,
  type,
}) => {
  return (
    <InfoBox
      width={"100%"}
      height={"140vh"}
      infoBoxStyle={{
        padding: "50px 40px",
      }}
    >
      <div className={styles["post-page-container"]}>
        <article className={styles["post-page-article"]}>
          {type}-{slug}
        </article>

        <CopyRight
          author={author}
          articleLink={"https://github.com/fwx5618177"}
          email="fengwenxuan2006@126.com"
        />

        {relativeArticles?.length && (
          <div className={styles["post-page-relative-article"]}>
            <RelativeArticle
              title={relativeArticles[0]?.title}
              imageUrl={relativeArticles[0]?.imageUrl}
              updatedDate={relativeArticles[0]?.updatedDate}
              type={relativeArticles[0]?.type}
            />
            <RelativeArticle
              title={relativeArticles[1]?.title}
              imageUrl={relativeArticles[1]?.imageUrl}
              updatedDate={relativeArticles[1]?.updatedDate}
              type={relativeArticles[1]?.type}
            />
          </div>
        )}
      </div>
    </InfoBox>
  );
};

export default PostPage;
