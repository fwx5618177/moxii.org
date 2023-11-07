"use client";

import React, { FC } from "react";
import NonScroll from "@/components/FullScroll/NonScroll";
import BackScroll from "@/components/FullScroll/BackScroll";
import { ImageResponse } from "Components";
import DetailInfo from "./DetailInfo";

const HomePage: FC<{
  backgroundImage: ImageResponse;
}> = ({ backgroundImage }) => {
  const isRollBack = true;

  return (
    <>
      {isRollBack ? (
        <BackScroll backgroundImage={backgroundImage}>
          <DetailInfo />
        </BackScroll>
      ) : (
        <NonScroll />
      )}
    </>
  );
};

export default HomePage;
