# Trackify 资产管理

一款简洁、现代化的个人资产管理应用，提供基于 iOS 卡片风格的界面设计，以及直观的每日成本自动折算功能。

## 🌟 功能特性

- **直观的概览**：首页顶部展示实时计算的资产总值。
- **每日成本计算**：自动根据资产购入价格和使用时长（购入价格 / 至今使用天数）计算「每日成本」，帮助您更好地评估使用性价比。
- **精美卡片式 UI**：采用 TailwindCSS 构建优雅的圆角与弥散阴影体系，带来贴近 iOS 原生的清晰视觉体验。
- **云端数据管理**：利用 Supabase 作为后端数据库，实时获取、新增您的资产记录，多端同步。
- **极简部署**：完全兼容 Vercel，提供一键式流式部署。

## 🛠 技术栈

- **前端框架**：[React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI 和样式**：[Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **后端服务**：[Supabase](https://supabase.com/) (PostgreSQL 数据库以及自动 API 路由)

---

## 🚀 快速上手

### 1. 获取代码
将项目克隆到本地：
```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
```

### 2. 下载依赖
请确保你的环境已经安装了 Node.js（推荐版本 >= 16）。
```bash
npm install
```

### 3. 配置数据库 (Supabase)

在 Supabase 控制台中创建一个新的项目，准备完成后进入 **SQL Editor** 界面，运行下述语句以初始化核心数据表：

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

### 4. 环境变量
在项目根目录确保有一个名为 `.env.local` 的文件，并将您从 Supabase Project Settings -> API 端获取的 URL 和 Anon Key 填入：

```env
VITE_SUPABASE_URL=你的_SUPABASE_项目_URL
VITE_SUPABASE_ANON_KEY=你的_SUPABASE_ANON_KEY
```

### 5. 启动项目跑起来

```bash
npm run dev
```

终端将会输出运行地址（通常是 `http://localhost:5173`）。打开浏览器，开启您的资产追踪之旅！

---

## 📦 部署到 Vercel (推荐)

您可以轻易将此应用部署至 Vercel 享受全球 CDN 节点分发：

1. 将包含最新提交的代码推送到您的 GitHub `main` 分支。
2. 登录 [Vercel 控制台](https://vercel.com/) 并点击 **Add New -> Project**。
3. 从 GitHub 列表中选择您对应仓库并点击 Import。
4. **关键步骤**：在部署设置里的 *Environment Variables* 项，务必手动添加对应的 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。
5. 点击 **Deploy**。稍等片刻之后应用即可获得您独家的公网链接！
