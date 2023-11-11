import React, { FC } from "react";
import InfoBox from "@/components/InfoBox";
import styles from "./index.module.scss";
import Image from "next/image";
import MetaData from "./MetaData";
import { ArticleDisplayProps } from "Components";
import Link from "next/link";

const ArticleDisplay: FC<ArticleDisplayProps> = ({
  imageUrl,
  title,
  description,
  position = "left",
  meta,
  date,
  slug,
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
            priority
            layout="responsive"
          />
        </div>
        <div className={styles.contentContainer}>
          <Link href={`/post/${slug}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          <MetaData date={date} {...meta} />
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </InfoBox>
  );
};

export default React.memo(ArticleDisplay);
