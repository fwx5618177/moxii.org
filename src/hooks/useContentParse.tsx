import { useCallback } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css";

const useContentParse = (content: string) => {
  const parseContent = useCallback(() => {
    if (!content) {
      return null;
    }

    const markdownContent = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
      xhtmlOut: true,
      langPrefix: "language-",
      quotes: "“”‘’",
      highlight: (content, lang) => {
        let codeChunk: string;
        const str = content.trim();
        const template = (
          str: string,
          highlighted: string,
          lang: string
        ) => `${highlighted}
        <button class="copy-button" data-clipboard-text="${str}">
          <p>${lang}</p>
        </button>`;

        if (lang && hljs.getLanguage(lang)) {
          codeChunk = hljs.highlight(str, {
            language: lang,
          }).value;
        } else {
          codeChunk = hljs.highlightAuto(str).value;
        }

        return template(str, codeChunk, lang);
      },
    });

    return markdownContent.render(content);
  }, [content]);

  return parseContent();
};

export default useContentParse;
