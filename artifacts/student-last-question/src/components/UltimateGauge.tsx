import { motion, AnimatePresence } from "framer-motion";

interface UltimateGaugeProps {
  gauge: number;      // 0–5
  maxGauge: number;   // 5
  onActivate: () => void;
  disabled: boolean;
}

export function UltimateGauge({ gauge, maxGauge, onActivate, disabled }: UltimateGaugeProps) {
  const pct = Math.round((gauge / maxGauge) * 100);
  const isFull = gauge >= maxGauge;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-yellow-400 uppercase tracking-tight whitespace-nowrap">
        ULTIMATE
      </span>

      {/* Progress bar */}
      <div className="relative w-32 md:w-40 h-4 bg-gray-900 border-2 border-yellow-700 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          animate={{
            width: `${pct}%`,
            background: isFull
              ? ["#f59e0b", "#f97316", "#f59e0b"]
              : "linear-gradient(to right, #854d0e, #ca8a04)",
            boxShadow: isFull
              ? ["0 0 8px #fbbf24", "0 0 16px #f97316", "0 0 8px #fbbf24"]
              : "none",
          }}
          transition={{
            width: { duration: 0.35, ease: "easeOut" },
            background: { duration: 0.8, repeat: isFull ? Infinity : 0 },
            boxShadow: { duration: 0.8, repeat: isFull ? Infinity : 0 },
          }}
        />
        {/* Tick marks at 20%, 40%, 60%, 80% */}
        {[20, 40, 60, 80].map(tick => (
          <div
            key={tick}
            className="absolute inset-y-0 w-px bg-yellow-900/60"
            style={{ left: `${tick}%` }}
          />
        ))}
        {/* Percentage label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[9px] font-bold text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] tabular-nums">
            {pct}%
          </span>
        </div>
      </div>

      {/* Activate button — only rendered and clickable at exactly 100% */}
      <AnimatePresence>
        {isFull && (
          <motion.button
            key="ult-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.7, repeat: Infinity }}
            onClick={onActivate}
            disabled={disabled}
            data-testid="ultimate-button"
            className="bg-yellow-500 text-black border-2 border-white px-2 py-0.5 text-[9px] font-bold uppercase shadow-[0_0_16px_rgba(250,204,21,1)] cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            ⚡ ULTIMATE!
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
