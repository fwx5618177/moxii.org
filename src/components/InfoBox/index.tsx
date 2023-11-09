import React from "react";
import styles from "./index.module.scss"; // 引入 CSS Module

interface InfoBoxProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  scrollable?: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  width = 290,
  height = 300,
  scrollable = false,
  children,
}) => {
  return (
    <div
      className={styles.infoBox}
      style={{ width, height, overflow: scrollable ? "auto" : "hidden" }}
    >
      {children}
    </div>
  );
};

export default InfoBox;
