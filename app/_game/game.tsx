"use client";

import { Application, extend } from "@pixi/react";
import { Container, EventSystemFeatures, Graphics, Sprite } from "pixi.js";

import { Cell } from "./cell";
import { useCallback, useEffect, useState } from "react";
import { GridBackground } from "./grid-background";
import { CELL_SIZE, GRID_SIZE } from "./lib";
import { Bunnies } from "./bunnies";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

const circles = Array.from({ length: 100 }).fill(undefined);

function generateBunnies(): number[] {
  return new Array<number>(15).fill(0);
}

const eventFeatures: EventSystemFeatures = {
  click: true,
  move: true,
  wheel: false,
  globalMove: false,
};

export function Game() {
  const [hoverredCell, setHoverredCell] = useState<number | null>(null);

  const [bunnies, setBunnies] = useState<number[]>(() => generateBunnies());

  const onHoverCell = useCallback((cellId: number) => {
    setHoverredCell(cellId);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBunnies(generateBunnies());
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <Application
      backgroundAlpha={0}
      height={GRID_SIZE * CELL_SIZE}
      width={GRID_SIZE * CELL_SIZE}
      antialias={false}
      className="h-auto w-full rounded-lg max-w-[700px]"
      eventFeatures={eventFeatures}
      eventMode="static"
    >
      <GridBackground
        height={GRID_SIZE * CELL_SIZE}
        width={GRID_SIZE * CELL_SIZE}
      />
      {circles.map((_, idx) => (
        <Cell
          key={`circle:${idx}`}
          size={CELL_SIZE}
          id={idx}
          onHover={onHoverCell}
          hoverred={hoverredCell === idx}
        />
      ))}
      <Bunnies bunnies={bunnies} />
    </Application>
  );
}
