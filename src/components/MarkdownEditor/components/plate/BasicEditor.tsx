import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plate, PlateContentProps } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { Editor } from "@/components/plate-ui/editor";
import { usePlugins } from "./plugins";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import PreviewLeaf from "./MarkdownPreview/PreviewLeaf";
import useContentParse from "@/hooks/useContentParse";
import { useHtmlSerializer } from "@/hooks/useSlateSerializer";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { initialValue } from "../../defaultData";

const BasicEditor: FC<{
  value: string;
}> = ({ value }) => {
  const _editableProps: PlateContentProps = {
    spellCheck: false,
    autoFocus: false,
    placeholder: "Type......",
    renderLeaf: PreviewLeaf,
  };
  // const parsedContent = useContentParse(value, {
  //   permalinkBefore: false,
  //   symbol: "",
  // });
  const { deserializeMarkdown2Slate } = useHtmlSerializer();
  const slateValue = deserializeMarkdown2Slate(value);
  const plugins = usePlugins();

  // console.log({
  //   plateData,
  // });

  return (
    <div className="p-10">
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={slateValue || initialValue}>
          <TooltipProvider>
            <CommentsProvider>
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor {..._editableProps} />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
              <MentionCombobox items={[]} />
              <CommentsPopover />
            </CommentsProvider>
          </TooltipProvider>
        </Plate>
      </DndProvider>
    </div>
  );
};

export default BasicEditor;
