import { Link, useLocation } from "wouter";
import { useGame } from "@/context/GameContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ResultScreen() {
  const { gameState, resetGame } = useGame();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (gameState.playerWon === null) {
      setLocation("/");
    }
  }, [gameState, setLocation]);

  if (gameState.playerWon === null) return null;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at center, transparent 0, #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)"
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full max-w-2xl bg-card border-4 border-white p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative z-10"
      >
        <h1 className={`text-4xl md:text-6xl mb-8 font-bold tracking-tighter ${gameState.playerWon ? "text-primary" : "text-destructive"}`}>
          {gameState.playerWon ? "VICTORY!" : "DEFEAT"}
        </h1>

        <div className="grid grid-cols-2 gap-6 text-sm md:text-base mb-12">
          <div className="bg-background border-2 border-border p-4">
            <div className="text-muted-foreground mb-2">Questions Answered</div>
            <div className="text-xl text-white">{gameState.totalQuestions}</div>
          </div>
          <div className="bg-background border-2 border-border p-4">
            <div className="text-muted-foreground mb-2">Accuracy</div>
            <div className="text-xl text-accent">
              {gameState.totalQuestions > 0 ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) : 0}%
            </div>
          </div>
          <div className="bg-background border-2 border-border p-4">
            <div className="text-muted-foreground mb-2">Correct Hits</div>
            <div className="text-xl text-green-500">{gameState.correctAnswers}</div>
          </div>
          <div className="bg-background border-2 border-border p-4">
            <div className="text-muted-foreground mb-2">Misses</div>
            <div className="text-xl text-destructive">{gameState.wrongAnswers}</div>
          </div>
        </div>

        <Link
          href="/"
          onClick={resetGame}
          className="inline-block bg-primary text-primary-foreground border-4 border-white px-8 py-4 text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase"
          data-testid="play-again-button"
        >
          Play Again
        </Link>
      </motion.div>
    </div>
  );
}
