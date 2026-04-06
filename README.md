# Trackify · 资产追踪

一款精致的个人资产管理 Web App，帮助你记录每一笔投入，并实时计算「每日成本」。
支持紧凑列表 / 卡片双视图切换，社交分享卡片一键生成。

## ✨ 功能亮点

| 功能 | 说明 |
|------|------|
| **资产总值概览** | 顶部绿色卡片实时统计 |
| **每日成本计算** | `购入价格 ÷ 使用天数`，一眼看清性价比 |
| **双视图切换** | 紧凑列表（高密度）/ 卡片模式（展示型） |
| **状态分组** | 使用中 · 闲置中 · 已卖出，折叠展开 |
| **完整 CRUD** | 新增 / 编辑 / 删除，iOS Sheet 风格弹窗 |
| **社交分享** | html2canvas 生成 PNG，下载即分享 |
| **移动端优先** | 紧凑布局，一屏 5+ 条资产 |

## 🛠 技术栈

- **前端**：React 18 + Vite
- **样式**：Tailwind CSS v3 + Lucide React
- **后端**：Supabase（PostgreSQL + REST API）
- **分享**：html2canvas
- **部署**：Vercel

## 📁 项目结构

```
src/
├── supabase.js                  # Supabase client
├── main.jsx                     # 入口
├── App.jsx                      # 主页（视图切换 + 状态分组）
└── components/
    ├── AssetCard.jsx             # 卡片模式
    ├── AssetListItem.jsx         # 紧凑列表模式
    ├── AssetFormModal.jsx        # 新增 / 编辑弹窗
    ├── ShareCard.jsx             # 分享卡片 DOM
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

## 📦 部署到 Vercel

```bash
git push -u origin main
```

1. [Vercel](https://vercel.com/) → **Add New → Project** → 导入仓库
2. **Environment Variables** 填入 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
3. **Deploy** 🎉

## 📝 版本历史

| 版本 | 内容 |
|------|------|
| v0.0.1 | 基础资产列表、Supabase 连接、新增资产、每日成本计算、移动端响应式 |
| v0.0.2 | 资产编辑 / 删除、状态管理、社交分享卡片、iOS Sheet 弹窗、纵向卡片布局 |
| v0.0.3 | 紧凑列表模式、视图切换（列表/卡片）、状态分组折叠、信息密度优化 |
