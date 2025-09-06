"use client";
import { Assets, Graphics, Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  size: number;
  x: number;
  y: number;
}
export function Circle({ size, x, y }: Props) {
  const drawRound = useCallback(
    (g: Graphics) => {
      g.circle(size / 2, size / 2, 4).fill({
        color: 0x000,
        alpha: 0.075,
      });
    },
    [size],
  );
  return (
    <pixiContainer eventMode="static" x={x} y={y}>
      <pixiGraphics draw={drawRound} width={size} height={size} />
    </pixiContainer>
  );
}
