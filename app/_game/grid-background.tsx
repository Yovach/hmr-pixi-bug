import { Graphics } from "pixi.js";
import { memo, useCallback } from "react";

interface Props {
  height: number;
  width: number;
}

export const GridBackground = memo(function GridBackground({
  width,
  height,
}: Props) {
  const draw = useCallback(
    (g: Graphics) => {
      g.rect(0, 0, width, height).fill({
        color: "#059669",
        alpha: 1,
      });
    },
    [height, width],
  );

  return <pixiGraphics draw={draw} />;
});
