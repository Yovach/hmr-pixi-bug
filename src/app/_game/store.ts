import { create } from "zustand";

interface GameState {
  gameId: number | null;
  setGame: (gameId: number | null) => void;
}

export const gameStore = create<GameState>()((set) => ({
  gameId: null,
  setGame(gameId) {
    return set({ gameId });
  },
}));
