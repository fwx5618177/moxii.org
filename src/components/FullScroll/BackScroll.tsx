import React, { useState, useEffect, FC, useRef } from "react";
import { Link, Element, animateScroll } from "react-scroll";
import styles from "@/styles/home.module.scss";
import { BackScrollProps } from "Components";

const fullPageDistance = 10;

const BackScroll: FC<BackScrollProps> = ({ children, header, imageData }) => {
  const { link, small } = imageData;
  const fullPageRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef(null);
  const [showArrowUp, setShowArrowUp] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const fullPageHeight = fullPageRef?.current
      ? fullPageRef?.current?.clientHeight
      : 0;

    setShowArrowUp(position >= fullPageHeight - fullPageDistance);
  };

  const handleScrollUp = () => {
    animateScroll.scrollToTop();
  };

  const scrollToContentSection = () => {
    const contentSection = contentSectionRef?.current;
    if (contentSection && typeof contentSection.scrollIntoView === "function") {
      contentSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("The content section cannot be scrolled into view.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      console.error("window is undefined");
      return;
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles["bg-image"]}
        style={{
          backgroundImage: link ? `url(${link})` : undefined,
        }}
        ref={fullPageRef}
      >
        <Link to="content-section" smooth={true} duration={500}>
          <div className={styles.arrow} onClick={scrollToContentSection}></div>
        </Link>
      </div>
      <Element
        ref={contentSectionRef}
        name="content-section"
        className={styles["content-section"]}
      >
        <div
          className={styles["bg-image-small"]}
          style={{
            backgroundImage: small ? `url(${small})` : undefined,
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
