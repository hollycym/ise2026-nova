import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionTime from './components/MissionTime'
import MissionVibe from './components/MissionVibe'
import MissionClarity from './components/MissionClarity'
import MissionDecision from './components/MissionDecision'

type ScenarioPhase = 'IDLE' | 'BRIEFING' | 'VIBE' | 'CLARITY' | 'DECISION'

// 階段順序（用於 Space 鍵依序切換）
const PHASE_ORDER: ScenarioPhase[] = ['IDLE', 'BRIEFING', 'VIBE', 'CLARITY', 'DECISION']

// AI 洞察與會議結論映射（根據結束的階段產生智慧分析）
const getPhaseLogMessage = (phase: ScenarioPhase): string => {
  switch (phase) {
    case 'BRIEFING':
      return '✅ TIMEBOX ENFORCED. Speaker identity verified.'
    case 'VIBE':
      return '🧠 SENTIMENT ANALYSIS: Detected concern regarding \'Legacy Code\'.'
    case 'CLARITY':
      return '🔍 ROOT CAUSE IDENTIFIED: Technical Debt in core modules.'
    case 'DECISION':
      return '🚀 STRATEGY LOCKED: Approval granted for full refactoring.'
    case 'IDLE':
      return '🔄 SESSION RESET'
    default:
      return '✅ PHASE COMPLETED'
  }
}

