import React, { useState, useEffect, FC, ReactNode, useRef } from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import styles from "@/styles/home.module.scss";

interface BackScrollProps {
  children?: ReactNode;
  header?: ReactNode;
}

const fullPageDistance = 10;

const BackScroll: FC<BackScrollProps> = ({ children, header }) => {
  const fullPageRef = useRef<HTMLDivElement>(null);
  const [showArrowUp, setShowArrowUp] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://via.placeholder.com/1920x1080"
  );

  const handleScrollUp = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const fullPageHeight = fullPageRef.current!.clientHeight;

      if (position >= fullPageHeight - fullPageDistance) {
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
      <div
        ref={fullPageRef}
        className={styles["bg-image"]}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
        }}
      >
        <Link to="content-section" smooth={true} duration={500}>
          <div className={styles.arrow}>↓</div>
        </Link>
      </div>
      <Element name="content-section" className={styles["content-section"]}>
        <div
          className={styles["bg-image-small"]}
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
          }}
        >
          {header}
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
