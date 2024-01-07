import { Plate } from "@udecode/plate-common";

import { Editor } from "@/components/plate-ui/editor";
import { plugins } from "./plugins";

const BasicEditor = ({ value }) => {
  return (
    <Plate initialValue={value} plugins={plugins}>
      <Editor placeholder="Type..." />
    </Plate>
  );
};

export default BasicEditor;
