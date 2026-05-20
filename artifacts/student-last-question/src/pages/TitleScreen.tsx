import { useLocation } from "wouter";
import { motion } from "framer-motion";
import bg1 from "@assets/bg1_1779248796845.png";

export default function TitleScreen() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src={bg1}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          animate={{ textShadow: ["0 0 20px #a855f7", "0 0 40px #06b6d4", "0 0 20px #a855f7"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl md:text-5xl text-primary font-bold mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter leading-loose"
        >
          STUDENT
        </motion.h1>
        <motion.h1
          animate={{ textShadow: ["0 0 20px #ffffff", "0 0 50px #ffffff", "0 0 20px #ffffff"] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className="text-4xl md:text-6xl text-white font-bold mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter leading-loose"
        >
          LAST
        </motion.h1>
        <motion.h1
          animate={{ textShadow: ["0 0 20px #06b6d4", "0 0 40px #a855f7", "0 0 20px #06b6d4"] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="text-3xl md:text-5xl text-accent font-bold mb-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter leading-loose"
        >
          QUESTION
        </motion.h1>

        <p className="text-muted-foreground mt-2 mb-10 text-xs md:text-sm max-w-xs mx-auto leading-loose">
          เผชิญหน้าบอสสุดท้าย... ด้วยความรู้ของคุณ!
        </p>

        <motion.button
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => setLocation("/select")}
          data-testid="start-button"
          className="bg-primary text-primary-foreground border-4 border-white px-10 py-4 text-base hover:bg-accent hover:text-accent-foreground transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase cursor-pointer"
        >
          เริ่มเกม
        </motion.button>
      </motion.div>
    </div>
  );
}
