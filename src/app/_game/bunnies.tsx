import { randomIntegerBetween } from "@std/random";
import { memo, useCallback } from "react";
import { CELL_SIZE, GRID_SIZE } from "./lib";
import { BunnySprite } from "./bunny-sprite";
type Props = {
  bunnies: number[];
};
export const Bunnies = memo(function Bunnies({ bunnies }: Props) {
  const randomCoordinates = useCallback(() => {
    return {
      x: randomIntegerBetween(10, GRID_SIZE * CELL_SIZE - 10),
      y: randomIntegerBetween(10, GRID_SIZE * CELL_SIZE - 10),
    };
  }, []);
  return bunnies.map((_, idx) => {
    const coordinates = randomCoordinates();
    return (
      <BunnySprite key={`bunny:${idx}`} x={coordinates.x} y={coordinates.y} />
    );
  });
});
