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

  // 系統狀態 (用於決定綠色/紅色呼吸燈)
  const [isSystemActive, setIsSystemActive] = useState(true) // true = 綠色, false = 紅色

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

  // 待機封面元件 - AI Meeting Coach 核心待機介面
  const IdleCover = () => {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* 主標題 */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold font-mono text-nova text-glow-nova mb-12 tracking-wider uppercase"
            style={{
              textShadow: '0 0 20px rgba(185, 255, 54, 0.8), 0 0 40px rgba(185, 255, 54, 0.5)',
            }}
          >
            AI MEETING COACH : ONLINE
          </motion.h1>

          {/* AI 核心視覺元件 */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
              {/* 外層圓環 1 (最外) */}
              <motion.circle
                cx="128"
                cy="128"
                r="124"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="2"
                filter="url(#glow1)"
                style={{ transformOrigin: '128px 128px' }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />

              {/* 外層圓環 2 */}
              <motion.circle
                cx="128"
                cy="128"
                r="108"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2"
                filter="url(#glow2)"
                style={{ transformOrigin: '128px 128px' }}
                animate={{
                  rotate: -360,
                  scale: [1, 0.95, 1],
                }}
                transition={{
                  rotate: {
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />

              {/* 中層圓環 */}
              <motion.circle
                cx="128"
                cy="128"
                r="92"
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="2"
                filter="url(#glow3)"
                style={{ transformOrigin: '128px 128px' }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />

              {/* 內層圓環 */}
              <motion.circle
                cx="128"
                cy="128"
                r="76"
                fill="none"
                stroke="url(#gradient4)"
                strokeWidth="2"
                filter="url(#glow4)"
                style={{ transformOrigin: '128px 128px' }}
                animate={{
                  rotate: -360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />

              {/* SVG 漸層定義 */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14532d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#052e16" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14532d" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#b9ff36" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0.8" />
                </linearGradient>
                
                {/* 發光濾鏡 */}
                <filter id="glow1">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow3">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow4">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* 核心圓點 */}
            <motion.div
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, #22c55e, #14532d)',
                filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 1))',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* 內部發光粒子效果 */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8
              const radius = 48
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                  style={{
                    background: '#22c55e',
                    left: '50%',
                    top: '50%',
                    filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 1))',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.1,
                  }}
                />
              )
            })}
          </div>

          {/* 副標題 */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/60 font-mono text-sm sm:text-base tracking-wider mb-8 text-center"
          >
            Awaiting Meeting Context Initialization...
          </motion.h2>

          {/* 操作提示 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/40 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-center border border-glow-subtle/30 px-4 py-2 rounded"
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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* 掃描線紋理 (Scanlines) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`
        }}
      />

      {/* 頂部狀態列 (Top Bar) */}
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-16 bg-black/90 backdrop-blur-md border-b border-glow-subtle flex items-center justify-between px-6 z-10 relative"
      >
        {/* 左側：NOVA SYSTEM 狀態 */}
        <div className="flex items-center gap-3">
          <span className="text-white/90 font-mono text-sm tracking-wider">
            NOVA SYSTEM:
          </span>
          <div className="flex items-center gap-2">
            {/* 呼吸燈指示器 */}
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isSystemActive ? 'bg-nova' : 'bg-crisis'
              }`}
              animate={{
                opacity: [1, 0.3, 1],
                boxShadow: isSystemActive
                  ? [
                      '0 0 8px rgba(185, 255, 54, 0.8)',
                      '0 0 16px rgba(185, 255, 54, 0.4)',
                      '0 0 8px rgba(185, 255, 54, 0.8)',
                    ]
                  : [
                      '0 0 8px rgba(255, 0, 68, 0.8)',
                      '0 0 16px rgba(255, 0, 68, 0.4)',
                      '0 0 8px rgba(255, 0, 68, 0.8)',
                    ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span
              className={`font-mono text-sm font-semibold tracking-wider ${
                isSystemActive
                  ? 'text-nova text-glow-nova'
                  : 'text-crisis text-glow-crisis'
              }`}
            >
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
              className="text-white/70 font-mono text-xs tracking-[0.2em] uppercase"
            >
              {getStatusText(scenarioPhase)}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 主內容區域：左右兩欄佈局 */}
      <div className="flex-1 flex relative z-0">
        {/* 左側：主舞台 (75%) */}
        <div className="flex-[3] relative overflow-hidden">
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

        {/* 右側：Context Log 側邊欄 (25%) */}
        <div className="flex-[1] bg-black/40 border-l border-glow-subtle/50 flex flex-col overflow-hidden">
          {/* 標題 */}
          <div className="px-4 py-3 border-b border-glow-subtle/30">
            <h2 className="text-white/90 font-mono text-sm font-semibold tracking-wider uppercase">
              MEMORY BANK
            </h2>
            <p className="text-white/40 font-mono text-xs mt-1 tracking-wider">
              SESSION CONTEXT
            </p>
          </div>

          {/* Log 列表 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {logs.length === 0 ? (
              <div className="text-white/30 font-mono text-xs italic py-8 text-center">
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
                      className={`font-mono text-xs py-2 px-2 border-l-2 transition-all duration-300 ${
                        isLatest
                          ? 'border-nova/60 text-white/90 bg-nova/5'
                          : 'border-glow-subtle/30 text-white/50 bg-transparent'
                      }`}
                    >
                      <span className="text-nova/60 mr-2">&gt;</span>
                      <span className={isLatest ? 'text-white/90' : 'text-white/50'}>
                        {log}
                      </span>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </div>

          {/* 底部提示 */}
          <div className="px-4 py-3 border-t border-glow-subtle/30">
            <p className="text-white/30 font-mono text-[10px] tracking-wider uppercase">
              Press 0-4 or Space to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
