import React from "react";
import styles from "./index.module.scss"; // 引入 CSS Module
import { InfoBoxProps } from "Components";

const InfoBox: React.FC<InfoBoxProps> = ({
  width = 290,
  height = 300,
  scrollable = false,
  children,
  infoBoxStyle,
}) => {
  return (
    <div
      className={styles.infoBox}
      style={{
        width,
        height,
        overflow: scrollable ? "auto" : "hidden",
        ...infoBoxStyle,
      }}
    >
      {children}
    </div>
  );
};

export default InfoBox;
