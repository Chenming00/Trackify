# Trackify · 资产追踪 (Asset Tracker)

<p align="left">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&labelColor=20232A" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&labelColor=1C1E26" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38BDF8?logo=tailwindcss&labelColor=0F172A" alt="Tailwind CSS v3" />
  <img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase&labelColor=1C1C1C" alt="Supabase DB" />
  <img src="https://img.shields.io/badge/Vercel-deployed-F58025?logo=vercel&labelColor=000000&logoColor=white" alt="Vercel Deployed" />
</p>

> “你不是在花钱，你是在每天亏钱。”

大额消费从不是“一次性”的。**Trackify** 是一款极致简洁、充满 Apple 质感的个人资产追踪 Web App。它帮助你直面高净值物品（如 iPhone、MacBook、相机等）的真实成本，通过**「每日真实成本 = 购入价格 ÷ 使用天数」**的核心逻辑，将巨额消费摊销转化为每天的真实花销，让你不再盲目购物，建立真正理性的消费观。

> 🤖 **本项目完全由 Google Antigravity AI 编程助手自动完成开发**
> - **使用模型**：Gemini 3.1 Pro (High) · Claude Sonnet 4.6 (Thinking)


---

## ✨ 核心亮点

### 🎨 现象级 UI 与营销落地页
* **高转化全屏落地页 (Premium Landing)**：彻底告别简陋设计。采用深色态玻璃拟物 (Glassmorphism) 导航条、律动光影渐变 Hero 区域以及悬浮 3D 悬浮卡片演示，提供具有极强张力的视觉冲击。
* **数字微动效 (Micro-interactions)**：引入即时数字脉动（Ticker）效果，每日亏损情况实时滚动，强化痛点体验。
* **移动端优先管理域**：从密集的卡片瀑布流，到从底部弹出的 iOS Sheet 滑动表单，操作体验极其接近原生 Apple 生态应用。

### 🌐 国际化引流与沉浸式中后台
* **极速多语言引流 (i18n)**：预置简体中文、繁体中文、英文、日文支持。提供 Apple 胶囊式语言无缝切换，以极具侵略性的多语言营销词占领全球心智。
* **沉浸式的内部环境**：多语言系统专为未登录拉新访客设计，只需 GitHub 一键授权登录后，系统自动提供稳定、沉浸的全中文资产管理后台，排除任何额外干扰。

### 🔐 绝对隔离的无账密安全
* **无密码登录模式**：拒绝被拖库、无需记忆密码。全站仅支持极其高效的 GitHub OAuth 第三方最高级令牌授权。
* **军武数据防线 (RLS)**：采用下一代架构 Supabase，直接将数据物理隔离下沉至数据库层。强力校验 Row Level Security（行级锁），绝无越权漏洞。

### 🚀 增长与社交传播能力
* **精致社交卡片 (Social Badge)**：一键将自己的资产痛点海报化。后台急速云端（亦或是极速 DOM 帧捕获）渲染 4:3 黄金比例海报。附带引流入口 (trackify.ming.fi)，在朋友圈、小红书与 Twitter 随手引发裂变。

---

## 🛠 技术底座

* **前端框架**：React 18 + Vite (极速冷热更新)
* **样式原子引擎**：Tailwind CSS v3 + 纯手写光影扩展
* **BAAS (后端即服务)**：Supabase (PostgreSQL 强一致性底座 + Supabase Auth + RESTful)
* **社交传播引擎**：`html2canvas` 级 DOM 像素重组
* **自动化 DevOps**：Vercel CD

---

## 🚀 私有化部署指南

### 1. 克隆 & 安装
```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 构建核心数据总线与安全策略
前往你的 Supabase 平台并新建项目。进入 **Authentication -> Providers** 开启 **GitHub Login**。
然后在 **SQL Editor** 执行如下结构化建表与权限控制：

```sql
-- ① 创建包含归属主 (user_id) 的通用资产核心表
CREATE TABLE assets (
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
