import { useCallback } from "react";
import { parse } from "marked";
import Highlighter from "react-highlight-words";
import parseHTML, { DOMNode } from "html-react-parser";
import lodash from "lodash";
import styles from "./highlighter.module.scss";
import CodeRender from "@/components/CodeRender";

const useContentParse = (content: string) => {
  const callBackNode = useCallback((node: DOMNode): any => {
    const { name, attribs, children } = node as any;

    if (name === "code") {
      console.log({
        node,
      });
      try {
        if (lodash.isEqual({}, attribs)) {
          if (!(node as any)?.data) {
            const data: string = (node as any)?.children?.[0]?.data;

            return (
              <Highlighter
                highlightClassName={styles.highlight}
                searchWords={[data]}
                autoEscape={true}
                textToHighlight={data}
              />
            );
          }
        }

        const { class: className } = attribs;

        const language = className?.split("-")[1];
        const code = children?.[0]?.data;

        return <CodeRender {...{ code, language }} />;
      } catch (err) {
        console.error(err);

        return children;
      }
    }

    return node;
  }, []);

  const parseContent = useCallback(async () => {
    if (!content) {
      return null;
    }

    const markdownContent = await parse(content);
    const htmlContent = parseHTML(markdownContent satisfies string, {
      replace: callBackNode,
    });

    return htmlContent;
  }, [content, callBackNode]);

  return parseContent();
};

export default useContentParse;
