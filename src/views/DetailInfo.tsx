"use client";

import React, { FC } from "react";
import styles from "@/styles/detailInfo.module.scss";
import ProfileCard from "../components/ProfileCard";
import NewPress from "@/components/NewPress";
import { FaHistory } from "react-icons/fa";
import WebsiteStats from "@/components/WebsiteStats";
import TagCloud from "@/components/TagCloud";
import ListSection from "@/components/ListSection";
import { DetailInfoProps } from "Components";
import SubscribeButtons from "@/components/SubscribeForm";

const DetailInfo: FC<DetailInfoProps> = ({
  data,
  recentArticles,
  tags,
  websiteStats,
}) => {
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

        <TagCloud tags={tags} title={"热门标签"} />

        <WebsiteStats
          articleCount={websiteStats?.articleCount}
          totalWordCount={websiteStats?.totalVisitors}
          totalVisitors={websiteStats?.totalVisitors}
          totalVisits={websiteStats?.totalVisits}
          lastUpdated={websiteStats?.lastUpdated}
        />

        <SubscribeButtons />
      </div>

      <div className={styles["line"]}></div>

      <div className={styles["list-section"]}>
        <ListSection defaultArticles={data} />
      </div>
    </div>
  );
};

export default DetailInfo;
