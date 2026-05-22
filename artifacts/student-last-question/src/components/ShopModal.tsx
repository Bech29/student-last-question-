import { motion } from "framer-motion";

const MAX_INVENTORY = 5;

interface ShopModalProps {
  coins: number;
  playerHP: number;
  maxHP: number;
  potionCount: number;
  buffCount: number;
  shieldActive: boolean;
  onBuy: (item: string) => void;
  onClose: () => void;
  stageCleared: number;
}

export function ShopModal({
  coins, playerHP, maxHP,
  potionCount, buffCount, shieldActive,
  onBuy, onClose, stageCleared,
}: ShopModalProps) {
  const items = [
    {
      id: "potion",
      name: "ยาฟื้นฟู HP",
      desc: "ฟื้นคืน HP +30 ทันที",
      cost: 30,
      icon: "+",
      color: "border-green-400 bg-green-900/60",
      count: potionCount,
      disabledReason: potionCount >= MAX_INVENTORY
        ? "ครบ 5 ชิ้นแล้ว"
        : playerHP >= maxHP
        ? "HP เต็มแล้ว"
        : null,
    },
    {
      id: "buff",
      name: "พลังโจมตี",
      desc: "คำถามถัดไปที่ถูกต้องจะโจมตี 2 เท่า (+20 ต่อชาร์จ)",
      cost: 25,
      icon: "↑",
      color: "border-orange-400 bg-orange-900/60",
      count: buffCount,
      disabledReason: buffCount >= MAX_INVENTORY ? "ครบ 5 ชิ้นแล้ว" : null,
    },
    {
      id: "shield",
      name: "โล่ป้องกัน",
      desc: "บล็อกความเสียหายจากคำถามผิดครั้งถัดไป",
      cost: 40,
      icon: "◈",
      color: "border-blue-400 bg-blue-900/60",
      count: shieldActive ? 1 : 0,
      disabledReason: shieldActive ? "มีผลอยู่แล้ว" : null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <motion.div
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 40 }}
        className="w-full max-w-md mx-4 border-4 border-yellow-400 bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-sm text-yellow-400 leading-loose">ร้านค้า</h2>
          <div className="text-xs text-yellow-300 border-2 border-yellow-400 px-2 py-1">
            เหรียญ: {coins}
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mb-4 leading-loose">
          ผ่านด่านที่ {stageCleared} แล้ว! เตรียมตัวสำหรับด่านถัดไป
        </p>

        {/* Items */}
        <div className="flex flex-col gap-3 mb-4">
          {items.map(item => {
            const canAfford = coins >= item.cost;
            const isDisabled = !!item.disabledReason || !canAfford;
            return (
              <div
                key={item.id}
                className={`border-2 ${item.color} p-3 flex items-center justify-between gap-3 ${isDisabled ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl font-mono w-8 text-center text-white shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-white leading-loose">{item.name}</div>
                      {/* Inventory badge — only for potion and buff */}
                      {item.id !== "shield" && (
                        <div className="text-[9px] border border-white/50 text-white/80 px-1.5 py-0.5 shrink-0">
                          {item.count}/{MAX_INVENTORY}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-white/70 leading-loose">{item.desc}</div>
                    {item.disabledReason && (
                      <div className="text-[10px] text-yellow-300 leading-loose">{item.disabledReason}</div>
                    )}
                    {!canAfford && !item.disabledReason && (
                      <div className="text-[10px] text-red-400 leading-loose">เหรียญไม่พอ</div>
                    )}
                  </div>
                </div>
                <button
                  disabled={isDisabled}
                  onClick={() => onBuy(item.id)}
                  data-testid={`shop-buy-${item.id}`}
                  className="bg-yellow-500 text-black border-2 border-white px-3 py-1 text-[10px] uppercase shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-yellow-400 transition-colors"
                >
                  {item.cost}
                </button>
              </div>
            );
          })}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          data-testid="shop-continue"
          className="w-full bg-primary text-primary-foreground border-4 border-white py-3 text-sm uppercase hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          ออกจากร้านและต่อสู้ต่อ
        </button>
      </motion.div>
    </motion.div>
  );
}
