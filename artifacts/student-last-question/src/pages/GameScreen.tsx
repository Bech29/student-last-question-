import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useGame, Question } from "@/context/GameContext";
import { HPBar } from "@/components/HPBar";
import { QuestionPanel } from "@/components/QuestionPanel";
import { DamageNumber } from "@/components/DamageNumber";
import { motion, AnimatePresence } from "framer-motion";
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

const QUESTIONS: Question[] = [
  { id: 1, question: "CPU ย่อมาจากอะไร?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correct: 0 },
  { id: 2, question: "โครงสร้างข้อมูลใดที่ใช้หลักการ LIFO (เข้าหลัง-ออกก่อน)?", options: ["คิว (Queue)", "สแตก (Stack)", "อาร์เรย์ (Array)", "ลิงก์ลิสต์ (Linked List)"], correct: 1 },
  { id: 3, question: "เลขฐานสองของเลขฐานสิบ 10 คืออะไร?", options: ["1010", "1100", "1001", "0110"], correct: 0 },
  { id: 4, question: "โปรโตคอลใดใช้สำหรับส่งข้อมูลเว็บเพจผ่านอินเทอร์เน็ต?", options: ["FTP", "SMTP", "HTTP", "SSH"], correct: 2 },
  { id: 5, question: "RAM ย่อมาจากอะไร?", options: ["Read Access Memory", "Random Access Memory", "Rapid Application Memory", "Random Application Module"], correct: 1 },
  { id: 6, question: "ในการเขียนโปรแกรม 'ตัวแปร' คืออะไร?", options: ["ค่าคงที่ที่ไม่เปลี่ยนแปลง", "ที่เก็บข้อมูลที่มีชื่อเรียก", "ประเภทของลูป", "ฟังก์ชันที่คืนค่าข้อมูล"], correct: 1 },
  { id: 7, question: "HTML ย่อมาจากอะไร?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Method Language", "Home Tool Markup Language"], correct: 0 },
  { id: 8, question: "ข้อใดต่อไปนี้ไม่ใช่ภาษาโปรแกรม?", options: ["Python", "Java", "Photoshop", "C++"], correct: 2 },
  { id: 9, question: "ผลลัพธ์ของ 5 % 2 ในภาษาโปรแกรมส่วนใหญ่คืออะไร?", options: ["2", "2.5", "1", "0"], correct: 2 },
  { id: 10, question: "ระบบปฏิบัติการ (OS) ทำหน้าที่อะไร?", options: ["ท่องเว็บอินเทอร์เน็ต", "จัดการทรัพยากรฮาร์ดแวร์และซอฟต์แวร์", "สร้างสเปรดชีต", "แปลงโค้ดเท่านั้น"], correct: 1 },
  { id: 11, question: "อัลกอริทึมการเรียงลำดับใดมีความซับซ้อนเฉลี่ย O(n log n)?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"], correct: 2 },
  { id: 12, question: "จุดประสงค์หลักของ CSS ในการพัฒนาเว็บคืออะไร?", options: ["กำหนดโครงสร้างเว็บ", "จัดการคำขอจากเซิร์ฟเวอร์", "จัดรูปแบบและเลย์เอาต์หน้าเว็บ", "จัดเก็บข้อมูลผู้ใช้"], correct: 2 },
  { id: 13, question: "IP Address คืออะไร?", options: ["ประเภทของไวรัส", "หมายเลขเฉพาะสำหรับอุปกรณ์เครือข่าย", "เว็บเบราว์เซอร์", "ประเภทของไฟล์"], correct: 1 },
  { id: 14, question: "ในการเขียนโปรแกรมเชิงวัตถุ 'การสืบทอด (Inheritance)' คืออะไร?", options: ["การซ่อนข้อมูลจากผู้ใช้", "คลาสหนึ่งรับคุณสมบัติจากอีกคลาส", "การแบ่งโค้ดเป็นฟังก์ชัน", "การเก็บข้อมูลในอาร์เรย์"], correct: 1 },
  { id: 15, question: "SQL ย่อมาจากอะไร?", options: ["Simple Query Language", "Structured Query Language", "System Query Loop", "Sequential Queue Language"], correct: 1 },
  { id: 16, question: "ข้อใดเป็นโครงสร้างการวนซ้ำ (Loop) ในการเขียนโปรแกรม?", options: ["if-else", "switch", "for", "try-catch"], correct: 2 },
  { id: 17, question: "คอมไพเลอร์ (Compiler) ทำหน้าที่อะไร?", options: ["จัดเก็บไฟล์ในฮาร์ดไดรฟ์", "แปลซอร์สโค้ดเป็นรหัสเครื่อง", "จัดการการเชื่อมต่อเครือข่าย", "ออกแบบส่วนติดต่อผู้ใช้"], correct: 1 },
  { id: 18, question: "ค่าทศนิยมของเลขฐานสิบหก 'FF' คือเท่าไร?", options: ["240", "255", "250", "256"], correct: 1 },
  { id: 19, question: "ฟังก์ชัน (Function) ในการเขียนโปรแกรมคืออะไร?", options: ["ประเภทของตัวแปร", "บล็อกโค้ดที่นำกลับมาใช้ซ้ำได้", "ตารางฐานข้อมูล", "โปรโตคอลเครือข่าย"], correct: 1 },
  { id: 20, question: "อุปกรณ์ใดแปลงสัญญาณดิจิทัลเป็นอนาล็อกสำหรับการส่งผ่านสายโทรศัพท์?", options: ["เราเตอร์ (Router)", "ฮับ (Hub)", "โมเด็ม (Modem)", "สวิตช์ (Switch)"], correct: 2 },
];

