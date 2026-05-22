import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useGame } from "@/context/GameContext";
import { HPBar } from "@/components/HPBar";
import { QuestionPanel } from "@/components/QuestionPanel";
import { DamageNumber } from "@/components/DamageNumber";
import { UltimateGauge } from "@/components/UltimateGauge";
import { ShopModal } from "@/components/ShopModal";
import { motion, AnimatePresence } from "framer-motion";
import { getQuestionsForStage, Subject, SUBJECT_LABELS } from "@/data/questions";
import { Question } from "@/context/GameContext";
import bg2 from "@assets/bg2_1779248796861.jpg";
import m1Img from "@assets/m1_1779248796739.png";
import m2Img from "@assets/m2_1779248796748.jpg";
import m3Img from "@assets/m3_1779248796757.jpg";
import m4Img from "@assets/m4_1779248796766.jpg";
import m5Img from "@assets/m5_1779248796775.png";
import boss1Img from "@assets/boss1_1779248796783.jpg";
import boss2Img from "@assets/boss2_1779248796793.jpg";
import boss3Img from "@assets/boss3_1779248796802.jpg";
import boss4Img from "@assets/boss4_1779248796818.jpg";
import boss5Img from "@assets/boss5_1779248796828.jpg";
import boss6Img from "@assets/boss6_1779248796838.jpg";

interface Enemy {
  id: number;
  name: string;
  image: string;
  maxHP: number;
  stage: number;
  isBoss: boolean;
}

const STAGE_ENEMIES: Enemy[] = [
  { id: 1, name: "ริว", image: m1Img, maxHP: 80, stage: 1, isBoss: false },
  { id: 2, name: "เจย์", image: m2Img, maxHP: 100, stage: 2, isBoss: false },
  { id: 3, name: "ไค", image: m3Img, maxHP: 120, stage: 3, isBoss: false },
  { id: 4, name: "นีโอ", image: m4Img, maxHP: 140, stage: 4, isBoss: false },
  { id: 5, name: "เซน", image: m5Img, maxHP: 160, stage: 5, isBoss: false },
];

const BOSSES: Enemy[] = [
  { id: 6, name: "ภาษาไทย", image: boss1Img, maxHP: 200, stage: 6, isBoss: true },
  { id: 7, name: "คณิตศาสตร์", image: boss2Img, maxHP: 200, stage: 6, isBoss: true },
  { id: 8, name: "คอมพิวเตอร์", image: boss3Img, maxHP: 200, stage: 6, isBoss: true },
  { id: 9, name: "ประวัติศาสตร์", image: boss4Img, maxHP: 200, stage: 6, isBoss: true },
  { id: 10, name: "อังกฤษ", image: boss5Img, maxHP: 200, stage: 6, isBoss: true },
  { id: 11, name: "สังคมศึกษา", image: boss6Img, maxHP: 200, stage: 6, isBoss: true },
];

const ULTIMATE_MAX = 5;
const COINS_PER_CORRECT = 10;
const COINS_STREAK_BONUS = 5;

