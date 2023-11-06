"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/detailInfo.module.scss";
import InfoBox from "@/components/InfoBox";
import ProfileCard from "../components/ProfileCard";
import NewPress from "@/components/NewPress";
import { FaHistory } from "react-icons/fa";
import ArticleDisplay from "@/components/ArticleDisplay";

const items = Array.from({ length: 100 }, (_, index) => ({
  title: `Item ${index + 1}`,
}));

const recentArticles = [
  {
    title: "探秘ElegantPaper的美学设计",
    date: "2023-02-07",
    imageUrl: "https://picsum.photos/200/300?random=1", // 使用 Picsum.photos 生成随机图片
  },
  {
    title: "现代Web开发趋势分析",
    date: "2022-11-27",
    imageUrl: "https://picsum.photos/200/300?random=2",
  },
  {
    title: "使用React构建高性能应用",
    date: "2022-11-27",
    imageUrl: "https://picsum.photos/200/300?random=3",
  },
  {
    title: "使用React构建高性能应用",
    date: "2022-11-27",
    imageUrl: "https://picsum.photos/200/300?random=3",
  },
];

const DetailInfo = ({ data = items }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prevVisibleItems) => [
            ...prevVisibleItems,
            entry.target.getAttribute("data-id"),
          ]);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback);

    itemRefs.current.forEach((ref) => {
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className={styles["detail-container"]}>
      <div className={styles["info-section"]}>
        <h2>Detail Info</h2>
        <div className={styles["info-block"]}>Some personal information...</div>
      </div>
      {/* 
      <ProfileCard
        avatarUrl={""}
        name={"冯文轩"}
        description={"开发工程师"}
        articlesCount={0}
        tagsCount={0}
        categoriesCount={0}
        qqLink={""}
        emailLink={""}
        githubLink={""}
      />

      <NewPress
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FaHistory className={styles} color="#4c4948" />
            <span
              style={{
                marginLeft: 5,
              }}
            >
              最新文章
            </span>
          </div>
        }
        articles={recentArticles}
      /> */}

      <ArticleDisplay
        imageUrl="https://picsum.photos/400/300"
        title="探秘ElegantPaper的美学设计"
        date="2022-11-27"
        content="精美的排版设计和卓越的阅读体验。..."
        position="left" // 或 "right"
      />

      <div className={styles["line"]}></div>

      <div className={styles["list-section"]}>
        <ul>
          {data?.map((item, index) => (
            <li
              key={index}
              data-id={index}
              ref={(el) => (itemRefs.current[index] = el)}
              // className={`${styles["list-item"]} ${
              //   visibleItems.includes(index.toString()) ? styles["visible"] : ""
              // }`}
              className={styles["list-item"]}
            >
              {item?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailInfo;