export default function GameScreen() {
  const [, setLocation] = useLocation();
  const { setGameResult, selectedCharacter } = useGame();

  const bossRef = useRef<Enemy>(BOSSES[Math.floor(Math.random() * BOSSES.length)]);
  const allEnemies = [...STAGE_ENEMIES, bossRef.current];

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
  const [damageNumbers, setDamageNumbers] = useState<Array<{ id: string; amount: number; isPlayer: boolean }>>([]);
  const [stageCleared, setStageCleared] = useState(false);
  const [stageClearedText, setStageClearedText] = useState("");

  const statsRef = useRef({ correct: 0, wrong: 0, stagesCleared: 0 });
  const playerHPRef = useRef(100);
  const enemyHPRef = useRef(allEnemies[0].maxHP);

  useEffect(() => {
    if (!selectedCharacter) {
      setLocation("/select");
      return;
    }
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [selectedCharacter, setLocation]);

  const currentEnemy = allEnemies[stageIndex];

  const advanceToNextStage = useCallback(() => {
    const nextIndex = stageIndex + 1;
    if (nextIndex >= allEnemies.length) {
      setGameResult({
        playerWon: true,
        correctAnswers: statsRef.current.correct,
        wrongAnswers: statsRef.current.wrong,
        totalQuestions: statsRef.current.correct + statsRef.current.wrong,
        stagesCleared: 6,
      });
      setLocation("/result");
    } else {
      const nextEnemy = allEnemies[nextIndex];
      enemyHPRef.current = nextEnemy.maxHP;
      setEnemyHP(nextEnemy.maxHP);
      setStageIndex(nextIndex);
      setStageCleared(false);
      setSelectedAnswer(null);
      setFeedback(null);
    }
  }, [stageIndex, allEnemies, setGameResult, setLocation]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !questions[questionIndex]) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[questionIndex].correct;

    if (isCorrect) {
      statsRef.current.correct++;
      const damage = Math.floor(Math.random() * 11) + 20;
      const newEnemyHP = Math.max(0, enemyHPRef.current - damage);
      enemyHPRef.current = newEnemyHP;
      setEnemyHP(newEnemyHP);
      setEnemyHit(true);
      setFeedback(`ถูกต้อง! โจมตีศัตรู ${damage} ความเสียหาย!`);
      setDamageNumbers(prev => [...prev, { id: Math.random().toString(), amount: damage, isPlayer: false }]);
      setTimeout(() => setEnemyHit(false), 500);

      if (newEnemyHP <= 0) {
        statsRef.current.stagesCleared++;
        const cleared = stageIndex + 1;
        const isBossFight = currentEnemy.isBoss;
        setStageClearedText(isBossFight ? "เอาชนะบอสได้แล้ว!" : `ผ่านด่านที่ ${cleared} แล้ว!`);
        setTimeout(() => {
          setStageCleared(true);
          setTimeout(() => advanceToNextStage(), 1800);
        }, 1500);
        return;
      }
    } else {
      statsRef.current.wrong++;
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
          });
          setLocation("/result");
        }, 1800);
        return;
      }
    }

    setTimeout(() => {
      if (questionIndex >= questions.length - 1) {
        const playerWon = playerHPRef.current > 0;
        setGameResult({
          playerWon,
          correctAnswers: statsRef.current.correct,
          wrongAnswers: statsRef.current.wrong,
          totalQuestions: statsRef.current.correct + statsRef.current.wrong,
          stagesCleared: statsRef.current.stagesCleared,
        });
        setLocation("/result");
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

  if (questions.length === 0 || !selectedCharacter) return null;

  const stageLabel = stageIndex < 5 ? `ด่านที่ ${stageIndex + 1}` : "ด่านสุดท้าย: บอส!";

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden">
      <img
        src={bg2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 58%" }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <AnimatePresence>
        {stageCleared && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-primary/90 border-4 border-white px-10 py-6 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-white text-xl md:text-2xl leading-loose">{stageClearedText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full min-h-[100dvh] p-3 md:p-5">
        {/* Stage label */}
        <div className="text-center mb-2">
          <span
            className={`text-xs px-3 py-1 border-2 border-white ${currentEnemy.isBoss ? "bg-destructive text-white" : "bg-secondary text-white"}`}
            data-testid="stage-label"
          >
            {stageLabel}
          </span>
        </div>

        {/* HP Bars */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <HPBar
            hp={playerHP}
            maxHP={100}
            name={selectedCharacter.thaiName}
            isPlayer={true}
          />
          <HPBar
            hp={enemyHP}
            maxHP={currentEnemy.maxHP}
            name={currentEnemy.name}
            isPlayer={false}
            isBoss={currentEnemy.isBoss}
          />
        </div>

        {/* Battle Area */}
        <div className="flex-1 flex justify-between items-end px-2 md:px-10 relative min-h-[160px] md:min-h-[240px]">
          {/* Player */}
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={playerHit ? { x: [-8, 8, -8, 8, 0], backgroundColor: ["rgba(255,0,0,0.5)", "transparent"] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.thaiName}
                className="h-32 md:h-52 w-auto object-contain object-bottom drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                data-testid="player-sprite"
              />
            </motion.div>
            {damageNumbers.filter(d => d.isPlayer).map(d => (
              <DamageNumber key={d.id} id={d.id} amount={d.amount} x={30} y={-20} onComplete={removeDamageNumber} />
            ))}
          </div>

          {/* Enemy */}
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={enemyHit ? { x: [8, -8, 8, -8, 0], filter: ["brightness(3)", "brightness(1)"] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <img
                src={currentEnemy.image}
                alt={currentEnemy.name}
                className={`h-32 md:h-52 w-auto object-contain object-bottom ${currentEnemy.isBoss ? "drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]" : "drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]"}`}
                data-testid="enemy-sprite"
              />
            </motion.div>
            {damageNumbers.filter(d => !d.isPlayer).map(d => (
              <DamageNumber key={d.id} id={d.id} amount={d.amount} x={30} y={-20} onComplete={removeDamageNumber} />
            ))}
          </div>
        </div>

        {/* Question Panel */}
        <div className="mt-auto">
          <QuestionPanel
            question={questions[questionIndex]}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            feedback={feedback}
            turn={turn}
          />
        </div>
      </div>
    </div>
  );
}
