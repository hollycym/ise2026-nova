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
  
  // 定義顏色變數 (萊姆綠 vs 紅色)
  const colorState = {
    text: isUrgent ? 'text-red-500' : 'text-lime-500',
    border: isUrgent ? 'border-red-500' : 'border-lime-500',
    bg: isUrgent ? 'bg-red-50' : 'bg-lime-50',
    stroke: isUrgent ? '#EF4444' : '#84CC16', // Hex colors for SVG
    statusText: isUrgent ? '⚠ TIME CRITICAL - WRAP UP!' : '● BRIEFING SESSION ACTIVE',
    subText: isUrgent ? 'text-red-400' : 'text-lime-600'
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {/* Intelligence Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mb-8 border border-gray-200 bg-white p-8 rounded-3xl relative shadow-md z-10"
      >
        {/* Live Label */}
        <div className="absolute top-4 right-4 flex gap-2">
           <div className={`text-xs font-mono border px-2 py-1 rounded ${isUrgent ? 'text-red-500 border-red-500 bg-red-50' : 'text-lime-500 border-lime-500 bg-lime-50'}`}>
             ● LIVE
           </div>
        </div>

        <div className="space-y-5 font-sans text-left">
          {/* Operation Title */}
          <div className="flex flex-col border-l-4 border-gray-300 pl-4">
            <span className="text-xs text-gray-500 tracking-wider mb-1 uppercase">OPERATION CODE</span>
            <span className="text-2xl text-gray-900 font-bold tracking-tight">
              PROJECT NOVA: OFFICIAL LAUNCH
            </span>
          </div>

          <div className="h-px w-full bg-gray-200 my-2" />

          {/* Attendees & Mission */}
          <div className="space-y-2">
            <div className="flex items-start gap-4 text-gray-600 text-sm">
               <span className="font-semibold min-w-[100px] text-gray-900">ATTENDEES:</span>
               <span>All Departments (Cross-functional assembly)</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
               <span className="font-semibold min-w-[100px] text-gray-900">GOAL:</span>
               <span>Identify & Brief Your Role</span>
            </div>
          </div>
          
          {/* Status Alert (會變色！) */}
          <div className={`pt-4 mt-2 border-t border-dashed ${isUrgent ? 'border-red-300' : 'border-lime-300'} flex items-center justify-between transition-colors duration-300`}>
            <span className={`${colorState.text} font-bold tracking-wider transition-colors duration-300`}>
              {colorState.statusText}
            </span>
            <span className={`text-xs font-mono border px-2 py-1 rounded transition-colors duration-300 ${colorState.text} ${colorState.border} ${colorState.bg}`}>
              T-MINUS
            </span>
          </div>
        </div>
      </motion.div>

      {/* Countdown Timer Circle */}
      <div className="relative scale-90 sm:scale-100">
        <svg className="w-64 h-64 sm:w-80 sm:h-80 transform -rotate-90">
          {/* 底部軌道 */}
          <circle cx="50%" cy="50%" r="48%" stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
          
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
            transition={{ duration: 0.1 }}
          />
        </svg>

        {/* 中央數字 (會變色！) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center font-mono font-bold transition-colors duration-300 ${colorState.text}`}>
          <span className="text-7xl sm:text-8xl tabular-nums tracking-tighter text-gray-900">
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
