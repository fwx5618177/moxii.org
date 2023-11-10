import moment from "moment";
import styles from "./index.module.scss";
import { RelativeArticleProps } from "Components";
import { FC } from "react";

const RelativeArticle: FC<RelativeArticleProps> = ({
  title,
  updatedDate,
  imageUrl,
  type = "pre",
}) => {
  return (
    <div
      className={styles["relative-article-container"]}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        justifyContent: type === "pre" ? "flex-start" : "flex-end",
        textAlign: type === "pre" ? "left" : "right",
      }}
    >
      <div className={styles["relative-article-title"]}>
        <span>{type === "pre" ? "上一篇" : "下一篇"}</span>
        <h1>{title}</h1>
        <span>{moment(updatedDate).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
    </div>
  );
};

export default RelativeArticle;
