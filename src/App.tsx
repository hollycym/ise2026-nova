import MissionDecision from './components/MissionDecision';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionTime from './components/MissionTime'
import MissionVibe from './components/MissionVibe'
import MissionClarity from './components/MissionClarity'

type Mission = 'time' | 'vibe' | 'clarity' | 'decision'

function App() {
  const [activeMission, setActiveMission] = useState<Mission>('time')

  const missions = [
    { id: 'time' as Mission, label: 'Time', component: <MissionTime /> },
    { id: 'vibe' as Mission, label: 'Vibe', component: <MissionVibe /> },
    { id: 'clarity' as Mission, label: 'Clarity', component: <MissionClarity /> },
    { id: 'decision' as Mission, label: 'Decision', component: <MissionDecision /> },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 主要內容區域 */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMission}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {missions.find((m) => m.id === activeMission)?.component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部導覽列 (Dock) */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/80 backdrop-blur-lg border border-glow-subtle rounded-2xl px-6 py-4 shadow-2xl"
        >
          <div className="flex gap-4">
            {missions.map((mission) => (
              <motion.button
                key={mission.id}
                onClick={() => setActiveMission(mission.id)}
                className={`px-6 py-3 rounded-lg font-mono font-semibold text-sm transition-all ${
                  activeMission === mission.id
                    ? 'bg-nova text-background shadow-glow-nova border border-nova'
                    : 'bg-background-light/50 text-white/70 border border-glow-subtle hover:border-glow-nova hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mission.id === 'time' && '1. Time'}
                {mission.id === 'vibe' && '2. Vibe'}
                {mission.id === 'clarity' && '3. Clarity'}
                {mission.id === 'decision' && '4. Decision'}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// 佔位符組件
function Placeholder({ mission }: { mission: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card-nova p-12 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold text-nova mb-4 text-glow-nova">
          {mission}
        </h2>
        <p className="text-white/70">
          開發中...
        </p>
      </motion.div>
    </div>
  )
}

export default App
