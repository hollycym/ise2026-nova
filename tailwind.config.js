/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./example.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // Project NOVA 配色方案
        background: {
          DEFAULT: '#0A0A0A',
          dark: '#000000',
          light: '#1A1A1A',
        },
        nova: {
          // NOVA Green - 主要强调色（荧光绿）
          DEFAULT: '#b9ff36',
          light: '#33FFAA',
          dark: '#00CC6A',
          glow: '#00FF88',
        },
        crisis: {
          // Crisis Red - 警告色
          DEFAULT: '#FF0044',
          light: '#FF3366',
          dark: '#CC0033',
          glow: '#FF0044',
        },
        neon: {
          // Neon Blue - AI/语音/思考波形
          DEFAULT: '#00D9FF',
          light: '#33E5FF',
          dark: '#00B3CC',
          glow: '#00D9FF',
        },
        structure: {
          // Purple - 架构图
          DEFAULT: '#9D4EDD',
          light: '#B77AE8',
          dark: '#7B2CBF',
          glow: '#9D4EDD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // 发光边框效果
        'glow-nova': '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)',
        'glow-crisis': '0 0 10px rgba(255, 0, 68, 0.5), 0 0 20px rgba(255, 0, 68, 0.3), inset 0 0 10px rgba(255, 0, 68, 0.1)',
        'glow-neon': '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 10px rgba(0, 217, 255, 0.1)',
        'glow-structure': '0 0 10px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157, 78, 221, 0.3), inset 0 0 10px rgba(157, 78, 221, 0.1)',
        'glow-subtle': '0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        'glow-nova': 'rgba(0, 255, 136, 0.3)',
        'glow-crisis': 'rgba(255, 0, 68, 0.3)',
        'glow-neon': 'rgba(0, 217, 255, 0.3)',
        'glow-structure': 'rgba(157, 78, 221, 0.3)',
        'glow-subtle': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glow-pulse-nova': 'glow-pulse-nova 2s ease-in-out infinite',
        'glow-pulse-crisis': 'glow-pulse-crisis 2s ease-in-out infinite',
        'glow-pulse-neon': 'glow-pulse-neon 2s ease-in-out infinite',
        'glow-pulse-structure': 'glow-pulse-structure 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.05)',
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
          },
        },
        'glow-pulse-nova': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(0, 255, 136, 0.7), 0 0 30px rgba(0, 255, 136, 0.5)',
          },
        },
        'glow-pulse-crisis': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(255, 0, 68, 0.5), 0 0 20px rgba(255, 0, 68, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(255, 0, 68, 0.7), 0 0 30px rgba(255, 0, 68, 0.5)',
          },
        },
        'glow-pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(0, 217, 255, 0.7), 0 0 30px rgba(0, 217, 255, 0.5)',
          },
        },
        'glow-pulse-structure': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157, 78, 221, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(157, 78, 221, 0.7), 0 0 30px rgba(157, 78, 221, 0.5)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

