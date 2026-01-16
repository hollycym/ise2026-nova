import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MissionTime: React.FC = () => {
  // 設定倒數時間 (30秒)
  const [timeLeft, setTimeLeft] = useState(30.0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = timeLeft.toFixed(1);
  const [seconds, ms] = formattedTime.split('.');

  // ★ 關鍵邏輯：剩下 10 秒變色 ★
  const isUrgent = timeLeft <= 10;
  
  // 定義顏色變數 (綠色 vs 紅色)
  const colorState = {
    text: isUrgent ? 'text-red-500' : 'text-green-500',
    border: isUrgent ? 'border-red-500' : 'border-green-500/50',
    bg: isUrgent ? 'bg-red-900/20' : 'bg-green-900/20',
    stroke: isUrgent ? '#EF4444' : '#22C55E', // Hex colors for SVG
    shadow: isUrgent ? 'rgba(239,68,68,0.6)' : 'rgba(34,197,94,0.6)',
    statusText: isUrgent ? '⚠ TIME CRITICAL - WRAP UP!' : '● BRIEFING SESSION ACTIVE',
    subText: isUrgent ? 'text-red-400/70' : 'text-green-400/70'
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      
      {/* Background Grid (保持紅色調，維持戰情室基底氛圍) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Intelligence Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mb-8 border border-white/10 bg-black/80 backdrop-blur-md p-8 rounded-xl relative shadow-2xl z-10"
      >
        {/* Live Label */}
        <div className="absolute top-4 right-4 flex gap-2">
           <div className="text-xs font-mono text-red-500 border border-red-500/50 px-2 py-1 rounded bg-red-900/20 animate-pulse">
             ● LIVE WAR ROOM
           </div>
        </div>

        <div className="space-y-5 font-mono text-left">
          {/* Operation Title */}
          <div className="flex flex-col border-l-4 border-white/20 pl-4">
            <span className="text-xs text-gray-500 tracking-widest mb-1">OPERATION CODE</span>
            <span className="text-2xl text-white font-bold tracking-tight">
              PROJECT NOVA: OFFICIAL LAUNCH
            </span>
          </div>

          <div className="h-px w-full bg-white/10 my-2" />

          {/* Attendees & Mission */}
          <div className="space-y-2">
            <div className="flex items-start gap-4 text-gray-400 text-sm">
               <span className="font-bold min-w-[100px] text-white">ATTENDEES:</span>
               <span>All Departments (Cross-functional assembly)</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
               <span className="font-bold min-w-[100px] text-white">GOAL:</span>
               <span>Identify & Brief Your Role</span>
            </div>
          </div>
          
          {/* Status Alert (會變色！) */}
          <div className={`pt-4 mt-2 border-t border-dashed ${isUrgent ? 'border-red-500/30' : 'border-green-500/30'} flex items-center justify-between transition-colors duration-300`}>
            <span className={`${colorState.text} font-bold animate-pulse tracking-wider transition-colors duration-300`}>
              {colorState.statusText}
            </span>
            <span className={`text-xs font-mono border px-2 py-1 rounded transition-colors duration-300 ${colorState.text} ${colorState.border}`}>
              T-MINUS
            </span>
          </div>
        </div>
      </motion.div>

      {/* Countdown Timer Circle */}
      <div className="relative scale-90 sm:scale-100">
        <svg className="w-64 h-64 sm:w-80 sm:h-80 transform -rotate-90">
          {/* 底部軌道 */}
          <circle cx="50%" cy="50%" r="48%" stroke="#1a1a1a" strokeWidth="8" fill="transparent" />
          
          {/* 進度條 (會變色！) */}
          <motion.circle
            cx="50%" cy="50%" r="48%"
            stroke={colorState.stroke} 
            strokeWidth="8" 
            fill="transparent"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={0}
            strokeLinecap="round"
            initial={false}
            animate={{ 
              stroke: colorState.stroke,
              strokeDashoffset: 2 * Math.PI * 120 * (1 - timeLeft / 30)
            }}
            transition={{ duration: 0.1 }} // 平滑過渡
            style={{ filter: `drop-shadow(0 0 15px ${colorState.shadow})` }}
          />
        </svg>

        {/* 中央數字 (會變色！) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center font-mono font-bold transition-colors duration-300 ${colorState.text}`}>
          <span className="text-7xl sm:text-8xl tabular-nums tracking-tighter drop-shadow-lg">
            {seconds}<span className="text-3xl sm:text-4xl opacity-50">.{ms}</span>
          </span>
          <span className={`text-xs mt-2 tracking-[0.3em] transition-colors duration-300 ${colorState.subText}`}>
            TIME TO BRIEF
          </span>
        </div>
      </div>

    </div>
  );
};

export default MissionTime;