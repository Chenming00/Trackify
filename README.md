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
- **社交分享**：支持将资产卡片一键生成图片。

## 🛠 技术栈

- **前端**：React 18, Vite, Tailwind CSS
- **后端**：Supabase (Database, Auth, RLS)
- **其他**：Lucide React (Icons), html2canvas (Image Generation)

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/Chenming00/Trackify.git
   cd Trackify
   npm install
   ```

2. **环境变量**
   在根目录下创建 `.env.local`：
   ```env
   VITE_SUPABASE_URL=你的项目URL
   VITE_SUPABASE_ANON_KEY=你的Anon_Key
   ```

3. **数据库配置**
   在 Supabase SQL Editor 中运行：
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
   -- 配置 RLS 策略 (详见文档)
   ```

4. **运行**
   ```bash
   npm run dev
   ```

---

## 📝 更新日志

- **v0.2.0**: 重构落地页设计，优化营销词，添加多语言支持及条款/隐私页面。
- **v0.1.0**: 接入 Supabase RLS，实现用户数据物理隔离。
- **v0.0.1**: 项目初始化，核心计算公式与基础视图。
EATE TABLE assets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  price numeric not null,
  start_date date not null,
  image_url text,
  status text default 'using'
);

-- ② 开启并强制执行行级安全策略（RLS）
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- ③ 配置四大独立操作权限：只允许操作自身 user_id 数据
CREATE POLICY "Users can view own assets" ON assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assets" ON assets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own assets" ON assets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own assets" ON assets FOR DELETE USING (auth.uid() = user_id);
```

### 3. 配置本地环境变量
根目录下创建 `.env.local` 接入桥接件：

```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的Anon_Key
```

### 4. 启动与发布
测试环境：运行 `npm run dev`
一键上线：向 GitHub 进行推流 (Push) 即可触发 Vercel 的自动发版热更新。

---

## 📝 详细演进路线 (Changelog)

| 版本号 | 核心里程碑 | 更新特性详情 |
|--------|-----------|--------------|
| **v0.2.0** | **超强营销引流页重构** | 启用全新侵略性主 Slogan `你不是在花钱，你是在每天亏钱`；落地页彻底翻新为 6 大全屏交互块；加入 Ticker 数据轮播微动效。 |
| **v0.1.1** | **多语言架构搭建** | 实装 Apple 胶囊式语言选择器。提供简、繁、日、美专属定制化犀利打法营销词；保证登录后用户无感沉浸中文模式。|
| **v0.1.0** | **数据库级隔离护城河** | 实装 Supabase Row Level Security (RLS) 行级拦截网；所有数据增删改查底层强制校验 `user_id`；确保绝对安全。 |
| v0.0.4 | **社交裂变引流页设计** | 分享卡片 UI 重新调优；强制裁切标准 4:3 比例；大幅强化核心「每日成本」视觉引导力与品牌外联。|
| v0.0.3 | **信息密度视图模式**   | 新增超紧凑列表模式（一屏可见更多资产）；增加视图实时切换开关；增加「使用中 / 闲置 / 卖出」折叠状态分类编组。 |
| v0.0.2 | **移动体验重置**       | 底层重写竖向卡片阵列；增设底部 iOS 风格操作呼出面板；实装完整退役（卖出）流转。 |
