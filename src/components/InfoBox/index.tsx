import React from "react";
import styles from "./index.module.scss"; // 引入 CSS Module

interface InfoBoxProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  width = 300,
  height = 350,
  children,
}) => {
  return (
    <div className={styles.infoBox} style={{ width, height }}>
      {children}
    </div>
  );
};

export default InfoBox;