function App() {
  const [scenarioPhase, setScenarioPhase] = useState<ScenarioPhase>('IDLE')
  const [logs, setLogs] = useState<string[]>([])
  const previousPhaseRef = useRef<ScenarioPhase>('IDLE')
  
  // 狀態文字映射 (可根據階段動態變化)
  const getStatusText = (phase: ScenarioPhase): string => {
    switch (phase) {
      case 'IDLE':
        return 'SYSTEM STANDBY'
      case 'BRIEFING':
        return 'MONITORING CONTEXT...'
      case 'VIBE':
        return 'ANALYZING SENTIMENT...'
      case 'CLARITY':
        return 'PROCESSING INSIGHTS...'
      case 'DECISION':
        return 'SYNTHESIZING OPTIONS...'
      default:
        return 'SYSTEM ACTIVE'
    }
  }


  // 階段切換處理函數（包含 log 記錄）
  const handlePhaseChange = (newPhase: ScenarioPhase) => {
    const previousPhase = previousPhaseRef.current
    
    // 如果不是從 IDLE 開始，且階段有變化，記錄 log
    if (previousPhase !== 'IDLE' && previousPhase !== newPhase) {
      const logMessage = getPhaseLogMessage(previousPhase)
      setLogs((prevLogs) => [...prevLogs, logMessage])
    }
    
    // 如果切換到 IDLE，記錄 reset
    if (newPhase === 'IDLE' && previousPhase !== 'IDLE') {
      setLogs((prevLogs) => [...prevLogs, '🔄 SESSION RESET'])
    }
    
    previousPhaseRef.current = newPhase
    setScenarioPhase(newPhase)
  }

  // 鍵盤事件處理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 防止在輸入框中觸發
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (event.key) {
        case '0':
        case 'Escape':
          handlePhaseChange('IDLE')
          break
        case '1':
          handlePhaseChange('BRIEFING')
          break
        case '2':
          handlePhaseChange('VIBE')
          break
        case '3':
          handlePhaseChange('CLARITY')
          break
        case '4':
          handlePhaseChange('DECISION')
          break
        case ' ':
          // Space 鍵：依序切換到下一個階段
          event.preventDefault() // 防止頁面滾動
          const currentIndex = PHASE_ORDER.indexOf(scenarioPhase)
          const nextIndex = (currentIndex + 1) % PHASE_ORDER.length
          handlePhaseChange(PHASE_ORDER[nextIndex])
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [scenarioPhase])

  // 待機封面元件 - 現代極簡亮白風格
  const IdleCover = () => {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl">
          {/* 主標題 */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold font-sans text-gray-900 mb-8 tracking-tight"
          >
            AI MEETING COACH
          </motion.h1>

          {/* 簡約的萊姆綠色動態圓點 */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-12 flex items-center justify-center">
            <motion.div
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-lime-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-lime-300"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
            <div className="absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-lime-500" />
          </div>

          {/* 副標題 */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 font-sans text-base sm:text-lg mb-8 text-center font-medium"
          >
            Awaiting Meeting Context Initialization...
          </motion.h2>

          {/* 操作提示 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-500 font-mono text-xs sm:text-sm tracking-wider uppercase text-center border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm"
          >
            PRESS 1-4 OR SPACE TO INITIATE
          </motion.p>
        </div>
      </div>
    )
  }

  // 渲染對應的 Mission 元件
  const renderMissionComponent = () => {
    switch (scenarioPhase) {
      case 'IDLE':
        return <IdleCover />
      case 'BRIEFING':
        return <MissionTime />
      case 'VIBE':
        return <MissionVibe />
      case 'CLARITY':
        return <MissionClarity />
      case 'DECISION':
        return <MissionDecision />
      default:
        return <IdleCover />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* 頂部狀態列 - 現代極簡風格 */}
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 relative shadow-sm"
      >
        {/* 左側：NOVA SYSTEM 狀態 */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-sans text-sm font-medium">
            NOVA SYSTEM:
          </span>
          <div className="flex items-center gap-2">
            {/* 呼吸燈指示器 */}
            <motion.div
              className="w-2 h-2 rounded-full bg-lime-400"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="font-sans text-sm font-semibold text-gray-900">
              ACTIVE
            </span>
          </div>
        </div>

        {/* 右側：動態狀態文字 */}
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={scenarioPhase}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 font-mono text-xs tracking-wider uppercase"
            >
              {getStatusText(scenarioPhase)}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 主內容區域：左右兩欄佈局 */}
      <div className="flex-1 flex relative z-0 gap-6 p-6">
        {/* 左側：主舞台 (75%) - 白底卡片 */}
        <div className="flex-[3] relative overflow-hidden rounded-3xl bg-white shadow-md border border-gray-100 flex flex-col">
          {/* Mission 元件區域 */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={scenarioPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {renderMissionComponent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 即時雙向翻譯字幕區 - 只在非 IDLE 狀態顯示 */}
          {scenarioPhase !== 'IDLE' && (
            <div className="px-6 pb-6 pt-4 space-y-3 border-t border-gray-100">
              {/* Speaker A / 原文 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-full shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
              >
                {/* 語言代碼圓形標籤 */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-700">EN</span>
                </div>
                
                {/* 文字內容 */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-gray-900 text-sm font-medium">
                    We need to address the legacy code issues immediately.
                  </span>
                  {/* 錄音中指示器 */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-red-500"
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>

              {/* AI Translator / 譯文 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-full shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
              >
                {/* AI 圖示圓形標籤 - 萊姆綠背景 */}
                <div className="w-10 h-10 rounded-full bg-lime-100 border-2 border-lime-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-lime-700">AI</span>
                </div>
                
                {/* 文字內容 */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-gray-800 text-sm font-medium">
                    我們需要立即解決舊有程式碼的問題。
                  </span>
                  {/* 波形動畫指示器 */}
                  <div className="flex items-center gap-1 h-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-lime-400 rounded-full"
                        animate={{
                          height: [4, 12, 4],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* 右側：Context Log 側邊欄 (25%) - 白底卡片 */}
        <div className="flex-[1] bg-white border border-gray-100 rounded-3xl flex flex-col overflow-hidden shadow-md">
          {/* 標題 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-gray-900 font-sans text-sm font-semibold tracking-wide uppercase">
              MEMORY BANK
            </h2>
            <p className="text-gray-500 font-sans text-xs mt-1">
              SESSION CONTEXT
            </p>
          </div>

          {/* Log 列表 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {logs.length === 0 ? (
              <div className="text-gray-400 font-sans text-xs italic py-8 text-center">
                No logs yet...
              </div>
            ) : (
              <AnimatePresence>
                {logs.map((log, index) => {
                  const isLatest = index === logs.length - 1
                  return (
        <motion.div
                      key={`${log}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`font-sans text-xs py-2 px-3 rounded-lg transition-all duration-300 ${
                        isLatest
                          ? 'bg-lime-50 border-l-4 border-lime-400 text-gray-900'
                          : 'text-gray-600 bg-transparent border-l-4 border-gray-200'
                      }`}
                    >
                      <span className={`mr-2 ${isLatest ? 'text-lime-600' : 'text-gray-400'}`}>&gt;</span>
                      <span className={isLatest ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                        {log}
                      </span>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </div>

          {/* 底部提示 */}
          <div className="px-4 py-3 border-t border-gray-200">
            <p className="text-gray-400 font-mono text-[10px] tracking-wider uppercase">
              Press 0-4 or Space to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
