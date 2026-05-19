import { motion, AnimatePresence } from "framer-motion";

interface DamageNumberProps {
  id: string;
  amount: number;
  x: number;
  y: number;
  onComplete: (id: string) => void;
  isHeal?: boolean;
}

export function DamageNumber({ id, amount, x, y, onComplete, isHeal }: DamageNumberProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y, x, scale: 0.5 }}
      animate={{ opacity: 0, y: y - 50, scale: 1.5 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className={`absolute font-bold text-2xl md:text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-50 pointer-events-none ${
        isHeal ? "text-green-400" : "text-destructive"
      }`}
      style={{ left: x, top: y }}
    >
      {isHeal ? "+" : "-"}{Math.abs(amount)}
    </motion.div>
  );
}
