import { FC } from "react";
import {
  Sandpack,
  SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";

import { ICodeRenderStrategy } from "./ICodeRenderStrategy";

const SandpackStrategy: FC<ICodeRenderStrategy> = ({
  props,
  children,
  node,
  language,
  className,
}) => {
  const { sandpack } = props;
  const parseJson = JSON.parse(sandpack);

  console.log(parseJson);

  return (
    <div
      style={{
        margin: "2rem 0",
      }}
    >
      <Sandpack
        theme={sandpack?.theme || "dark"}
        files={{
          "/App.js": {
            code: children,
          },
        }}
        template={language as SandpackPredefinedTemplate}
        options={{
          showNavigator: true,
          showTabs: true,
          showLineNumbers: true,
          showReadOnly: true,
          externalResources: ["https://cdn.tailwindcss.com"],
          autoReload: true,
          autorun: true,
          initMode: "user-visible",
          initModeObserverOptions: { rootMargin: `1000px 0px` },
          editorHeight: 500,
        }}
      />
    </div>
  );
};

export default SandpackStrategy;
