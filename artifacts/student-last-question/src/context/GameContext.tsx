import { createContext, useContext, useState, ReactNode } from "react";

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

export interface Character {
  id: number;
  name: string;
  thaiName: string;
  image: string;
}

export interface GameResult {
  playerWon: boolean | null;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  stagesCleared: number;
}

interface GameContextType {
  gameResult: GameResult;
  setGameResult: (state: GameResult) => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (char: Character) => void;
  resetGame: () => void;
}

const defaultResult: GameResult = {
  playerWon: null,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalQuestions: 0,
  stagesCleared: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameResult, setGameResult] = useState<GameResult>(defaultResult);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const resetGame = () => {
    setGameResult(defaultResult);
    setSelectedCharacter(null);
  };

  return (
    <GameContext.Provider value={{ gameResult, setGameResult, selectedCharacter, setSelectedCharacter, resetGame }}>
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
