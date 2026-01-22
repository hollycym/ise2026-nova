import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MissionVibe = () => {
  const [showInsight, setShowInsight] = useState(false)
  const [showQuestionCard, setShowQuestionCard] = useState(false)

  useEffect(() => {
    // 進入階段時立即顯示洞察卡片
    setShowInsight(true)
    
    // 3秒後顯示問題卡片
    const timer = setTimeout(() => {
      setShowQuestionCard(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      setShowInsight(false)
      setShowQuestionCard(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* AI 洞察卡片 - 瞬間呈現 */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white border-2 border-lime-400 rounded-3xl shadow-lg p-8 relative overflow-hidden">
              {/* 左上角 AI 標籤 */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs font-semibold text-lime-600">AI INSIGHT</span>
                </div>
              </div>

              {/* 洞察內容 */}
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sentiment Analysis Complete
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-gray-900">Detected tension</span> regarding legacy code maintenance challenges.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Team members expressed <span className="font-semibold text-gray-900">concern</span> about technical debt accumulation.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-gray-900">Positive engagement</span> observed when discussing refactoring strategies.
                    </p>
                  </div>
                </div>

                {/* 底部提示 */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Preparing ice breaker question...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
              onClick={() => setShowQuestionCard(false)}
            />
            
            {/* 問題卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
                className="bg-white border-2 border-lime-400 rounded-3xl p-8 max-w-2xl w-full shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 內容 */}
                <div className="relative z-10">
                  {/* 小標題 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lime-600 text-sm font-mono font-semibold mb-4 tracking-wider"
                  >
                    MISSION: ICE BREAKER
                  </motion.div>
                  
                  {/* 大標題（問題） */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
                  >
                    "In the event of a crisis, what is your{' '}
                    <span className="text-lime-600">'Hidden Superpower'</span>
                    {' '}to save the day?"
                  </motion.h2>
                  
                  {/* 關閉提示 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 text-sm text-center mt-6"
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
