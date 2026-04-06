# Trackify · 资产追踪

一款精致的个人资产管理 Web App，帮助你记录每一笔投入，并实时计算「每日成本」。
支持社交分享卡片生成，让你把使用性价比分享到朋友圈和小红书。

## ✨ 功能亮点

| 功能 | 说明 |
|------|------|
| **资产总值概览** | 顶部绿色卡片实时统计全部资产价值 |
| **每日成本计算** | 自动折算 `购入价格 ÷ 使用天数`，一眼看清性价比 |
| **新增 / 编辑 / 删除** | 完整 CRUD，底部弹出 iOS Sheet 风格表单 |
| **资产状态管理** | 使用中 · 闲置中 · 已卖出，iOS 分段控件切换 |
| **社交分享卡片** | 一键生成精美 PNG 图片，可直接下载分享 |
| **移动端优先** | 纵向卡片布局、响应式双列、触控友好 |

## 🛠 技术栈

- **前端**：React 18 + Vite
- **样式**：Tailwind CSS v3 + Lucide React 图标
- **后端**：Supabase（PostgreSQL + REST API）
- **分享**：html2canvas 截图生成
- **部署**：Vercel

## 📁 项目结构

```
src/
├── supabase.js                  # Supabase client
├── main.jsx                     # 入口
├── App.jsx                      # 主页（状态管理 + 布局）
└── components/
    ├── AssetCard.jsx             # 资产卡片（纵向布局 + 每日成本）
    ├── AssetFormModal.jsx        # 新增 / 编辑弹窗（iOS Sheet）
    ├── ShareCard.jsx             # 分享卡片 DOM（html2canvas 目标）
    └── ShareModal.jsx            # 分享预览 + 下载
```

## 🚀 快速开始

### 1. 克隆 & 安装

```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 建表（Supabase SQL Editor）

```sql
CREATE TABLE assets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric not null,
  start_date date not null,
  image_url text,
  status text default 'using'
);
```

### 3. 配置环境变量

在项目根目录创建 `.env.local`：

```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的AnonKey
```

> Supabase 控制台 → Project Settings → API 获取。

### 4. 启动

```bash
npm run dev
```

访问 `http://localhost:5173`

## 📦 部署到 Vercel

```bash
git push -u origin main
```

1. 进入 [Vercel](https://vercel.com/) → **Add New → Project** → 导入此仓库
2. 在 **Environment Variables** 中填入 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
3. 点击 **Deploy**，完成 🎉

## 📝 版本历史

| 版本 | 更新内容 |
|------|---------|
| V1 | 基础资产列表 + Supabase 连接 |
| V2 | 浮动添加按钮、使用天数显示、移动端响应式 |
| V3 | 资产编辑 / 删除、状态管理、社交分享卡片 |
| V3.0.1 | 移动端 UI 重构：纵向卡片、iOS Sheet 弹窗、分段状态控件 |
