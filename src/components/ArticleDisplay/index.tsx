import React, { FC } from "react";
import InfoBox from "@/components/InfoBox";
import styles from "./index.module.scss";
import Image from "next/image";
import MetaData from "./MetaData";
import { ArticleDisplayProps } from "Components";

const ArticleDisplay: FC<ArticleDisplayProps> = ({
  imageUrl,
  title,
  content,
  position = "left",
  meta,
  date,
}) => {
  return (
    <InfoBox width={866} height={252}>
      <div className={`${styles.articleDisplay} ${styles[position]}`}>
        <div className={styles.imageContainer}>
          <Image
            width={377}
            height={252}
            src={imageUrl}
            alt={title}
            layout="responsive"
          />
        </div>
        <div className={styles.contentContainer}>
          <h2 className={styles.title}>{title}</h2>
          <MetaData date={date} {...meta} />
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </InfoBox>
  );
};

export default React.memo(ArticleDisplay);
