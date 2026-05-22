import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Subject, SUBJECT_LABELS } from "@/data/questions";
import bg1 from "@assets/bg1_1779248796845.png";

interface SubjectCard {
  id: Subject;
  icon: string;
  desc: string;
  color: string;
  borderColor: string;
}

const SUBJECTS: SubjectCard[] = [
  {
    id: "programming",
    icon: "</> ",
    desc: "ตัวแปร, OOP, อัลกอริทึม, ฐานข้อมูล",
    color: "from-purple-900/80 to-purple-700/60",
    borderColor: "border-purple-400",
  },
  {
    id: "electronics",
    icon: "~",
    desc: "วงจรไฟฟ้า, ส่วนประกอบ, กฎโอห์ม",
    color: "from-cyan-900/80 to-cyan-700/60",
    borderColor: "border-cyan-400",
  },
  {
    id: "mechanics",
    icon: "#",
    desc: "เครื่องยนต์, ระบบรถยนต์, การบำรุงรักษา",
    color: "from-orange-900/80 to-orange-700/60",
    borderColor: "border-orange-400",
  },
];

export default function SubjectSelectScreen() {
  const [, setLocation] = useLocation();
  const { setSelectedSubject } = useGame();

  const handleSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setLocation("/select");
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      <img src={bg1} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/72" />

      <div className="relative z-10 w-full max-w-4xl px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-2"
        >
          <h2 className="text-xl md:text-2xl text-accent leading-loose">เลือกวิชา</h2>
          <p className="text-xs text-muted-foreground leading-loose mt-1">
            ปวช. ปี 3 — ด่านยิ่งสูงคำถามยิ่งยาก
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {SUBJECTS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleSelect(s.id)}
              data-testid={`subject-${s.id}`}
              className={`bg-gradient-to-b ${s.color} border-4 ${s.borderColor} p-6 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all`}
            >
              <div className="text-4xl mb-3 font-mono text-white">{s.icon}</div>
              <div className="text-sm text-white mb-2 leading-loose">{SUBJECT_LABELS[s.id]}</div>
              <div className="text-[10px] text-white/70 leading-loose">{s.desc}</div>
              <div className="mt-4 bg-white/20 border-2 border-white/50 px-4 py-2 text-[10px] text-white uppercase">
                เลือก
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setLocation("/")}
          className="mt-6 mx-auto block text-muted-foreground text-xs hover:text-white transition-colors leading-loose"
          data-testid="back-to-title"
        >
          ย้อนกลับ
        </motion.button>
      </div>
    </div>
  );
}
