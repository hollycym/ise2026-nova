#!/bin/bash

# 安装依赖（如果还没有安装）
if [ ! -d "node_modules" ]; then
  echo "正在安装依赖..."
  npm install
fi

# 构建 Tailwind CSS
echo "正在构建 CSS..."
npx tailwindcss -i ./src/index.css -o ./dist/output.css

# 启动本地服务器
echo "启动预览服务器..."
echo "请在浏览器中打开: http://localhost:3000/example.html"
npx serve . -p 3000

