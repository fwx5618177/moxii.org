"use client";

import DetailInfo from "./DetailInfo";
import styles from "@/styles/postView.module.scss";

const PostView = ({ children, defaultData }) => {
  return (
    <>
      <main className={styles["post-view"]}>
        <DetailInfo {...defaultData} isHomeList={false}>
          {children}
        </DetailInfo>
      </main>
    </>
  );
};

export default PostView;
