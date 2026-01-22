import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定義語音辨識介面 (因為 TypeScript 預設沒有這個)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MissionClarity: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [showRetention, setShowRetention] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 初始化語音辨識與鍵盤監聽
  useEffect(() => {
    // --- 1. 語音辨識設定 ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // 設定為英文

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        checkKeywords(currentTranscript);
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.error("Speech recognition failed to start", e);
      }
    } else {
      setTranscript("Browser does not support Speech API. Use Keyboard.");
    }

    // --- 2. 鍵盤監聽 (Wizard of Oz) ---
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      console.log('Key pressed:', key); // Debug 用

      if (key === 'a') triggerLayer('awareness');
      if (key === 's') triggerLayer('consideration');
      if (key === 'd') triggerLayer('conversion');
      if (key === 'f') setShowRetention(prev => !prev); // 切換 Retention Loop
    };

    window.addEventListener('keydown', handleKeyDown);

    // 清理函數
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 關鍵字檢查邏輯
  const checkKeywords = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('awareness')) triggerLayer('awareness');
    if (lowerText.includes('consideration')) triggerLayer('consideration');
    if (lowerText.includes('conversion')) triggerLayer('conversion');
    if (lowerText.includes('retention') || lowerText.includes('loop')) setShowRetention(true);
  };

  const triggerLayer = (layer: string) => {
    setActiveLayer(layer);
    // 3秒後自動取消高亮，讓體驗更自然
    setTimeout(() => setActiveLayer(null), 3000);
  };

  return (
    <div className="flex h-full gap-6 p-6">
      
      {/* 左側：即時逐字稿 (Live Transcript) */}
      <div className="w-1/3 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col relative shadow-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-mono text-gray-600">
              {isListening ? 'LIVE TRANSCRIPT' : 'MIC IDLE'}
            </span>
          </div>
          {isListening && <span className="text-xs text-red-500 animate-pulse">● REC</span>}
        </div>

        {/* Transcript Content */}
        <div className="flex-1 overflow-y-auto font-mono text-lg leading-relaxed space-y-4">
          {transcript ? (
            <p className="text-gray-700">
              {transcript.split(' ').map((word, i) => {
                const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
                const isKeyword = ['awareness', 'consideration', 'conversion', 'retention'].includes(lowerWord);
                return (
                  <span key={i} className={isKeyword ? "text-lime-600 font-bold transition-all duration-300" : ""}>
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <p>等待語音輸入...</p>
              <div className="text-sm border border-gray-300 rounded px-3 py-1 bg-gray-50">或使用鍵盤: A / S / D / F</div>
            </div>
          )}
        </div>
      </div>

      {/* 右側：視覺化區域 (AI Visualizer) */}
      <div className="w-2/3 bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center shadow-md">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
          <span className="text-xs text-gray-500 font-mono tracking-widest">AI VISUALIZER</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-700 mb-8 mt-4 tracking-tight">Marketing Funnel</h2>

        {/* 漏斗容器：使用 relative 定位 */}
        <div className="relative w-[600px] h-[400px] flex flex-col items-center justify-center gap-4">

          {/* 第一層：Awareness */}
          <motion.div
            initial={{ opacity: 0.3, y: -20 }}
            animate={{
              opacity: activeLayer === 'awareness' || activeLayer === 'all' ? 1 : 0.3,
              y: 0,
              borderColor: activeLayer === 'awareness' ? '#84CC16' : '#E5E7EB',
              backgroundColor: activeLayer === 'awareness' ? '#F7FEE7' : '#FFFFFF'
            }}
            className="w-[400px] h-[100px] border-2 rounded-2xl flex flex-col items-center justify-center bg-white z-10 shadow-sm"
          >
            <span className={`text-2xl font-bold ${activeLayer === 'awareness' ? 'text-lime-600' : 'text-gray-600'}`}>Awareness</span>
            <span className="text-sm text-gray-500">Top of Funnel</span>
          </motion.div>

          {/* 第二層：Consideration */}
          <motion.div
            initial={{ opacity: 0.3, y: -20 }}
            animate={{
              opacity: activeLayer === 'consideration' || activeLayer === 'all' ? 1 : 0.3,
              y: 0,
              borderColor: activeLayer === 'consideration' ? '#22D3EE' : '#E5E7EB',
              backgroundColor: activeLayer === 'consideration' ? '#ECFEFF' : '#FFFFFF'
            }}
            className="w-[300px] h-[100px] border-2 rounded-2xl flex flex-col items-center justify-center bg-white z-10 shadow-sm"
          >
            <span className={`text-2xl font-bold ${activeLayer === 'consideration' ? 'text-cyan-500' : 'text-gray-600'}`}>Consideration</span>
            <span className="text-sm text-gray-500">Middle of Funnel</span>
          </motion.div>

          {/* 第三層：Conversion */}
          <motion.div
            initial={{ opacity: 0.3, y: -20 }}
            animate={{
              opacity: activeLayer === 'conversion' || activeLayer === 'all' ? 1 : 0.3,
              y: 0,
              borderColor: activeLayer === 'conversion' ? '#3B82F6' : '#E5E7EB',
              backgroundColor: activeLayer === 'conversion' ? '#EFF6FF' : '#FFFFFF'
            }}
            className="w-[200px] h-[100px] border-2 rounded-2xl flex flex-col items-center justify-center bg-white z-10 shadow-sm"
          >
            <span className={`text-2xl font-bold ${activeLayer === 'conversion' ? 'text-blue-500' : 'text-gray-600'}`}>Conversion</span>
            <span className="text-sm text-gray-500">Bottom of Funnel</span>
          </motion.div>

          {/* Retention Loop 箭頭 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
            {/* 回馬槍箭頭路徑 */}
            <motion.path
              d="M 330 350 C 500 350, 500 200, 380 200"
              fill="transparent"
              stroke="#84CC16"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={showRetention ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* 箭頭尖端 */}
            <motion.path
              d="M 390 190 L 370 200 L 390 210"
              fill="transparent"
              stroke="#84CC16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={showRetention ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.2 }}
            />

            {/* Retention Loop 文字標籤 */}
            {showRetention && (
              <foreignObject x="420" y="250" width="200" height="100">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lime-600 font-bold text-lg bg-white px-3 py-1 rounded border-2 border-lime-400 shadow-md"
                >
                  RETENTION LOOP
                  <div className="text-xs text-lime-500 font-normal">Customer Return</div>
                </motion.div>
              </foreignObject>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MissionClarity;
