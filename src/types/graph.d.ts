declare module "Graph" {
  import * as PIXI from "pixi.js";

  export interface CharacterOptions extends PluginOption {
    imagePath: string;
  }

  export interface AnimationOptions extends PluginOption {
    speed: number;
  }

  export interface ShaderOptions extends PluginOption {
    shaderType: string;
  }

  export interface ResourcesOptions extends PluginOption {
    resourcePath: string;
    // 其他资源特定选项
  }

  type PluginOptions =
    | CharacterOptions
    | AnimationOptions
    | ShaderOptions
    | ResourcesOptions;

  export interface PluginOption {
    // 定义一些通用的插件选项
    type: "character" | "animation" | "shader" | "resources";
    options: PluginOptions;
  }

  export interface LoadPlugin {
    character: PIXI.Sprite;
    animation: AnimationOptions;
    resources: string[];
    shader: ShaderOptions;
  }
}
