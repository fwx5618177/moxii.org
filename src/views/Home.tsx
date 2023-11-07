"use client";

import React, { FC } from "react";
import NonScroll from "@/components/FullScroll/NonScroll";
import BackScroll from "@/components/FullScroll/BackScroll";
import { ImageResponse } from "Components";
import DetailInfo from "./DetailInfo";
import { HomeResponse } from "Api";

const HomePage: FC<HomeResponse> = ({
  imageData,
  list,
  recentArticles,
  tags,
  websiteStats,
}) => {
  const isRollBack = true;

  return (
    <>
      {isRollBack ? (
        <BackScroll imageData={imageData}>
          <DetailInfo
            data={list}
            recentArticles={recentArticles}
            tags={tags}
            websiteStats={websiteStats}
          />
        </BackScroll>
      ) : (
        <NonScroll />
      )}
    </>
  );
};

export default HomePage;
