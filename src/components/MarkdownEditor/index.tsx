import React, { FC } from "react";
import { MarkdownEditorProps } from "Dashboard";
import "@/styles/markdownStyles.module.scss";
import BasicEditor from "./components/plate/BasicEditor";
import { initialValue } from "./defaultData";

const MarkdownEditor: FC<Partial<MarkdownEditorProps>> = ({
  value,
  onChange,
}) => {
  return (
    <div style={{ maxHeight: 400, overflowY: "auto" }}>
      <BasicEditor value={initialValue} />
    </div>
  );
};

export default MarkdownEditor;
