import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const MissionTime = () => {
  const [timeLeft, setTimeLeft] = useState(30.0)
  const [isCrisis, setIsCrisis] = useState(false)

  const size = 400
  const strokeWidth = 12
  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // 計算進度（從 30 到 0）
  const progress = useMotionValue(30.0)
  const offset = useTransform(progress, [30, 0], [0, circumference])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 0.1)
        
        // 更新進度值
        progress.set(newTime)
        
        return newTime
      })
    }, 100)

    return () => clearInterval(interval)
  }, [progress])

  // 根據時間更新危機狀態
  useEffect(() => {
    setIsCrisis(timeLeft <= 10)
  }, [timeLeft])

  // 決定顏色
  const color = isCrisis ? '#FF0044' : '#b9ff36'
  const glowColor = isCrisis ? 'rgba(255, 0, 68, 0.8)' : 'rgba(185, 255, 54, 0.8)'

  // 格式化時間顯示
  const formatTime = (time: number) => {
    return time.toFixed(1)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG 圓環進度條 */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* 背景圓環 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* 進度圓環 */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              filter: isCrisis 
                ? `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor})`
                : `drop-shadow(0 0 15px ${glowColor}) drop-shadow(0 0 30px ${glowColor})`,
            }}
            animate={{
              opacity: isCrisis ? [1, 0.5, 1] : 1,
            }}
            transition={{
              duration: isCrisis ? 0.3 : 2,
              repeat: isCrisis ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* 中央數字顯示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            animate={{
              scale: isCrisis ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: isCrisis ? 0.3 : 2,
              repeat: isCrisis ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className={`text-8xl font-mono font-bold ${
                isCrisis ? 'text-glow-crisis' : 'text-glow-nova'
              }`}
              style={{
                color: color,
                textShadow: isCrisis
                  ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`
                  : `0 0 15px ${glowColor}, 0 0 30px ${glowColor}`,
              }}
              animate={{
                opacity: isCrisis ? [1, 0.7, 1] : [1, 0.9, 1],
              }}
              transition={{
                duration: isCrisis ? 0.3 : 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {formatTime(timeLeft)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MissionTime

