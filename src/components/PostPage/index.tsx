import { FC, useEffect } from "react";
import styles from "./index.module.scss";
import markdownStyle from "@/styles/markdownStyles.module.scss";
import InfoBox from "@/components/InfoBox";
import CopyRight from "@/components/copyright";
import RelativeArticle from "../RelativeArticle";
import moment from "moment";
import ClipboardJS from "clipboard";
import Recommend from "../Recommend";
import Comment from "../Comment";
import { PostPageProps } from "Components";
import useContentParse from "@/hooks/useContentParse";

const PostPage: FC<PostPageProps> = ({
  content,
  slug,
  title,
  updatedDate,
  author,
  relatives,
  type,
  addition = ["Chinese"],
}) => {
  const parsedContent = useContentParse(content);

  console.log({
    relatives,
    parsedContent,
  });

  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-button");
    clipboard.on("success", (e) => {
      console.log("Text copied: ", e.text);
      e.clearSelection();
    });

    clipboard.on("error", (e) => {
      console.log("Copy failed: ", e);
    });

    return () => {
      clipboard.destroy(); // 清理资源
    };
  }, []);

  return (
    <InfoBox width={"95%"} height={"auto"}>
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
            <div
              dangerouslySetInnerHTML={{
                __html: parsedContent,
              }}
              className={markdownStyle["markdown-body"]}
            ></div>
          </section>
        </article>

        <CopyRight
          author={author}
          articleLink={"https://github.com/fwx5618177"}
          email="fengwenxuan2006@126.com"
        />

        {relatives?.length && (
          <div className={styles["post-page-relative-article"]}>
            <RelativeArticle
              title={relatives[0]?.title}
              imageUrl={relatives[0]?.imageUrl}
              updatedDate={relatives[0]?.updatedDate}
              type={relatives[0]?.type}
              slug={relatives[0]?.slug}
            />
            <RelativeArticle
              title={relatives[1]?.title}
              imageUrl={relatives[1]?.imageUrl}
              updatedDate={relatives[1]?.updatedDate}
              type={relatives[1]?.type}
              slug={relatives[1]?.slug}
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

        <Comment />
      </div>
    </InfoBox>
  );
};

export default PostPage;
