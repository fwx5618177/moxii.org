import { TDescendant, TElement, getPluginType } from "@udecode/plate-common";
import {
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_OL,
  ELEMENT_UL,
} from "@udecode/plate-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import {
  MdastNode,
  remarkTransformElementChildren,
} from "@udecode/plate-serializer-md";

export const RULES = {
  deserialize: {
    list: {
      transform: (node: MdastNode, options) => {
        console.log({
          node,
        });
        if (options.indentList) {
          const listStyleType = node.ordered ? "decimal" : "disc";

          const parseListItems = (
            node: MdastNode,
            listItems: TElement[] = [],
            indent = 1
          ) => {
            node?.children?.forEach((listItem, index) => {
              const [paragraph, ...subLists] = listItem.children;

              const hasCheckbox = paragraph.children.some(
                (child) => child.type === "text" && child.value.includes("[ ]")
              );

              const type = hasCheckbox
                ? getPluginType(options.editor, "action_item")
                : getPluginType(options.editor, ELEMENT_PARAGRAPH);

              // 检查并处理paragraph的子节点
              paragraph.children.forEach((child) => {
                if (child.type === "text") {
                  // 检查是否包含 "[ ]"
                  const hasCheckbox = child.value.includes("[ ]");
                  if (hasCheckbox) {
                    // 替换或去除 "[ ]"
                    child.value = child.value.replace("[ ]", ""); // 可以替换为其他内容或完全去除
                  }
                }
              });

              const newItem = {
                type,
                listStyleType: hasCheckbox ? "none" : listStyleType,
                indent,
                listStart: index + 1,
                children: remarkTransformElementChildren(paragraph, options),
              };

              listItems.push(newItem);

              subLists.forEach((subList) => {
                parseListItems(subList, listItems, indent + 1);
              });
            });

            return listItems;
          };

          return parseListItems(node);
        } else {
          return {
            type: getPluginType(
              options.editor,
              node.ordered ? ELEMENT_OL : ELEMENT_UL
            ),
            children: remarkTransformElementChildren(node, options),
          };
        }
      },
    },
    listItem: {
      transform: (node, options) => {
        return {
          type: getPluginType(options.editor, ELEMENT_LI),
          children: remarkTransformElementChildren(node, options).map(
            (child) =>
              ({
                ...child,
                type:
                  child.type ===
                  getPluginType(options.editor, ELEMENT_PARAGRAPH)
                    ? getPluginType(options.editor, ELEMENT_LIC)
                    : child.type,
              } as TDescendant)
          ),
        };
      },
    },
    paragraph: {
      transform: (node, options) => {
        const children = remarkTransformElementChildren(node, options);

        const paragraphType = getPluginType(options.editor, ELEMENT_PARAGRAPH);
        const splitBlockTypes = new Set([
          getPluginType(options.editor, ELEMENT_IMAGE),
        ]);

        const elements: TElement[] = [];
        let inlineNodes: TDescendant[] = [];

        const flushInlineNodes = () => {
          if (inlineNodes.length > 0) {
            elements.push({
              type: paragraphType,
              children: inlineNodes,
            });

            inlineNodes = [];
          }
        };

        children.forEach((child) => {
          const { type } = child;

          if (type && splitBlockTypes.has(type as string)) {
            flushInlineNodes();
            elements.push(child as TElement);
          } else {
            inlineNodes.push(child);
          }
        });

        flushInlineNodes();

        return elements;
      },
    },
  },
  serialize(obj, children) {
    if (obj.object === "block") {
      switch (obj.type) {
        case "paragraph":
          return `<p>${children}</p>`;
        case "bold":
          return `<strong>${children}</strong>`;
        case "italic":
          return `<em>${children}</em>`;
        case "bulleted-list":
          return `<ul>${children}</ul>`;
        case "list-item":
          return `<li>${children}</li>`;
      }
    }
  },
};
