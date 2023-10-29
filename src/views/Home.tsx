import React from "react";
import NonScroll from "@/components/FullScroll/NonScroll";
import BackScroll from "@/components/FullScroll/BackScroll";

const HomePage = () => {
  const isRollBack = true;

  return <>{isRollBack ? <BackScroll>1111</BackScroll> : <NonScroll />}</>;
};

export default HomePage;
