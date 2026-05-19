import { createContext, useContext, useState, ReactNode } from "react";

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

export interface GameState {
  playerWon: boolean | null;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    playerWon: null,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
  });

  const resetGame = () => {
    setGameState({
      playerWon: null,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalQuestions: 0,
    });
  };

  return (
    <GameContext.Provider value={{ gameState, setGameState, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
