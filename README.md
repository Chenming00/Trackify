# Trackify · 资产追踪 (Asset Tracker)

<p align="left">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&labelColor=20232A" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&labelColor=1C1E26" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38BDF8?logo=tailwindcss&labelColor=0F172A" alt="Tailwind CSS v3" />
  <img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase&labelColor=1C1C1C" alt="Supabase DB" />
  <img src="https://img.shields.io/badge/Vercel-deployed-F58025?logo=vercel&labelColor=000000&logoColor=white" alt="Vercel Deployed" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&labelColor=1C1C1C" alt="PWA Ready" />
</p>

> “你并不是在花钱，你是在见证资产每天的价值衰减。”

**Trackify** 是一款极致极简、充满 Apple 质感且支持 PWA 的个人资产追踪 Web App。
它帮助用户直面高净值物品（如 iPhone、MacBook、相机等）的真实成本，通过**「每日真实成本 = 购入价格 ÷ 使用天数」**的核心逻辑，将一次性大额恐慌消费转化为每一天可视化的真实花销，帮助打工人建立更理性的“早买早享受、多用多平摊”消费观。

> 🤖 **本项目全程由 Google Antigravity AI 编程助手驱动开发**
> - **引擎**：Gemini 1.5 Pro · Claude 3.5 Sonnet

---

## ✨ 核心特性

- **极致 Apple 风格设计**：全亮色、大圆角、毛玻璃、精细字体排版，只把最重要的日摊销成本推到视觉中心。
- **动态每日成本**：每日一醒，看着昨日的“天价”随使用天数推移越来越划算。
- **跨平台 PWA**：秒加主屏幕，纯正的原生 App 沉浸体感（无浏览器顶栏底栏），极速加载。
- **自定义卡片生成**：将任意资产导出为绝美的高清白金渐变卡片并一键下载，CORS 图片自适应防形变裁剪解决。
- **多语言底座**：首页支持简繁英日切换，登录后完美锁定指定工作语言。

---

## 🛠 技术栈

- **前端交互**：React 18 / Vite / Tailwind CSS
- **后端云基建**：Supabase (Database, Auth, Row Level Security)
- **核心中间件**：`html2canvas` (CORS-safe 纯前端海报渲染) / `vite-plugin-pwa` (离线服务工作线程)

---

## 🚀 快速开始

### 1. 环境准备
```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 环境变量注入
在项目根目录下创建 `.env.local` 文件，补全你的 Supabase 凭据：
```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 3. 数据层构建 & 安全规则 (Supabase SQL)
启用 **GitHub Login** 并在 Supabase SQL Editor 执行下方脚本：

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

### 4. 驱动本地引擎
```bash
npm run dev
# build for production (PWA)
npm run build
```

---

## 📝 详细更新日志 (Changelog)
- **v1.0.0 (The Minimalist Update)**: 砍掉冗余图表和排序；重构卡片海报为亮色调 Apple 风；全面实装 PWA 与无边框响应式图片加载。
- **v0.2.0**: 重构落地页营销词，整合 I18n 并彻底修正多语言在状态内可能发生的冲突覆盖。
- **v0.1.0**: 基于 Supabase 的安全认证接入及 RLS 数据物理级分离。
- **v0.0.1**: 核心算式 `Cost/Day` 落地。
