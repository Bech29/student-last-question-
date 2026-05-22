import { createContext, useContext, useState, ReactNode } from "react";
import { Subject } from "@/data/questions";

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
  coinsEarned: number;
}

interface GameContextType {
  gameResult: GameResult;
  setGameResult: (r: GameResult) => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (c: Character) => void;
  selectedSubject: Subject | null;
  setSelectedSubject: (s: Subject) => void;
  resetGame: () => void;
}

const defaultResult: GameResult = {
  playerWon: null,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalQuestions: 0,
  stagesCleared: 0,
  coinsEarned: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameResult, setGameResult] = useState<GameResult>(defaultResult);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const resetGame = () => {
    setGameResult(defaultResult);
    setSelectedCharacter(null);
    setSelectedSubject(null);
  };

  return (
    <GameContext.Provider value={{
      gameResult, setGameResult,
      selectedCharacter, setSelectedCharacter,
      selectedSubject, setSelectedSubject,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
