import { motion } from "framer-motion";

interface HPBarProps {
  hp: number;
  maxHP: number;
  name: string;
  isPlayer: boolean;
}

export function HPBar({ hp, maxHP, name, isPlayer }: HPBarProps) {
  const percentage = Math.max(0, Math.min(100, (hp / maxHP) * 100));
  
  let barColor = "bg-green-500";
  if (!isPlayer) {
    barColor = "bg-purple-500";
  } else {
    if (percentage < 30) barColor = "bg-red-500";
    else if (percentage < 60) barColor = "bg-yellow-500";
  }

  return (
    <div className="w-full max-w-[300px] border-4 border-white bg-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-2 text-xs md:text-sm">
        <span className="uppercase tracking-tighter" data-testid={`hpbar-name-${name}`}>{name}</span>
        <span data-testid={`hpbar-value-${name}`}>HP {hp}/{maxHP}</span>
      </div>
      <div className="h-4 md:h-6 w-full bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
        <motion.div
          className={`h-full ${barColor}`}
          initial={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
