import { motion, AnimatePresence } from "framer-motion";

interface UltimateGaugeProps {
  gauge: number;      // 0–5
  maxGauge: number;   // always 5
  onActivate: () => void;
  disabled: boolean;
}

export function UltimateGauge({ gauge, maxGauge, onActivate, disabled }: UltimateGaugeProps) {
  const isFull = gauge >= maxGauge;
  const pct = Math.round((gauge / maxGauge) * 100);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-yellow-400 uppercase tracking-tight whitespace-nowrap">ULTIMATE</span>

      {/* 5-segment bar */}
      <div className="flex gap-1">
        {Array.from({ length: maxGauge }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              i < gauge
                ? {
                    backgroundColor: isFull
                      ? ["#facc15", "#f97316", "#facc15"]
                      : "#facc15",
                    boxShadow: isFull
                      ? ["0 0 6px #facc15", "0 0 14px #f97316", "0 0 6px #facc15"]
                      : "0 0 4px #facc15",
                  }
                : { backgroundColor: "#1f2937", boxShadow: "none" }
            }
            transition={{ duration: 0.9, repeat: isFull ? Infinity : 0 }}
            className="w-4 h-4 md:w-5 md:h-5 border-2 border-yellow-600"
          />
        ))}
      </div>

      {/* Percentage label */}
      <span className="text-[9px] text-yellow-300 w-8 text-right tabular-nums">{pct}%</span>

      {/* Activate button — only visible and enabled at 100% */}
      <AnimatePresence>
        {isFull && (
          <motion.button
            key="ult-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.7, repeat: Infinity }}
            onClick={onActivate}
            disabled={disabled}
            data-testid="ultimate-button"
            className="bg-yellow-500 text-black border-2 border-white px-2 py-0.5 text-[9px] font-bold uppercase shadow-[0_0_14px_rgba(250,204,21,0.9)] cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            ⚡ ULTIMATE!
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
