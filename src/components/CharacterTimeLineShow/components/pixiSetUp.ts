import { SetupPixiAppProps } from "Novel";
import * as PIXI from "pixi.js";

export const setupPixiApp = (
  props: SetupPixiAppProps
): PIXI.Application<PIXI.ICanvas> => {
  const app = new PIXI.Application({
    ...props,
    resizeTo: window,
    width: props?.width || 800,
    height: props?.height || 600,
    view: props?.view,
    backgroundColor: props?.backgroundColor || 0x333333,
  });

  return app;
};
