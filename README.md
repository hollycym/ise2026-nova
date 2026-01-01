# ISE 2025 - Project NOVA UI

## Tailwind CSS 配置说明

### 颜色系统

#### 背景色
- `bg-background` - 主要背景 (#0A0A0A)
- `bg-background-dark` - 深色背景 (#000000)
- `bg-background-light` - 浅色背景 (#1A1A1A)

#### 强调色
- **NOVA Green** (主要): `bg-nova`, `text-nova`, `border-nova`
  - 正常状态: `#00FF88`
  - 浅色: `bg-nova-light` (#33FFAA)
  - 深色: `bg-nova-dark` (#00CC6A)

- **Crisis Red** (警告): `bg-crisis`, `text-crisis`, `border-crisis`
  - 用于 Time Crisis 状态
  - 正常: `#FF0044`

- **Neon Blue** (AI): `bg-neon`, `text-neon`, `border-neon`
  - 用于语音/思考波形
  - 正常: `#00D9FF`

- **Structure Purple** (架构): `bg-structure`, `text-structure`, `border-structure`
  - 用于架构图
  - 正常: `#9D4EDD`

### 字体
- `font-sans` - Inter 字体（默认）
- `font-mono` - JetBrains Mono 等宽字体
- `font-display` - Inter 显示字体

### 发光效果

#### 卡片样式
- `.card-nova` - NOVA Green 发光卡片
- `.card-crisis` - Crisis Red 发光卡片
- `.card-neon` - Neon Blue 发光卡片
- `.card-structure` - Structure Purple 发光卡片

#### 阴影效果
- `shadow-glow-nova` - NOVA Green 发光阴影
- `shadow-glow-crisis` - Crisis Red 发光阴影
- `shadow-glow-neon` - Neon Blue 发光阴影
- `shadow-glow-structure` - Structure Purple 发光阴影
- `shadow-glow-subtle` - 细微发光阴影

#### 边框颜色
- `border-glow-nova` - NOVA Green 发光边框
- `border-glow-crisis` - Crisis Red 发光边框
- `border-glow-neon` - Neon Blue 发光边框
- `border-glow-structure` - Structure Purple 发光边框
- `border-glow-subtle` - 细微发光边框

#### 动画效果
- `animate-glow-pulse-nova` - NOVA Green 脉冲动画
- `animate-glow-pulse-crisis` - Crisis Red 脉冲动画
- `animate-glow-pulse-neon` - Neon Blue 脉冲动画
- `animate-glow-pulse-structure` - Structure Purple 脉冲动画

#### 文字发光
- `.text-glow-nova` - NOVA Green 文字发光
- `.text-glow-crisis` - Crisis Red 文字发光
- `.text-glow-neon` - Neon Blue 文字发光
- `.text-glow-structure` - Structure Purple 文字发光

### 按钮样式
- `.btn-nova` - NOVA Green 按钮
- `.btn-crisis` - Crisis Red 按钮

### 输入框样式
- `.input-nova` - NOVA Green 输入框

## 使用示例

```html
<!-- NOVA Green 卡片 -->
<div class="card-nova p-6">
  <h2 class="text-nova text-glow-nova">Project NOVA</h2>
  <p class="text-white">正常状态内容</p>
</div>

<!-- Crisis Red 卡片 -->
<div class="card-crisis p-6">
  <h2 class="text-crisis text-glow-crisis">Time Crisis</h2>
  <p class="text-white">警告状态内容</p>
</div>

<!-- Neon Blue 卡片 -->
<div class="card-neon p-6">
  <h2 class="text-neon text-glow-neon">AI Voice</h2>
  <p class="text-white">语音/思考波形</p>
</div>

<!-- Structure Purple 卡片 -->
<div class="card-structure p-6">
  <h2 class="text-structure text-glow-structure">Architecture</h2>
  <p class="text-white">架构图内容</p>
</div>
```

## 安装依赖

```bash
npm install -D tailwindcss postcss autoprefixer
```

## 构建

确保在你的主 CSS 文件中导入 `src/index.css`，然后运行构建命令。

