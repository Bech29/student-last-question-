import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useGame, Character } from "@/context/GameContext";
import { useState } from "react";
import bg1 from "@assets/bg1_1779248796845.png";
import char1 from "@assets/Kim_Ki-Tae_1779248796708.png";
import char2 from "@assets/Jun-Gu_1779248796698.jpeg";
import char3 from "@assets/Lee_Ji-Hun_1779248796731.jpg";
import char4 from "@assets/Jong-Gun_1779248796687.jpg";

const CHARACTERS: Character[] = [
  { id: 1, name: "Kim Ki-Tae", thaiName: "คิม คี-แต", image: char1 },
  { id: 2, name: "Jun-Gu", thaiName: "จุน-กู", image: char2 },
  { id: 3, name: "Lee Ji-Hun", thaiName: "อี จี-ฮุน", image: char3 },
  { id: 4, name: "Jong-Gun", thaiName: "จง-กัน", image: char4 },
];

export default function CharacterSelectScreen() {
  const [, setLocation] = useLocation();
  const { setSelectedCharacter } = useGame();
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSelect = (char: Character) => {
    setSelectedCharacter(char);
    setLocation("/game");
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src={bg1}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center text-xl md:text-3xl text-accent mb-2 tracking-tight leading-loose"
        >
          เลือกตัวละคร
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mb-8 leading-loose"
        >
          เลือกนักสู้ของคุณ
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.12 }}
              onMouseEnter={() => setHovered(char.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(char)}
              data-testid={`character-select-${char.id}`}
              className="cursor-pointer border-4 border-white bg-card/80 flex flex-col items-center p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-accent hover:shadow-[6px_6px_0px_0px_rgba(6,182,212,0.8)] transition-all"
              style={{ transform: hovered === char.id ? "translateY(-8px)" : "translateY(0)" }}
            >
              <div className="w-full aspect-[3/4] overflow-hidden bg-black/40 mb-3">
                <img
                  src={char.image}
                  alt={char.thaiName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-accent text-xs text-center leading-loose">{char.thaiName}</p>
              <p className="text-muted-foreground text-[10px] text-center leading-loose">{char.name}</p>
              <motion.div
                animate={hovered === char.id ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="mt-2 bg-primary text-primary-foreground border-2 border-white px-3 py-1 text-[10px] uppercase"
              >
                เลือก
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setLocation("/")}
          data-testid="back-button"
          className="mt-8 mx-auto block text-muted-foreground text-xs hover:text-white transition-colors leading-loose"
        >
          ย้อนกลับ
        </motion.button>
      </div>
    </div>
  );
}
