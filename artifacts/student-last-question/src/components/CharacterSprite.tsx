import { motion } from "framer-motion";

interface CharacterSpriteProps {
  type: "player" | "enemy";
  isHit: boolean;
}

export function CharacterSprite({ type, isHit }: CharacterSpriteProps) {
  const isPlayer = type === "player";
  
  // A simple blocky character built with SVGs to simulate pixel art
  const playerSvg = (
    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Body */}
      <rect x="5" y="8" width="6" height="5" fill="#4a90e2" />
      {/* Head */}
      <rect x="4" y="2" width="8" height="6" fill="#f5d0b5" />
      {/* Hair */}
      <rect x="3" y="1" width="10" height="3" fill="#333" />
      <rect x="4" y="1" width="2" height="4" fill="#333" />
      <rect x="10" y="1" width="2" height="4" fill="#333" />
      {/* Eyes */}
      <rect x="6" y="5" width="1" height="1" fill="#000" />
      <rect x="9" y="5" width="1" height="1" fill="#000" />
      {/* Backpack straps */}
      <rect x="5" y="8" width="1" height="5" fill="#8b4513" />
      <rect x="10" y="8" width="1" height="5" fill="#8b4513" />
      {/* Legs */}
      <rect x="5" y="13" width="2" height="3" fill="#333" />
      <rect x="9" y="13" width="2" height="3" fill="#333" />
    </svg>
  );

  const enemySvg = (
    <svg viewBox="0 0 20 20" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Robe/Body */}
      <rect x="4" y="6" width="12" height="10" fill="#2c003e" />
      {/* Head */}
      <rect x="6" y="1" width="8" height="6" fill="#f5d0b5" />
      {/* Glasses */}
      <rect x="5" y="3" width="10" height="2" fill="#fff" fillOpacity="0.5" />
      <rect x="5" y="3" width="10" height="2" stroke="#000" strokeWidth="0.5" fill="none" />
      {/* Mustache */}
      <rect x="7" y="5" width="6" height="1" fill="#bbb" />
      {/* Arms crossed */}
      <rect x="3" y="8" width="14" height="2" fill="#4a0066" />
      {/* Floating base */}
      <rect x="6" y="16" width="8" height="2" fill="#111" />
      {/* Red Eyes behind glasses */}
      <rect x="7" y="4" width="1" height="1" fill="#f00" />
      <rect x="12" y="4" width="1" height="1" fill="#f00" />
    </svg>
  );

  return (
    <motion.div
      className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      animate={
        isHit
          ? { x: [-10, 10, -10, 10, 0], filter: ["brightness(2) sepia(1)", "brightness(1) sepia(0)"] }
          : { y: isPlayer ? [0, -5, 0] : [0, -10, 0] }
      }
      transition={
        isHit
          ? { duration: 0.4 }
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {isPlayer ? playerSvg : enemySvg}
    </motion.div>
  );
}
