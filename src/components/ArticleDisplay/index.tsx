import React, { FC, ReactNode } from "react";
import InfoBox from "@/components/InfoBox";
import styles from "./index.module.scss";
import Image from "next/image";

interface ArticleDisplayProps {
  imageUrl: string;
  title: string;
  date: string | ReactNode;
  content: string;
  position?: "left" | "right";
}

const ArticleDisplay: FC<ArticleDisplayProps> = ({
  imageUrl,
  title,
  date,
  content,
  position = "left",
}) => {
  const imageSection = (
    <div className={styles.imageContainer}>
      <Image
        width={377}
        height={252}
        src={imageUrl}
        alt={title}
        className={styles.image}
      />
    </div>
  );

  const contentSection = (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.date}>{date}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );

  return (
    <InfoBox width={866} height={252}>
      <div className={styles.articleDisplay + " " + styles[position]}>
        {position === "left" ? imageSection : contentSection}
        {position === "left" ? contentSection : imageSection}
      </div>
    </InfoBox>
  );
};

export default ArticleDisplay;
