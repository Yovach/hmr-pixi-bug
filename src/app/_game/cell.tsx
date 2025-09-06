"use client";

import { Graphics } from "pixi.js";
import { memo, useCallback } from "react";
import { useCalculateCoordinates } from "./use-calc";
import { CELL_SIZE, GRID_SIZE } from "./lib";

interface Props {
  size: number;
  id: number;
  onHover?: (cellId: number) => void;
  hoverred: boolean;
}
export const Cell = memo(function Cell({ size, id, onHover, hoverred }: Props) {
  const { calcX, calcY } = useCalculateCoordinates(GRID_SIZE, CELL_SIZE);
  const drawRect = useCallback(
    (g: Graphics) => {
      g.rect(0, 0, size, size).fill({
        color: hoverred ? 0xeab308 : 0xffffff,
        alpha: 1,
      });
    },
    [size, hoverred],
  );
  const drawRound = useCallback(
    (g: Graphics) => {
      g.circle(size / 2, size / 2, 4).fill({
        color: 0x000,
        alpha: 0.075,
      });
    },
    [size],
  );
  const onHoverEvent = useCallback(() => onHover?.(id), [onHover, id]);
  return (
    <pixiContainer
      eventMode="static"
      x={calcX(id)}
      y={calcY(id)}
      onPointerOver={onHoverEvent}
    >
      <pixiGraphics draw={drawRect} width={size} height={size} />
      <pixiGraphics draw={drawRound} width={size} height={size} />
    </pixiContainer>
  );
});
