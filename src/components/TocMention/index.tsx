import { useToc } from "@/contexts/TocContext";
import InfoBox from "../InfoBox";
import useScrollSpy from "@/hooks/useScrollSPy";
import ProgressArticle from "../TocProgress/TocProgress";
import { useEffect, useRef } from "react";

const TocMention = () => {
  const { tocState } = useToc();
  const { toc } = tocState;
  const currentTitle = useScrollSpy(tocState.toc);
  const tocBoxRef = useRef(null);

  console.log({
    toc,
  });

  useEffect(() => {
    const activeElement = tocBoxRef.current?.querySelector(
      `li[data-key="${currentTitle}"]`
    );
    if (activeElement && tocBoxRef.current) {
      const elementPosition = activeElement.offsetTop;
      tocBoxRef.current.scrollTo({
        top: elementPosition - tocBoxRef.current.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentTitle]);

  return (
    <>
      {toc?.length > 0 && (
        <InfoBox
          height={400}
          scrollable
          infoBoxStyle={{
            position: "fixed",
            right: 20,
            top: 50,
            zIndex: 999,
          }}
          ref={tocBoxRef}
        >
          <div
            style={{
              margin: 10,
            }}
          >
            <h1>{currentTitle}</h1>
            <ProgressArticle active={currentTitle} total={tocState.toc} />
            <ul>
              {toc.map((item) => (
                <li
                  key={item.key}
                  style={{
                    marginLeft: `${item.level - 1}em`,
                    color: item.key === currentTitle ? "red" : "black",
                  }}
                  data-key={item.key}
                >
                  <a href={item?.href}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </InfoBox>
      )}
    </>
  );
};

export default TocMention;
