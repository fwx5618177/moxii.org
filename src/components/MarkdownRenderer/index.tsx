import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import { H1, H2, H3, H4, H5, H6 } from "./Heading";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import simplePlantUML from "@akebifiky/remark-simple-plantuml";
import codeSandBox from "remark-codesandbox-newest";
import "katex/dist/katex.min.css";
import { Pluggable } from "unified";

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: CodeBlock,
};

const remarkPlugins: Array<Pluggable> = [
  remarkGfm,
  remarkMath,
  [
    remarkToc,
    {
      heading: "TOC",
      maxDepth: 6,
      ordered: true,
      tight: false,
    },
  ],
  [simplePlantUML, { baseUrl: "https://www.plantuml.com/plantuml/svg" }],
  [
    codeSandBox,
    {
      mode: "iframe",
      runtime: "browser",
      type: "sandpack",
    },
  ],
];

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={remarkPlugins}
      rehypePlugins={[
        rehypeKatex,
        [
          rehypeRaw,
          {
            allowDangerousHtml: true,
          },
        ],
      ]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
