import { useLocation } from "wouter";
import { useGame } from "@/context/GameContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import bg3 from "@assets/bg3_1779248796872.jpg";

export default function ResultScreen() {
  const { gameResult, resetGame } = useGame();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (gameResult.playerWon === null) setLocation("/");
  }, [gameResult, setLocation]);

  if (gameResult.playerWon === null) return null;

  const accuracy = gameResult.totalQuestions > 0
    ? Math.round((gameResult.correctAnswers / gameResult.totalQuestions) * 100)
    : 0;

  const handlePlayAgain = () => {
    resetGame();
    setLocation("/");
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src={bg3}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 60%" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-lg px-4"
      >
        <div className="border-4 border-white bg-card/90 p-5 md:p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <motion.h1
            animate={{
              textShadow: gameResult.playerWon
                ? ["0 0 20px #a855f7","0 0 50px #a855f7","0 0 20px #a855f7"]
                : ["0 0 20px #ef4444","0 0 50px #ef4444","0 0 20px #ef4444"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-3xl md:text-5xl mb-2 font-bold tracking-tighter leading-loose ${gameResult.playerWon ? "text-primary" : "text-destructive"}`}
            data-testid="result-title"
          >
            {gameResult.playerWon ? "ชนะแล้ว!" : "แพ้แล้ว!"}
          </motion.h1>

          <p className="text-muted-foreground text-xs mb-5 leading-loose">
            {gameResult.playerWon
              ? "ยอดเยี่ยม! คุณเอาชนะบอสทั้งหมดได้!"
              : "สู้ต่อไป! ความรู้คือพลัง!"}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] mb-5">
            <div className="bg-background border-2 border-border p-3">
              <div className="text-muted-foreground mb-1 leading-loose">ด่านที่ผ่าน</div>
              <div className="text-base text-white" data-testid="stages-cleared">{gameResult.stagesCleared} / 6</div>
            </div>
            <div className="bg-background border-2 border-border p-3">
              <div className="text-muted-foreground mb-1 leading-loose">ความแม่นยำ</div>
              <div className="text-base text-accent" data-testid="accuracy">{accuracy}%</div>
            </div>
            <div className="bg-background border-2 border-border p-3">
              <div className="text-muted-foreground mb-1 leading-loose">ตอบถูก</div>
              <div className="text-base text-green-400" data-testid="correct-count">{gameResult.correctAnswers}</div>
            </div>
            <div className="bg-background border-2 border-border p-3">
              <div className="text-muted-foreground mb-1 leading-loose">ตอบผิด</div>
              <div className="text-base text-destructive" data-testid="wrong-count">{gameResult.wrongAnswers}</div>
            </div>
            <div className="bg-background border-2 border-border p-3 col-span-2">
              <div className="text-muted-foreground mb-1 leading-loose">เหรียญที่ได้รับ</div>
              <div className="text-base text-yellow-400" data-testid="coins-earned">{gameResult.coinsEarned} เหรียญ</div>
            </div>
          </div>

          <motion.button
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={handlePlayAgain}
            data-testid="play-again-button"
            className="bg-primary text-primary-foreground border-4 border-white px-8 py-4 text-sm hover:bg-accent hover:text-accent-foreground transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase cursor-pointer"
          >
            เล่นอีกครั้ง
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
