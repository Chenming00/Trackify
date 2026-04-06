# Trackify · 资产追踪 (Asset Tracker)

<p align="left">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&labelColor=20232A" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&labelColor=1C1E26" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38BDF8?logo=tailwindcss&labelColor=0F172A" alt="Tailwind CSS v3" />
  <img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase&labelColor=1C1C1C" alt="Supabase DB" />
  <img src="https://img.shields.io/badge/Vercel-deployed-F58025?logo=vercel&labelColor=000000&logoColor=white" alt="Vercel Deployed" />
</p>

> “你不是在花钱，你是在每天亏钱。”

**Trackify** 是一款极致简洁、充满 Apple 质感的个人资产追踪 Web App。它帮助用户直面高净值物品（如 iPhone、MacBook、相机等）的真实成本，通过**「每日真实成本 = 购入价格 ÷ 使用天数」**的核心逻辑，将一次性大额消费转化为每天的真实花销，帮助建立更理性的消费观。

> 🤖 **本项目由 Google Antigravity AI 编程助手自动完成开发**
> - **使用模型**：Gemini 3.1 Pro (High) · Claude Sonnet 4.6 (Thinking)

---

## ✨ 核心特性

- **Apple 风格设计**：采用极简主义设计，提供流畅的交互体验。
- **每日感官化成本**：自动计算并展示资产的每日摊销成本。
- **多语言支持**：内置简体中文、繁体中文、英文、日文支持（登录前可见）。
- **隐私与安全**：基于 Supabase 的 GitHub OAuth 登录，利用行级安全策略 (RLS) 确保用户数据物理隔离。
- **社交分享**：支持将资产卡片一键生成海报分享。

## 🛠 技术栈

- **前端框架**：React 18, Vite, Tailwind CSS
- **后端架构**：Supabase (Database, Auth, RLS)
- **辅助包**：Lucide React (Icons), html2canvas (Image Generation)

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 本地配置
在项目根目录下创建 `.env.local` 文件，并填入以下内容：
```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的Anon_Key
```

### 3. 构建数据库与安全规则
在 Supabase 的 **Authentication -> Providers** 中启用 **GitHub Login**。
然后在 **SQL Editor** 中执行下述指令创建专属表与锁定行级权限：

```sql
CREATE TABLE assets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  price numeric not null,
  start_date date not null,
  image_url text,
  status text default 'using'
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assets" ON assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assets" ON assets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own assets" ON assets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own assets" ON assets FOR DELETE USING (auth.uid() = user_id);
```

### 4. 运行
```bash
npm run dev
```

---

## 📝 详细更新日志 (Changelog)

- **v0.2.0**: 重构落地页设计，优化营销词，添加多语言支持及使用条款、隐私政策跳转页面。
- **v0.1.0**: 接入 Supabase RLS 机制，对云端资源实行强制隔离与安全加固。
- **v0.0.1**: 初始化版本，核心资产计算公式、样式铺设与基础功能交付。
