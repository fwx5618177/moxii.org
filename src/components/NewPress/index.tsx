import React, { ReactNode } from "react";
import InfoBox from "@/components/InfoBox";
import styles from "./index.module.scss";
import Image from "next/image";

// 文章类型定义
interface Article {
  title: string;
  date: string;
  imageUrl: string;
}

// 组件的 Props 类型
interface NewPressProps {
  title: string | ReactNode;
  articles: Article[];
}

// 文章列表组件
const NewPress: React.FC<NewPressProps> = ({ title, articles }) => {
  return (
    <InfoBox scrollable>
      <div className={styles.articleList}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.articles}>
          {articles?.map((article, index) => (
            <div key={index} className={styles.articleItem}>
              <div className={styles.imageContainer}>
                <Image
                  width={60}
                  height={60}
                  src={article.imageUrl}
                  alt={article.title}
                  className={styles.articleImage}
                />
              </div>
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <time className={styles.articleDate}>{article.date}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfoBox>
  );
};

export default NewPress;
