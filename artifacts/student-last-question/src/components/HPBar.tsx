import { motion } from "framer-motion";

interface HPBarProps {
  hp: number;
  maxHP: number;
  name: string;
  isPlayer: boolean;
  isBoss?: boolean;
}

export function HPBar({ hp, maxHP, name, isPlayer, isBoss }: HPBarProps) {
  const percentage = Math.max(0, Math.min(100, (hp / maxHP) * 100));

  let barColor = "bg-green-500";
  if (isPlayer) {
    if (percentage < 30) barColor = "bg-red-500";
    else if (percentage < 60) barColor = "bg-yellow-400";
    else barColor = "bg-green-500";
  } else {
    barColor = isBoss ? "bg-red-600" : "bg-purple-500";
  }

  return (
    <div className="w-full max-w-[260px] border-4 border-white bg-black/80 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-1 text-[10px] md:text-xs">
        <span className="uppercase tracking-tighter truncate max-w-[100px]" data-testid={`hpbar-name-${name}`}>
          {isBoss ? `[บอส] ${name}` : name}
        </span>
        <span className="text-accent" data-testid={`hpbar-value-${name}`}>
          {hp}/{maxHP}
        </span>
      </div>
      <div className="h-3 md:h-5 w-full bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
        <motion.div
          className={`h-full ${barColor}`}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}
