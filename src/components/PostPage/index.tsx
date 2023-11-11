import { FC } from "react";
import styles from "./index.module.scss";
import InfoBox from "@/components/InfoBox";
import { PostPageProps } from "Components";
import CopyRight from "@/components/copyright";
import RelativeArticle from "../RelativeArticle";
import moment from "moment";
import Recommend from "../Recommend";

const PostPage: FC<PostPageProps> = ({
  content,
  slug,
  title,
  updatedDate,
  author,
  relativeArticles,
  type,
  addition = ["Chinese"],
}) => {
  console.log({
    relativeArticles,
  });

  return (
    <InfoBox
      width={"100%"}
      height={"auto"}
      infoBoxStyle={{
        padding: "50px 40px",
      }}
    >
      <div className={styles["post-page-container"]}>
        <article className={styles["post-page-article"]}>
          <header className={styles["post-page-article-header"]}>
            <h1>{title}</h1>
            {slug && <span>{slug}</span>}
            {type && <span>{type}</span>}
            {addition?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}

            {updatedDate && (
              <p className={styles["post-page-article-header-time"]}>
                {moment(updatedDate).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            )}
          </header>
          <section className={styles["post-page-article-body"]}>
            {content?.repeat(100)}
          </section>
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
              slug={relativeArticles[0]?.slug}
            />
            <RelativeArticle
              title={relativeArticles[1]?.title}
              imageUrl={relativeArticles[1]?.imageUrl}
              updatedDate={relativeArticles[1]?.updatedDate}
              type={relativeArticles[1]?.type}
              slug={relativeArticles[1]?.slug}
            />
          </div>
        )}

        <Recommend
          data={[
            {
              updatedDate: Date.now(),
              title: "这是一篇文章, 这是一篇文章",
              imageUrl: "https://picsum.photos/256/200",
              language: "Chinese",
            },
            {
              updatedDate: Date.now(),
              title: "这是一篇文章, 这是一篇文章",
              imageUrl: "https://picsum.photos/256/200",
              language: "English",
            },
            {
              updatedDate: Date.now(),
              title: "这是一篇文章, 这是一篇文章",
              imageUrl: "https://picsum.photos/256/200",
              language: "English",
            },
          ]}
        />
      </div>
    </InfoBox>
  );
};

export default PostPage;
