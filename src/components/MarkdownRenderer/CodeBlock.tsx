import React, { useRef, useState } from "react";
import ClipboardJS from "clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Select } from "antd";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";
import style from "./index.module.scss";
import CopyBoard from "../CopyBoard";

const themeOptions = Object.keys(themes).map((theme) => ({
  label: theme,
  value: theme,
}));

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [currentTheme, setCurrentTheme] = useState("solarizedDarkAtom");
  const codeRef = useRef(null);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "unknown";
  const text = String(children).replace(/\n$/, "");

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTheme(event.target.value);
  };

  const handleCopy = () => {
    const clipboard = new ClipboardJS(codeRef.current, {
      text: () => text,
    });

    clipboard.on("success", () => {
      console.log("Text copied: ", text);
      clipboard.destroy();
    });

    clipboard.on("error", () => {
      console.log("Copy failed: ", text);
      clipboard.destroy();
    });
  };

  return (
    <>
      {!inline && match ? (
        <div className={style["code-block"]}>
          <CopyBoard onCopy={console.log} text={text}>
            {language}
          </CopyBoard>
          <select value={currentTheme} onChange={handleThemeChange}>
            {themeOptions.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
          <SyntaxHighlighter
            style={themes[currentTheme]}
            language={language}
            PreTag="div"
            showLineNumbers
            showInlineLineNumbers
            lineNumberStyle={{
              opacity: 0.9,
              fontSize: "0.8em",
              paddingRight: 10,
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          ref={codeRef}
          className={`${style["inline-code"]} ${className ? className : ""}`}
          onClick={handleCopy}
          {...props}
        >
          {children}
        </code>
      )}
    </>
  );
};

export default CodeBlock;
