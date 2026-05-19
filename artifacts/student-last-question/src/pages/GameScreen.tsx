import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useGame, Question } from "@/context/GameContext";
import { HPBar } from "@/components/HPBar";
import { CharacterSprite } from "@/components/CharacterSprite";
import { QuestionPanel } from "@/components/QuestionPanel";
import { DamageNumber } from "@/components/DamageNumber";

const QUESTIONS: Question[] = [
  { id: 1, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correct: 0 },
  { id: 2, question: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1 },
  { id: 3, question: "What is the binary representation of the decimal number 10?", options: ["1010", "1100", "1001", "0110"], correct: 0 },
  { id: 4, question: "Which protocol is used to transfer web pages over the internet?", options: ["FTP", "SMTP", "HTTP", "SSH"], correct: 2 },
  { id: 5, question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Application Memory", "Random Application Module"], correct: 1 },
  { id: 6, question: "In programming, what is a 'variable'?", options: ["A fixed value that never changes", "A named storage location that holds data", "A type of loop", "A function that returns data"], correct: 1 },
  { id: 7, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Method Language", "Home Tool Markup Language"], correct: 0 },
  { id: 8, question: "Which of these is NOT a programming language?", options: ["Python", "Java", "Photoshop", "C++"], correct: 2 },
  { id: 9, question: "What is the output of: 5 % 2 in most programming languages?", options: ["2", "2.5", "1", "0"], correct: 2 },
  { id: 10, question: "What does an operating system do?", options: ["Browses the internet", "Manages hardware and software resources", "Creates spreadsheets", "Compiles code only"], correct: 1 },
  { id: 11, question: "Which sorting algorithm has an average time complexity of O(n log n)?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"], correct: 2 },
  { id: 12, question: "What is the main purpose of CSS in web development?", options: ["Define website structure", "Handle server requests", "Style and layout web pages", "Store user data"], correct: 2 },
  { id: 13, question: "What is an IP address?", options: ["A type of virus", "A unique numerical label for network devices", "An internet browser", "A type of file format"], correct: 1 },
  { id: 14, question: "In object-oriented programming, what is 'inheritance'?", options: ["Hiding data from users", "A class acquiring properties of another class", "Dividing code into functions", "Storing data in arrays"], correct: 1 },
  { id: 15, question: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "System Query Loop", "Sequential Queue Language"], correct: 1 },
  { id: 16, question: "Which of these is a loop structure in programming?", options: ["if-else", "switch", "for", "try-catch"], correct: 2 },
  { id: 17, question: "What does a compiler do?", options: ["Stores files on the hard drive", "Translates source code into machine code", "Manages network connections", "Designs user interfaces"], correct: 1 },
  { id: 18, question: "What is the decimal value of the hexadecimal number 'FF'?", options: ["240", "255", "250", "256"], correct: 1 },
  { id: 19, question: "What is a 'function' in programming?", options: ["A type of variable", "A reusable block of code that performs a task", "A database table", "A network protocol"], correct: 1 },
  { id: 20, question: "Which device converts digital signals to analog for transmission over phone lines?", options: ["Router", "Hub", "Modem", "Switch"], correct: 2 }
];

export default function GameScreen() {
  const [_, setLocation] = useLocation();
  const { setGameState } = useGame();
  
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [turn, setTurn] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const [playerHit, setPlayerHit] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  
  const [damageNumbers, setDamageNumbers] = useState<Array<{id: string; amount: number; isPlayer: boolean}>>([]);
  
  const statsRef = useRef({ correct: 0, wrong: 0 });

  // Initialize game
  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !questions[currentQuestionIndex]) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestionIndex].correct;
    
    let damage = 0;
    if (isCorrect) {
      statsRef.current.correct++;
      damage = Math.floor(Math.random() * 11) + 20; // 20-30
      setEnemyHP(prev => Math.max(0, prev - damage));
      setEnemyHit(true);
      setFeedback(`Correct! You dealt ${damage} damage!`);
      setDamageNumbers(prev => [...prev, { id: Math.random().toString(), amount: damage, isPlayer: false }]);
      setTimeout(() => setEnemyHit(false), 500);
    } else {
      statsRef.current.wrong++;
      damage = Math.floor(Math.random() * 11) + 15; // 15-25
      setPlayerHP(prev => Math.max(0, prev - damage));
      setPlayerHit(true);
      setFeedback(`Wrong! You took ${damage} damage!`);
      setDamageNumbers(prev => [...prev, { id: Math.random().toString(), amount: damage, isPlayer: true }]);
      setTimeout(() => setPlayerHit(false), 500);
    }

    setTimeout(() => {
      checkGameEnd(isCorrect, damage);
    }, 2000);
  };

  const checkGameEnd = (lastWasCorrect: boolean, lastDamage: number) => {
    const newEnemyHP = lastWasCorrect ? enemyHP - lastDamage : enemyHP;
    const newPlayerHP = !lastWasCorrect ? playerHP - lastDamage : playerHP;
    
    if (newPlayerHP <= 0 || newEnemyHP <= 0 || currentQuestionIndex >= questions.length - 1) {
      const playerWon = newPlayerHP > 0 && (newEnemyHP <= 0 || newPlayerHP > newEnemyHP);
      setGameState({
        playerWon,
        correctAnswers: statsRef.current.correct,
        wrongAnswers: statsRef.current.wrong,
        totalQuestions: statsRef.current.correct + statsRef.current.wrong
      });
      setLocation("/result");
    } else {
      // Next turn
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      setTurn(prev => prev + 1);
    }
  };

  const removeDamageNumber = (id: string) => {
    setDamageNumbers(prev => prev.filter(n => n.id !== id));
  };

  if (questions.length === 0) return null;

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col p-4 md:p-8 relative overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at center, transparent 0, #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)"
      }}
    >
      {/* Top Section - HP Bars */}
      <div className="flex justify-between items-start z-10">
        <HPBar hp={playerHP} maxHP={100} name="Student" isPlayer={true} />
        <HPBar hp={enemyHP} maxHP={100} name="Prof Boss" isPlayer={false} />
      </div>

      {/* Middle Section - Sprites */}
      <div className="flex-1 flex justify-between items-center px-4 md:px-20 z-10 relative">
        <div className="relative">
          <CharacterSprite type="player" isHit={playerHit} />
          {damageNumbers.filter(d => d.isPlayer).map((d) => (
            <DamageNumber key={d.id} id={d.id} amount={d.amount} x={40} y={-40} onComplete={removeDamageNumber} />
          ))}
        </div>
        <div className="relative">
          <CharacterSprite type="enemy" isHit={enemyHit} />
          {damageNumbers.filter(d => !d.isPlayer).map((d) => (
            <DamageNumber key={d.id} id={d.id} amount={d.amount} x={40} y={-40} onComplete={removeDamageNumber} />
          ))}
        </div>
      </div>

      {/* Bottom Section - Question Panel */}
      <div className="z-10 mt-auto">
        <QuestionPanel
          question={questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          feedback={feedback}
          turn={turn}
        />
      </div>
    </div>
  );
}
