import { useMemo } from "react";

export function useCalculateCoordinates(gridSize: number, cellSize: number) {
  return useMemo(
    () => ({
      calcX: (i: number) => (i * cellSize) % (gridSize * cellSize),
      calcY: (i: number) => Math.floor(i / gridSize) * cellSize,
    }),
    [cellSize, gridSize],
  );
}
