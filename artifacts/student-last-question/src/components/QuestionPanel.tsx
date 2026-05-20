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
  const letters = ["ก", "ข", "ค", "ง"];

  return (
    <div className="w-full max-w-4xl mx-auto border-4 border-white bg-card/95 p-3 md:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
      <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground border-2 border-white px-2 py-1 text-[10px]">
        ตา {turn}
      </div>

      <div className="min-h-[60px] mb-4 flex items-center justify-center text-center">
        <h2 className="text-xs md:text-sm leading-loose" data-testid="question-text">
          {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
        {question.options.map((option, idx) => {
          let btnClass = "bg-secondary text-secondary-foreground border-2 border-transparent hover:border-primary";

          if (selectedAnswer !== null) {
            if (idx === question.correct) {
              btnClass = "bg-green-600 text-white border-2 border-white animate-pulse";
            } else if (idx === selectedAnswer) {
              btnClass = "bg-destructive text-destructive-foreground border-2 border-white opacity-80";
            } else {
              btnClass = "bg-secondary/40 text-secondary-foreground/50 border-2 border-transparent";
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedAnswer !== null}
              onClick={() => onAnswer(idx)}
              data-testid={`answer-button-${idx}`}
              className={`text-left p-2 md:p-3 text-[10px] md:text-xs transition-all flex gap-2 items-start cursor-pointer ${btnClass} ${
                selectedAnswer === null ? "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
              }`}
            >
              <span className="text-accent shrink-0">{letters[idx]}.</span>
              <span className="leading-loose">{option}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-xs md:text-sm text-accent font-bold leading-loose"
          data-testid="feedback-text"
        >
          {feedback}
        </motion.div>
      )}
    </div>
  );
}
