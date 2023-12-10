import { useMemo } from "react";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css";

const useContentParse = (content: string) => {
  const parseContent = useMemo(() => {
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
    }).use(anchor, {
      level: [1, 2, 3, 4, 5, 6], // 从哪个级别的标题开始插入锚点（例如 1 就是从 <h1> 开始）
      permalink: anchor.permalink.linkInsideHeader({
        symbol: "¶",
        renderAttrs: (slug) => ({ "data-slug": slug }),
        space: true,
      }),
      permalinkBefore: true, // 链接是否出现在标题文本之前
      slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, "-"),
    });

    return markdownContent.render(content);
  }, [content]);

  return parseContent;
};

export default useContentParse;
