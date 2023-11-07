import React from "react";
import styles from "./RSSButton.module.scss"; // 假设你使用了scss模块

const RSSButton: React.FC = () => {
  return (
    <a
      href="/api/rss"
      className={styles.rssButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      订阅RSS
    </a>
  );
};

export default RSSButton;
