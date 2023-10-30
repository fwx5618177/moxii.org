import React, { FC } from "react";
import NonScroll from "@/components/FullScroll/NonScroll";
import BackScroll from "@/components/FullScroll/BackScroll";
import { ImageResponse } from "BgImage";

const HomePage: FC<{
  backgroundImage: ImageResponse;
}> = ({ backgroundImage }) => {
  const isRollBack = true;

  return (
    <>
      {isRollBack ? (
        <BackScroll backgroundImage={backgroundImage}>1111</BackScroll>
      ) : (
        <NonScroll />
      )}
    </>
  );
};

export default HomePage;
