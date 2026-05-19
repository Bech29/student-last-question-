import { Link } from "wouter";
import { motion } from "framer-motion";

export default function TitleScreen() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(circle at center, transparent 0, #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)"
        }}
      />

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl text-primary font-bold mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter">
          STUDent
          <br />
          <span className="text-white text-5xl md:text-7xl">LAST</span>
          <br />
          <span className="text-accent">QUeSTiON</span>
        </h1>
        
        <p className="text-muted-foreground mt-8 mb-12 text-sm md:text-base max-w-md mx-auto leading-loose">
          Face the Final Boss... with your knowledge!
        </p>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Link href="/game" className="inline-block bg-primary text-primary-foreground border-4 border-white px-8 py-4 text-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase" data-testid="start-button">
            Start Game
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
