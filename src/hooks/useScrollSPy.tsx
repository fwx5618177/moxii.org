import { TocTypes } from "Components";
import { useState, useEffect } from "react";

const useScrollSpy = (titles: TocTypes[]) => {
  const [currentTitle, setCurrentTitle] = useState<string>("");

  useEffect(() => {
    const bodyElement = document.body;

    const handleScroll = () => {
      let newCurrentTitle = null;
      // 遍历所有标题
      for (let title of titles) {
        const element = document.getElementById(title.text);

        if (element && bodyElement.scrollTop >= element.offsetTop - 100) {
          newCurrentTitle = title.key;
        } else {
          break;
        }
      }
      if (newCurrentTitle !== currentTitle) {
        setCurrentTitle(newCurrentTitle);
      }
    };

    bodyElement.addEventListener("scroll", handleScroll);
    return () => bodyElement.removeEventListener("scroll", handleScroll);
  }, [titles, currentTitle]);

  return currentTitle;
};

export default useScrollSpy;
