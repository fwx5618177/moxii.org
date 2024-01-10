import React, { FC } from "react";
import { MarkdownEditorProps } from "Dashboard";
import "@/styles/markdownStyles.module.scss";
import BasicEditor from "./components/plate/BasicEditor";

const MarkdownEditor: FC<Partial<MarkdownEditorProps>> = ({
  value,
  onChange,
}) => {
  return (
    <div style={{ overflowY: "auto" }}>
      <BasicEditor value={value} />
    </div>
  );
};

export default MarkdownEditor;
