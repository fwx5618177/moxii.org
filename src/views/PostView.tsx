"use client";

import DetailInfo from "./DetailInfo";
import styles from "@/styles/postView.module.scss";
import Header from "@/components/Header/header";
import PostPage from "@/components/PostPage";
import ProfileCard from "@/components/ProfileCard";
import NewPress from "@/components/NewPress";
import { FaHistory } from "react-icons/fa";
import { FC } from "react";
import { PostViewProps } from "Components";
import TagCloud from "@/components/TagCloud";
import SubscribeButtons from "@/components/SubscribeForm";
import WebsiteStats from "@/components/WebsiteStats";

const PostView: FC<PostViewProps> = ({ children, defaultData }) => {
  const { recentArticles, imageData, websiteStats, profileInfo, tags } =
    defaultData;
  const { small } = imageData;

  return (
    <>
      <main className={styles["detail-post"]}>
        <Header small={small} height={400} />

        <div className={styles["detail-container"]}>
          <div className={styles["info-section"]}>
            <ProfileCard
              avatarUrl={profileInfo?.avatarUrl}
              name={profileInfo?.name}
              description={profileInfo?.description}
              articlesCount={profileInfo?.articlesCount}
              tagsCount={profileInfo?.tagsCount}
              categoriesCount={profileInfo?.categoriesCount}
              qqLink={profileInfo?.qqLink}
              emailLink={profileInfo?.emailLink}
              githubLink={profileInfo?.githubLink}
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
          </div>
          <div className={styles["list-section"]}>
            <PostPage>{children}</PostPage>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostView;
