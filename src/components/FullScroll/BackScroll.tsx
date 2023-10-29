import React, { useState, useEffect, FC, ReactNode } from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import styles from "@/styles/home.module.scss";

interface BackScrollProps {
  children?: ReactNode;
}

const BackScroll: FC<BackScrollProps> = ({ children }) => {
  const [showArrowUp, setShowArrowUp] = useState(false);

  const handleScrollUp = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > window.innerHeight) {
        setShowArrowUp(true);
      } else {
        setShowArrowUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles["full-page"]} ${styles["bg-image"]}`}>
        <Link to="content-section" smooth={true} duration={500}>
          <div className={styles.arrow}>↓</div>
        </Link>
      </div>
      <Element name="content-section" className={styles["content-section"]}>
        <div className={`${styles["top-header"]} ${styles["bg-image-small"]}`}>
          {/* This is where your small header decoration is */}
        </div>
        {children}
        {showArrowUp && (
          <div className={styles.arrowUp} onClick={handleScrollUp}>
            ↑
          </div>
        )}
      </Element>
    </div>
  );
};

export default BackScroll;
