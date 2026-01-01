import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  text: string
  color: 'green' | 'white' | 'blue'
  delay: number
  triggerCard?: boolean // 標記是否觸發卡片彈出
}

const MissionVibe = () => {
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ text: string; color: Message['color']; isComplete: boolean }>>([])
  const [showCursor, setShowCursor] = useState(true)
  const [showQuestionCard, setShowQuestionCard] = useState(false)

  const messages: Message[] = [
    { text: '> [SYSTEM] SYNCING MICROSOFT 365 CONTEXT...', color: 'green', delay: 0 },
    { text: '> [IDENTIFIED] 8 REMOTE UNITS via Outlook.', color: 'white', delay: 2000 },
    { text: '> [OPTIMIZING] INITIATING TEAM SYNERGY PROTOCOL...', color: 'blue', delay: 4000 },
    { text: '> [READY] DEPLOYING MISSION CARD.', color: 'green', delay: 6000, triggerCard: true },
  ]

  useEffect(() => {
    // 游標閃爍效果
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    // 重置並開始打字機效果
    setDisplayedMessages([])
    setShowQuestionCard(false)
    
    messages.forEach((message, index) => {
      const startDelay = message.delay
      const typeSpeed = 30 // 每個字元的打字速度 (ms)
      
      // 等待到該訊息的開始時間
      setTimeout(() => {
        // 添加新訊息（初始為空）
        setDisplayedMessages((prev) => [...prev, { text: '', color: message.color, isComplete: false }])
        
        // 逐字顯示
        const fullText = message.text
        for (let i = 0; i < fullText.length; i++) {
          setTimeout(() => {
            setDisplayedMessages((prev) => {
              const newMessages = [...prev]
              const messageIndex = index
              if (newMessages[messageIndex]) {
                const isComplete = i + 1 === fullText.length
                newMessages[messageIndex] = {
                  ...newMessages[messageIndex],
                  text: fullText.slice(0, i + 1),
                  isComplete: isComplete,
                }
                
                // 如果這條訊息完成且需要觸發卡片，則顯示卡片
                if (isComplete && message.triggerCard) {
                  setTimeout(() => {
                    setShowQuestionCard(true)
                  }, 500) // 延遲 500ms 後顯示卡片
                }
              }
              return newMessages
            })
          }, i * typeSpeed)
        }
      }, startDelay)
    })
  }, [])

  const getColorClass = (color: Message['color']) => {
    switch (color) {
      case 'green':
        return 'text-nova text-glow-nova'
      case 'white':
        return 'text-white'
      case 'blue':
        return 'text-neon text-glow-neon'
      default:
        return 'text-white'
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* 終端機視窗 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-black/60 backdrop-blur-md border border-glow-subtle rounded-lg shadow-2xl p-6 font-mono">
          {/* 終端機標題列 */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-glow-subtle">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-crisis"></div>
              <div className="w-3 h-3 rounded-full bg-nova"></div>
              <div className="w-3 h-3 rounded-full bg-neon"></div>
            </div>
            <span className="text-white/60 text-sm ml-4">PROJECT NOVA - TERMINAL</span>
          </div>

          {/* 終端機內容 */}
          <div className="space-y-2 min-h-[400px]">
            {displayedMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={getColorClass(msg.color)}
              >
                {msg.text}
                {index === displayedMessages.length - 1 && !msg.isComplete && showCursor && (
                  <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse"></span>
                )}
              </motion.div>
            ))}
            
            {/* 如果所有訊息都顯示完，顯示持續閃爍的游標 */}
            {displayedMessages.length > 0 && 
             displayedMessages[displayedMessages.length - 1]?.isComplete && 
             !showQuestionCard &&
             showCursor && (
              <span className="inline-block w-2 h-5 bg-nova ml-1 animate-pulse"></span>
            )}
          </div>
        </div>
      </motion.div>

      {/* 問題卡片 - 置中懸浮 */}
      <AnimatePresence>
        {showQuestionCard && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowQuestionCard(false)}
            />
            
            {/* 問題卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                mass: 0.8,
              }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={() => setShowQuestionCard(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-black/80 backdrop-blur-xl border-2 border-nova rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 發光邊框效果 */}
                <div className="absolute inset-0 rounded-2xl border-2 border-nova shadow-glow-nova pointer-events-none" />
                
                {/* 內容 */}
                <div className="relative z-10">
                  {/* 小標題 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-nova text-sm font-mono font-semibold mb-4 text-glow-nova tracking-wider"
                  >
                    MISSION: ICE BREAKER
                  </motion.div>
                  
                  {/* 大標題（問題） */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
                  >
                    "In the event of a crisis, what is your{' '}
                    <span className="text-nova text-glow-nova">'Hidden Superpower'</span>
                    {' '}to save the day?"
                  </motion.h2>
                  
                  {/* 關閉提示 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/50 text-sm text-center mt-6"
                  >
                    點擊任意處關閉
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MissionVibe

