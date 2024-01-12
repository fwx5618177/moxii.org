import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";

const CharacterDesign = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new PIXI.Application({
        background: "#1099bb",
        resizeTo: window,
        view: canvasRef.current,
      });

      return () =>
        app.destroy(true, {
          children: true,
          texture: true,
        });
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        style={{
          height: 800,
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default CharacterDesign;
