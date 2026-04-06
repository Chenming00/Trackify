# Trackify · 资产追踪

一款精致的个人资产管理 Web App，帮助你记录每一笔投入，并实时计算「每日成本」。
支持紧凑列表 / 卡片双视图切换，社交分享卡片一键生成。

**V0.1.0 大规模安全升级**：全面接入 Supabase Auth，启用 RLS (Row Level Security)。每一位用户拥有自己独立的数据，完全安全隔离。

## ✨ 功能亮点

| 功能 | 说明 |
|------|------|
| **安全用户隔离** | 魔法链接免密登录，完全独立的数据隔离 |
| **资产总值概览** | 顶部绿色卡片实时统计自己的资产 |
| **每日成本计算** | `购入价格 ÷ 使用天数`，一眼看清性价比 |
| **双视图切换** | 紧凑列表（高密度）/ 卡片模式（展示型） |
| **状态分组** | 使用中 · 闲置中 · 已卖出，折叠展开 |
| **完整 CRUD** | 新增 / 编辑 / 删除，iOS Sheet 风格弹窗 |
| **社交分享** | html2canvas 生成 PNG，下载即分享 |

## 🛠 技术栈

- **前端**：React 18 + Vite
- **样式**：Tailwind CSS v3 + Lucide React
- **后端**：Supabase（PostgreSQL + REST API + Auth）
- **部署**：Vercel

## 🚀 快速开始

### 1. 克隆 & 安装

```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 初始化数据库（Supabase SQL Editor）

在开启了 Email Auth 的 Supabase 项目中执行以下脚本：

```sql
-- 1. 创建资产表
CREATE TABLE assets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,  -- 绑定 user_id
  name text not null,
  price numeric not null,
  start_date date not null,
  image_url text,
  status text default 'using'
);

-- 2. 开启行级安全（Row Level Security - RLS）
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- 3. 创建 RLS 策略 (完全隔离用户数据)
CREATE POLICY "Users can view own assets"
ON assets FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets"
ON assets FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assets"
ON assets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets"
ON assets FOR DELETE USING (auth.uid() = user_id);
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

## 📝 版本历史

| 版本 | 内容 |
|------|------|
| v0.0.1 | 基础资产列表、连接数据库、计算每日成本、移动端响应式 |
| v0.0.3 | 紧凑列表模式、视图切换、状态分组折叠、信息密度优化 |
| v0.0.4 | 分享卡片 UI 升级：4:3 图片比例、引流网址、视觉增强 |
| **v0.1.0** | **核心安全升级：Supabase Auth 魔法链接登录、RLS 行级数据隔离** |
