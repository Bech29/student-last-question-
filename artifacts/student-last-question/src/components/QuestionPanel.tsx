import { motion } from "framer-motion";
import { Question } from "../context/GameContext";

interface QuestionPanelProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  feedback: string | null;
  turn: number;
}

export function QuestionPanel({ question, selectedAnswer, onAnswer, feedback, turn }: QuestionPanelProps) {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="w-full max-w-4xl mx-auto border-4 border-white bg-card p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
      <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground border-2 border-white px-2 py-1 text-xs">
        TURN {turn}
      </div>
      
      <div className="min-h-[80px] mb-6 flex items-center justify-center text-center">
        <h2 className="text-sm md:text-lg leading-loose" data-testid="question-text">
          {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, idx) => {
          let btnClass = "bg-secondary text-secondary-foreground border-2 border-transparent hover:border-primary";
          
          if (selectedAnswer !== null) {
            if (idx === question.correct) {
              btnClass = "bg-green-600 text-white border-2 border-white animate-pulse";
            } else if (idx === selectedAnswer) {
              btnClass = "bg-destructive text-destructive-foreground border-2 border-white opacity-75";
            } else {
              btnClass = "bg-secondary/50 text-secondary-foreground/50 border-2 border-transparent";
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedAnswer !== null}
              onClick={() => onAnswer(idx)}
              data-testid={`answer-button-${idx}`}
              className={`text-left p-3 text-xs md:text-sm transition-all flex gap-3 items-start ${btnClass} ${
                selectedAnswer === null ? "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
              }`}
            >
              <span className="text-accent">{letters[idx]}.</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-sm md:text-base text-accent font-bold"
          data-testid="feedback-text"
        >
          {feedback}
        </motion.div>
      )}
    </div>
  );
}
