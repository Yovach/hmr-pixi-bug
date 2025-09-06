"use client";

import { Application, extend } from "@pixi/react";
import { Container, EventSystemFeatures, Graphics, Sprite } from "pixi.js";

import { BunnySprite } from "./bunny-sprite";
import { Circle } from "./circle";
import { useCallback } from "react";
import { useCalculateCoordinates } from "./use-calc";
import { GridBackground } from "./grid-background";
import { randomIntegerBetween } from "@std/random";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

const circles = Array.from({ length: 100 }).fill(undefined);
const bunnies = Array.from({ length: 5 }).fill(undefined);
const eventFeatures: EventSystemFeatures = {
  click: true,
  move: true,
  wheel: false,
  globalMove: false,
};

const GRID_SIZE = 10;
const CELL_SIZE = 50;

export function Game() {
  const { calcX, calcY } = useCalculateCoordinates(GRID_SIZE, CELL_SIZE);

  const randomCoordinates = useCallback(() => {
    return {
      x: randomIntegerBetween(10, GRID_SIZE * CELL_SIZE - 10),
      y: randomIntegerBetween(10, GRID_SIZE * CELL_SIZE - 10),
    };
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
        <Circle key={`circle:${idx}`} size={15} x={calcX(idx)} y={calcY(idx)} />
      ))}
      {bunnies.map((_, idx) => {
        const coordinates = randomCoordinates();
        return (
          <BunnySprite
            key={`bunny:${idx}`}
            x={coordinates.x}
            y={coordinates.y}
          />
        );
      })}
    </Application>
  );
}
