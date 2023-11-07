"use client";

import React from "react";
import styles from "@/styles/detailInfo.module.scss";
import ProfileCard from "../components/ProfileCard";
import NewPress from "@/components/NewPress";
import { FaHistory } from "react-icons/fa";
import WebsiteStats from "@/components/WebsiteStats";
import TagCloud from "@/components/TagCloud";
import ListSection from "@/components/ListSection";
import { ArticleDisplayProps } from "Components";
import SubscribeButtons from "@/components/SubscribeForm";

const items = Array.from({ length: 100 }, (_, index) => ({
  title: `Item ${index + 1}`,
}));

const recentArticles = [
  {
    title: "探秘ElegantPaper的美学设计",
    date: "2023-02-07",
    imageUrl: "https://picsum.photos/200/300?random=1",
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
];

const articles = [
  {
    key: 0,
    imageUrl: "https://picsum.photos/400/300",
    title: "探秘ElegantPaper的美学设计",
    date: "2022-11-27",
    content: "精美的排版设计和卓越的阅读体验。",
    position: "left",
    meta: {
      isSticky: true,
      type: "公告",
    },
  },
  {
    key: 1,
    imageUrl: "https://picsum.photos/400/300",
    title: "探美学设计",
    date: "2022-11-27",
    content: "不断探索设计的边界。",
    position: "right",
    meta: {
      isSticky: false,
      type: "模板",
    },
  },
  {
    key: 2,
    imageUrl: "https://picsum.photos/400/300",
    title: "艺术与技术的融合",
    date: "2022-12-01",
    content: "当艺术遇上技术，创新无限。",
    position: "left",
    meta: {
      isSticky: false,
      type: "专题",
    },
  },
  {
    key: 3,
    imageUrl: "https://picsum.photos/400/300",
    title: "数字化转型的先行者",
    date: "2023-01-15",
    content: "引领企业数字化转型的关键因素。",
    position: "right",
    meta: {
      isSticky: true,
      type: "分析",
    },
  },
  {
    key: 4,
    imageUrl: "https://picsum.photos/400/300",
    title: "可持续设计的未来",
    date: "2023-02-20",
    content: "环境友好型设计将如何改变世界。",
    position: "left",
    meta: {
      isSticky: false,
      type: "观点",
    },
  },
] as ArticleDisplayProps[];

const testData = {
  title: "热门标签",
  tags: [
    "B-CJ理论",
    "C#",
    "LaTeX",
    "Logistic模型",
    "Monty Hall问题",
    "Riemann-Lebesgue引理",
    "VSCode",
    "iGEM",
    "一致有界",
    "紧性问题",
  ],
};

const DetailInfo = ({ data = items }) => {
  return (
    <div className={styles["detail-container"]}>
      <div className={styles["info-section"]}>
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
        />

        <TagCloud tags={testData.tags} title={testData.title} />

        <WebsiteStats
          articleCount={0}
          totalWordCount={0}
          totalVisitors={0}
          totalVisits={0}
          lastUpdated={"2023-11-05 20:12:02"}
        />

        <SubscribeButtons
          onRssSubscribe={undefined}
          onEmailSubscribe={undefined}
        />
      </div>

      <div className={styles["line"]}></div>

      <div className={styles["list-section"]}>
        <ListSection
          defaultArticles={Array.from({ length: 100 }).map((_, index) => ({
            ...articles[0],
            key: index,
            title: articles[0].title + index,
          }))}
        />
      </div>
    </div>
  );
};

export default DetailInfo;
