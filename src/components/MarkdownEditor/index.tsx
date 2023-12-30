import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { MarkdownEditorProps } from "Dashboard";
import useContentParse from "@/hooks/useContentParse";
import "@/styles/markdownStyles.module.scss";

const MarkdownEditor: FC<Partial<MarkdownEditorProps>> = ({
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const parsedContent = useContentParse(value);
  const [editableLine, setEditableLine] = useState<number | null>(null);

  useEffect(() => {
    if (editableLine !== null) {
      inputRef.current?.focus();
    }
  }, [editableLine]);

  const handleEditClick = (index: number) => {
    setEditableLine(index);
  };

  const handleSaveClick = () => {
    setEditableLine(null);
    if (onChange) {
      onChange(parsedContent);
    }
  };

  const handleInputChange = () => {
    if (editableLine !== null) {
      const updatedContent = inputRef.current?.innerHTML;
      // Update the content in the parent component
      if (onChange && updatedContent !== undefined) {
        onChange(updatedContent);
      }
    }
  };

  return (
    <div style={{ maxHeight: 400, overflowY: "auto" }}>
      <div
        ref={inputRef}
        contentEditable={editableLine !== null}
        suppressContentEditableWarning
        onBlur={handleInputChange}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      ></div>
      {editableLine !== null && (
        <Button type="primary" onClick={handleSaveClick}>
          保存
        </Button>
      )}
    </div>
  );
};

export default MarkdownEditor;
