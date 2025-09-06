"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GameLazy = dynamic(() => import("./game").then((mod) => mod.Game));

interface Props {
    userId: number;
}

export function Wrapper({ userId }: Props) {
    const [isGameVisible, setIsGameVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setIsGameVisible(true), 1000);
        return () => {
            clearTimeout(timeout);
            setIsGameVisible(false);
        }
    }, []);

    return isGameVisible ? (
        <>
            <span>{userId}</span>
            <GameLazy />
        </>
    ) : null;
}
