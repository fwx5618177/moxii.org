import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { createBlockquotePlugin } from "@udecode/plate-block-quote";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { createPlugins } from "@udecode/plate-common";
import { createHeadingPlugin } from "@udecode/plate-heading";
import { createParagraphPlugin } from "@udecode/plate-paragraph";
import { createPlateUI } from "./createPlateUI";

export const plugins = createPlugins(
  [
    // Pick your plugins in https://platejs.org/?builder=true
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
  ],
  {
    // Pick your components in https://platejs.org/?builder=true
    components: createPlateUI(),
  }
);
