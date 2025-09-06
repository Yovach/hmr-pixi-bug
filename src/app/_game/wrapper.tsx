"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { gameStore } from "./store";

const GameLazy = dynamic(() => import("./game").then((mod) => mod.Game));

interface Props {
    game: {id: number};
}

export function Wrapper({ game }: Props) {
    const [isGameVisible, setIsGameVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setIsGameVisible(true), 1000);
        return () => {
            clearTimeout(timeout);
            setIsGameVisible(false);
        }
    }, []);

    useEffect(() => {
        gameStore.getState().setGame(game.id)
    }, [game])

    return isGameVisible ? (
        <>
            <span>{JSON.stringify(game)}</span>
            <GameLazy />
        </>
    ) : null;
}
