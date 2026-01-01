import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定義卡片資料結構
type Card = {
  id: number;
  text: string;
  type: 'S' | 'W' | 'O' | 'T';
  initialX: number;
  initialY: number;
};

// 初始混沌數據
const initialCards: Card[] = [
  { id: 1, text: "Market Leader", type: 'S', initialX: -40, initialY: -30 },
  { id: 2, text: "High Latency", type: 'W', initialX: 50, initialY: 20 },
  { id: 3, text: "AI Integration", type: 'O', initialX: -20, initialY: 60 },
  { id: 4, text: "Price War", type: 'T', initialX: 60, initialY: -50 },
  { id: 5, text: "Strong Team", type: 'S', initialX: 30, initialY: 40 },
  { id: 6, text: "Legacy Code", type: 'W', initialX: -60, initialY: -20 },
  { id: 7, text: "Global Expansion", type: 'O', initialX: 10, initialY: -70 },
  { id: 8, text: "Data Privacy", type: 'T', initialX: -50, initialY: 50 },
];

const MissionDecision: React.FC = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  // 鍵盤監聽：按 Enter 觸發整理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') setIsOptimized(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden"
      onClick={() => setIsOptimized(true)} // 點擊畫面也能觸發
    >
      {/* 背景四象限 Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12 opacity-50 pointer-events-none">
        {/* Strengths (左上) */}
        <div className={`border-2 rounded-2xl flex items-start justify-start p-6 transition-all duration-1000 ${isOptimized ? 'border-green-500 bg-green-900/10 shadow-[0_0_50px_rgba(34,197,94,0.2)]' : 'border-white/10'}`}>
          <h3 className={`text-2xl font-bold tracking-widest ${isOptimized ? 'text-green-500' : 'text-gray-700'}`}>STRENGTHS</h3>
        </div>
        
        {/* Weaknesses (右上) */}
        <div className={`border-2 rounded-2xl flex items-start justify-end p-6 transition-all duration-1000 ${isOptimized ? 'border-orange-500 bg-orange-900/10 shadow-[0_0_50px_rgba(249,115,22,0.2)]' : 'border-white/10'}`}>
          <h3 className={`text-2xl font-bold tracking-widest ${isOptimized ? 'text-orange-500' : 'text-gray-700'}`}>WEAKNESSES</h3>
        </div>

        {/* Opportunities (左下) */}
        <div className={`border-2 rounded-2xl flex items-end justify-start p-6 transition-all duration-1000 ${isOptimized ? 'border-blue-500 bg-blue-900/10 shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'border-white/10'}`}>
          <h3 className={`text-2xl font-bold tracking-widest ${isOptimized ? 'text-blue-500' : 'text-gray-700'}`}>OPPORTUNITIES</h3>
        </div>

        {/* Threats (右下) */}
        <div className={`border-2 rounded-2xl flex items-end justify-end p-6 transition-all duration-1000 ${isOptimized ? 'border-red-500 bg-red-900/10 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 'border-white/10'}`}>
          <h3 className={`text-2xl font-bold tracking-widest ${isOptimized ? 'text-red-500' : 'text-gray-700'}`}>THREATS</h3>
        </div>
      </div>

      {/* 中央狀態文字 */}
      <div className="absolute z-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={isOptimized ? "opt" : "chaos"}
          className={`text-xl font-mono tracking-[0.2em] font-bold ${isOptimized ? 'text-green-400' : 'text-red-500 animate-pulse'}`}
        >
          {isOptimized ? '[ STATUS: STRATEGY OPTIMIZED ]' : '[ STATUS: CHAOS DETECTED ]'}
        </motion.div>
        {!isOptimized && <div className="text-xs text-gray-500 mt-2">Press ENTER to Organize</div>}
      </div>

      {/* 飄浮卡片層 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {initialCards.map((card) => {
          // 計算最終位置 (歸位到四個角落的中心點)
          // 這裡使用固定偏移量來模擬歸位
          let finalX = 0;
          let finalY = 0;
          let colorClass = "";

          switch (card.type) {
            case 'S': finalX = -300; finalY = -150; colorClass = "bg-green-500 text-black shadow-[0_0_20px_#22c55e]"; break; // 左上
            case 'W': finalX = 300; finalY = -150; colorClass = "bg-orange-500 text-black shadow-[0_0_20px_#f97316]"; break; // 右上
            case 'O': finalX = -300; finalY = 150; colorClass = "bg-blue-500 text-black shadow-[0_0_20px_#3b82f6]"; break; // 左下
            case 'T': finalX = 300; finalY = 150; colorClass = "bg-red-500 text-black shadow-[0_0_20px_#ef4444]"; break; // 右下
          }

          return (
            <motion.div
              key={card.id}
              layout // 開啟 Layout 動畫
              initial={{ x: card.initialX, y: card.initialY, scale: 0.8, opacity: 0 }}
              animate={isOptimized 
                ? { x: finalX + (card.id % 2 * 40), y: finalY + (card.id % 3 * 30), scale: 1, opacity: 1, rotate: 0 } // 歸位
                : { x: card.initialX, y: card.initialY, scale: 1, opacity: 0.8, rotate: [0, 5, -5, 0] } // 混沌飄浮
              }
              transition={isOptimized 
                ? { type: "spring", stiffness: 50, damping: 10, delay: card.id * 0.05 } // 飛入動畫
                : { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" } // 飄浮動畫
              }
              className={`absolute top-1/2 left-1/2 w-48 h-24 -ml-24 -mt-12 rounded-lg flex items-center justify-center font-bold text-lg backdrop-blur-md border border-white/20
                ${isOptimized ? colorClass : "bg-white/10 text-gray-300"}`}
            >
              {card.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionDecision;