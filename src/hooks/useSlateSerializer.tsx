import { RULES } from "@/lib/SlateRules";
import escapeHtml from "escape-html";
import { Text, Descendant, Element as SlateElement } from "slate";
import { jsx } from "slate-hyperscript";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import slate from "remark-slate";
import { Value } from "@udecode/plate-common";
import {
  remarkDefaultElementRules,
  remarkDefaultTextRules,
  remarkPlugin,
} from "@udecode/plate-serializer-md";

export const useHtmlSerializer = () => {
  const serialize = (node: Descendant): string => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);

      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      return string;
    }

    const element = node as SlateElement;
    const children = element.children.map((n) => serialize(n)).join("");

    switch (element.type) {
      case "quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(element.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  // const deserialize = (el, markAttributes = {}) => {
  //   console.log({
  //     el,
  //     nodeType: el.nodeType,
  //     TEXT_NODE: Node.TEXT_NODE,
  //     ELEMENT_NODE: Node.ELEMENT_NODE,
  //     nodeName: el.nodeName,
  //   });

  //   if (el.nodeType === Node.TEXT_NODE) {
  //     return jsx("text", markAttributes, el.textContent);
  //   } else if (el.nodeType !== Node.ELEMENT_NODE) {
  //     return null;
  //   }

  //   const nodeAttributes = { ...markAttributes };
  //   const handler = RULES.deserialize[el?.nodeName.toLowerCase()];

  //   if (handler) {
  //     return handler(
  //       el,
  //       Array.from(el.childNodes)
  //         .map((node) => deserialize(node, nodeAttributes))
  //         .flat()
  //     );
  //   }

  //   // 默认行为或其他元素的处理
  //   return Array.from(el.childNodes)
  //     .map((node) => deserialize(node, nodeAttributes))
  //     .flat();
  // };

  // const deserializeHtml = (html: string) => {
  //   const parser = new DOMParser();
  //   const parsed = parser.parseFromString(html, "text/html");

  //   return deserialize(parsed.body);
  // };

  const convert2htmlString = (html: string) => {
    const file = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(html);

    return String(file);
  };

  const deserializeMarkdown2Slate = (html: string): Value => {
    const file = unified()
      .use(remarkParse)
      .use(remarkPlugin, {
        elementRules: {
          ...remarkDefaultElementRules,
          ...RULES.deserialize,
        },
        textRules: remarkDefaultTextRules,
        indentList: true,
        editor: null,
      })
      .processSync(html);

    const tree = file.result as Value;

    console.log({
      tree,
    });

    return tree;
  };

  return {
    serialize: serialize,
    deserializeMarkdown2Slate,
    convert2htmlString,
  };
};