export default function GameScreen() {
  const [, setLocation] = useLocation();
  const { setGameResult, selectedCharacter, selectedSubject } = useGame();

  const bossRef = useRef<Enemy>(BOSSES[Math.floor(Math.random() * BOSSES.length)]);
  const allEnemies = [...STAGE_ENEMIES, bossRef.current];

  // Battle state
  const [stageIndex, setStageIndex] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(allEnemies[0].maxHP);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [turn, setTurn] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [playerHit, setPlayerHit] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState<Array<{ id: string; amount: number; isPlayer: boolean; isHeal?: boolean }>>([]);

  // New systems
  const [coins, setCoins] = useState(0);
  const [buffCount, setBuffCount] = useState(0);     // stacks up to 5
  const [potionCount, setPotionCount] = useState(0); // tracks total purchased, up to 5
  const [shieldActive, setShieldActive] = useState(false);
  const [ultimateGauge, setUltimateGauge] = useState(0);
  const [streak, setStreak] = useState(0);

  // UI state
  const [showShop, setShowShop] = useState(false);
  const [pendingNextStage, setPendingNextStage] = useState(false);
  const [stageClearedText, setStageClearedText] = useState("");
  const [showStageBanner, setShowStageBanner] = useState(false);

  // Refs for latest values
  const playerHPRef = useRef(100);
  const enemyHPRef = useRef(allEnemies[0].maxHP);
  const coinsRef = useRef(0);
  const statsRef = useRef({ correct: 0, wrong: 0, stagesCleared: 0 });
  const stageIndexRef = useRef(0);

  useEffect(() => {
    if (!selectedCharacter || !selectedSubject) {
      setLocation(selectedSubject ? "/select" : "/subject");
      return;
    }
    loadQuestionsForStage(0, selectedSubject);
  }, [selectedCharacter, selectedSubject]);

  const loadQuestionsForStage = (idx: number, subject: Subject) => {
    const q = getQuestionsForStage(subject, idx);
    setQuestions(q);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const currentEnemy = allEnemies[stageIndex];

  const triggerUltimate = useCallback(() => {
    if (ultimateGauge < ULTIMATE_MAX || selectedAnswer !== null) return;
    // Double the standard base damage range
    const baseDamage = Math.floor(Math.random() * 11) + 20;
    const damage = baseDamage * 2;
    const newEnemyHP = Math.max(0, enemyHPRef.current - damage);
    enemyHPRef.current = newEnemyHP;
    setEnemyHP(newEnemyHP);
    setEnemyHit(true);
    setUltimateGauge(0);
    setFeedback(`⚡ ULTIMATE! โจมตี 2× = ${damage} ความเสียหาย! เกจรีเซ็ตแล้ว`);
    setDamageNumbers(prev => [...prev, { id: `ult-${Math.random()}`, amount: damage, isPlayer: false }]);
    setTimeout(() => setEnemyHit(false), 500);

    if (newEnemyHP <= 0) {
      setTimeout(() => handleEnemyDefeated(), 1500);
    }
  }, [ultimateGauge, selectedAnswer]);

  const handleEnemyDefeated = useCallback(() => {
    statsRef.current.stagesCleared++;
    const cleared = stageIndexRef.current + 1;
    const isBoss = allEnemies[stageIndexRef.current].isBoss;
    const text = isBoss ? "เอาชนะบอสได้แล้ว!" : `ผ่านด่านที่ ${cleared} แล้ว!`;
    setStageClearedText(text);
    setShowStageBanner(true);

    setTimeout(() => {
      setShowStageBanner(false);
      const nextIdx = stageIndexRef.current + 1;
      if (nextIdx >= allEnemies.length) {
        // All stages done — win!
        setGameResult({
          playerWon: true,
          correctAnswers: statsRef.current.correct,
          wrongAnswers: statsRef.current.wrong,
          totalQuestions: statsRef.current.correct + statsRef.current.wrong,
          stagesCleared: statsRef.current.stagesCleared,
          coinsEarned: coinsRef.current,
        });
        setLocation("/result");
      } else if (!allEnemies[stageIndexRef.current].isBoss) {
        // Show shop between stages (not after boss)
        setPendingNextStage(true);
        setShowShop(true);
      } else {
        advanceStage(nextIdx);
      }
    }, 1800);
  }, [allEnemies, setGameResult, setLocation]);

  const advanceStage = useCallback((nextIdx: number) => {
    stageIndexRef.current = nextIdx;
    setStageIndex(nextIdx);
    const nextEnemy = allEnemies[nextIdx];
    enemyHPRef.current = nextEnemy.maxHP;
    setEnemyHP(nextEnemy.maxHP);
    setSelectedAnswer(null);
    setFeedback(null);
    setPendingNextStage(false);
    if (selectedSubject) loadQuestionsForStage(nextIdx, selectedSubject);
  }, [allEnemies, selectedSubject]);

  const handleShopClose = useCallback(() => {
    setShowShop(false);
    if (pendingNextStage) {
      advanceStage(stageIndexRef.current + 1);
    }
  }, [pendingNextStage, advanceStage]);

  const handleShopBuy = useCallback((itemId: string) => {
    const currentCoins = coinsRef.current;
    if (itemId === "potion" && currentCoins >= 30 && playerHPRef.current < 100) {
      setPotionCount(prev => {
        if (prev >= 5) return prev;
        const healed = Math.min(30, 100 - playerHPRef.current);
        playerHPRef.current = Math.min(100, playerHPRef.current + healed);
        coinsRef.current -= 30;
        setPlayerHP(playerHPRef.current);
        setCoins(coinsRef.current);
        setDamageNumbers(p => [...p, { id: `heal-${Math.random()}`, amount: healed, isPlayer: true, isHeal: true }]);
        return prev + 1;
      });
    } else if (itemId === "buff" && currentCoins >= 25) {
      setBuffCount(prev => {
        if (prev >= 5) return prev;
        coinsRef.current -= 25;
        setCoins(coinsRef.current);
        return prev + 1;
      });
    } else if (itemId === "shield" && currentCoins >= 40 && !shieldActive) {
      coinsRef.current -= 40;
      setCoins(coinsRef.current);
      setShieldActive(true);
    }
  }, [shieldActive]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !questions[questionIndex] || showShop) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[questionIndex].correct;

    if (isCorrect) {
      statsRef.current.correct++;
      const newStreak = streak + 1;
      setStreak(newStreak);

      let damage = Math.floor(Math.random() * 11) + 20;
      if (buffCount > 0) {
        damage += 20;
        setBuffCount(prev => prev - 1);
      }

      const newEnemyHP = Math.max(0, enemyHPRef.current - damage);
      enemyHPRef.current = newEnemyHP;
      setEnemyHP(newEnemyHP);
      setEnemyHit(true);

      // Coins
      let earned = COINS_PER_CORRECT;
      if (newStreak >= 3) earned += COINS_STREAK_BONUS;
      coinsRef.current += earned;
      setCoins(coinsRef.current);

      // Ultimate gauge
      setUltimateGauge(prev => Math.min(ULTIMATE_MAX, prev + 1));

      const streakMsg = newStreak >= 3 ? ` (คอมโบ x${newStreak} +${COINS_STREAK_BONUS} เหรียญ!)` : "";
      setFeedback(`ถูกต้อง! โจมตี ${damage} ความเสียหาย! +${earned} เหรียญ${streakMsg}`);
      setDamageNumbers(prev => [...prev, { id: Math.random().toString(), amount: damage, isPlayer: false }]);
      setTimeout(() => setEnemyHit(false), 500);

      if (newEnemyHP <= 0) {
        setTimeout(() => handleEnemyDefeated(), 1800);
        return;
      }
    } else {
      statsRef.current.wrong++;
      setStreak(0);

      if (shieldActive) {
        setShieldActive(false);
        setFeedback(`ผิด! โล่ป้องกันรับความเสียหายแทน!`);
      } else {
        const damage = Math.floor(Math.random() * 11) + 15;
        const newPlayerHP = Math.max(0, playerHPRef.current - damage);
        playerHPRef.current = newPlayerHP;
        setPlayerHP(newPlayerHP);
        setPlayerHit(true);
        setFeedback(`ผิด! รับความเสียหาย ${damage} แต้ม!`);
        setDamageNumbers(prev => [...prev, { id: Math.random().toString(), amount: damage, isPlayer: true }]);
        setTimeout(() => setPlayerHit(false), 500);

        if (newPlayerHP <= 0) {
          setTimeout(() => {
            setGameResult({
              playerWon: false,
              correctAnswers: statsRef.current.correct,
              wrongAnswers: statsRef.current.wrong,
              totalQuestions: statsRef.current.correct + statsRef.current.wrong,
              stagesCleared: statsRef.current.stagesCleared,
              coinsEarned: coinsRef.current,
            });
            setLocation("/result");
          }, 1800);
          return;
        }
      }
    }

    setTimeout(() => {
      if (questionIndex >= questions.length - 1) {
        // Out of questions for this stage — reload same stage questions
        if (selectedSubject) loadQuestionsForStage(stageIndexRef.current, selectedSubject);
        setTurn(prev => prev + 1);
      } else {
        setQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
        setTurn(prev => prev + 1);
      }
    }, 1800);
  };

  const removeDamageNumber = (id: string) => {
    setDamageNumbers(prev => prev.filter(n => n.id !== id));
  };

  if (questions.length === 0 || !selectedCharacter || !selectedSubject) return null;

  const diffLabel = stageIndex <= 1 ? "ง่าย" : stageIndex <= 3 ? "ปานกลาง" : "ยาก";
  const stageLabel = currentEnemy.isBoss ? "ด่านสุดท้าย: บอส!" : `ด่านที่ ${stageIndex + 1}`;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden">
      <img
        src={bg2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 58%" }}
      />
      <div className="absolute inset-0 bg-black/65" />

      {/* Stage cleared banner */}
      <AnimatePresence>
        {showStageBanner && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-primary/90 border-4 border-white px-10 py-6 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-white text-lg md:text-2xl leading-loose">{stageClearedText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop modal */}
      <AnimatePresence>
        {showShop && (
          <ShopModal
            coins={coins}
            playerHP={playerHP}
            maxHP={100}
            potionCount={potionCount}
            buffCount={buffCount}
            shieldActive={shieldActive}
            onBuy={handleShopBuy}
            onClose={handleShopClose}
            stageCleared={stageIndex + 1}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full min-h-[100dvh] p-2 md:p-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-1 gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-[9px] px-2 py-0.5 border-2 border-white ${currentEnemy.isBoss ? "bg-destructive" : "bg-secondary"} text-white`}
              data-testid="stage-label">
              {stageLabel}
            </span>
            <span className="text-[9px] px-2 py-0.5 border border-muted text-muted-foreground">
              {SUBJECT_LABELS[selectedSubject]} · {diffLabel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-yellow-400 border border-yellow-600 px-2 py-0.5" data-testid="coin-display">
              {coins} เหรียญ
            </span>
          </div>
        </div>

        {/* HP Bars */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <HPBar hp={playerHP} maxHP={100} name={selectedCharacter.thaiName} isPlayer={true} />
          <HPBar hp={enemyHP} maxHP={currentEnemy.maxHP} name={currentEnemy.name} isPlayer={false} isBoss={currentEnemy.isBoss} />
        </div>

        {/* Ultimate gauge */}
        <div className="flex justify-center mb-1">
          <UltimateGauge
            gauge={ultimateGauge}
            maxGauge={ULTIMATE_MAX}
            onActivate={triggerUltimate}
            disabled={selectedAnswer !== null || showShop}
          />
        </div>

        {/* Battle area */}
        <div className="flex-1 flex justify-between items-end px-2 md:px-8 relative min-h-[140px] md:min-h-[220px]">
          {/* Player */}
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={playerHit ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.thaiName}
                className="h-28 md:h-48 w-auto object-contain object-bottom drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                data-testid="player-sprite"
              />
            </motion.div>
            {damageNumbers.filter(d => d.isPlayer).map(d => (
              <DamageNumber key={d.id} id={d.id} amount={d.amount} x={30} y={-20} onComplete={removeDamageNumber} isHeal={d.isHeal} />
            ))}
          </div>

          {/* Enemy */}
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={enemyHit ? { x: [8, -8, 8, -8, 0], filter: ["brightness(3)", "brightness(1)"] } : {}}
              transition={{ duration: 0.4 }}
            >
              <img
                src={currentEnemy.image}
                alt={currentEnemy.name}
                className={`h-28 md:h-48 w-auto object-contain object-bottom ${currentEnemy.isBoss ? "drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]" : "drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]"}`}
                data-testid="enemy-sprite"
              />
            </motion.div>
            {damageNumbers.filter(d => !d.isPlayer).map(d => (
              <DamageNumber key={d.id} id={d.id} amount={d.amount} x={30} y={-20} onComplete={removeDamageNumber} />
            ))}
          </div>
        </div>

        {/* Question panel */}
        <div className="mt-auto">
          <QuestionPanel
            question={questions[questionIndex]}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            feedback={feedback}
            turn={turn}
            buffCount={buffCount}
            shieldActive={shieldActive}
          />
        </div>
      </div>
    </div>
  );
}
