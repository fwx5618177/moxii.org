import React, { FC } from "react";
import { MarkdownEditorProps } from "Dashboard";
import "@/styles/markdownStyles.module.scss";
// import PlateEditor from "./components/plate";

const MarkdownEditor: FC<Partial<MarkdownEditorProps>> = ({
  value,
  onChange,
}) => {
  return (
    <div style={{ maxHeight: 400, overflowY: "auto" }}>
      {/* <PlateEditor /> */}
    </div>
  );
};

export default MarkdownEditor;
