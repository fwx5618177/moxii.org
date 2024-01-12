import { CharacterOptions } from "Graph";
import * as PIXI from "pixi.js";

export const loadCharacter = (
  app: PIXI.Application,
  options: CharacterOptions
): PIXI.Sprite => {
  const character = PIXI.Sprite.from(options.imagePath);
  app.stage.addChild(character);
  return character;
};
