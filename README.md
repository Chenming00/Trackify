# Trackify · 资产追踪 (Asset Tracker)

> “你不是在花钱，你是在每天亏钱。”

Trackify 是一款极致简洁、充满 Apple 质感的个人资产追踪 Web App。它帮助你直面高净值物品（如 iPhone、MacBook、相机等）的真实成本，通过**「每日成本 = 购入价格 ÷ 使用天数」**的核心逻辑，将一次性巨额消费转化为每天的真实花销，让你不再盲目购物，建立更理性的消费观。

---

## ✨ 核心亮点

### 🎨 Apple 级交互设计
* **高级落地页 (Landing Page)**：采用大面积留白与高光居中排版，未登录用户可体验动效交互和真实的「产品哲学」卡片演示。
* **移动端优先**：无论是高密度的列表模式、展示型卡片模式，还是从底部弹出的 iOS Sheet 风格表单，都带给你接近原生 App 的愉悦体验。
* **极简品牌表达**：每个分享卡片经过严格视觉调优，采用 4:3 黄金比例与品牌定制标识。

### 🔐 绝对隔离的无账密安全
* **仅限 GitHub 一键登录**：告别繁琐的账号密码记忆风险，全站仅支持最高效的 GitHub OAuth 第三方授权登录机制。
* **军工级独立防线 (RLS)**：基于 Supabase 的 Row Level Security，即便通过 API 也是绝对的数据隔离，每个用户只能看见、操作自己的资产。

### 🚀 增长与社交传播能力
* **图片社交分享**：点击任意卡片的分享按钮，利用内置的引擎秒速渲染带有绿色 Hero 数字和你的社交引流域名（trackify.ming.fi）的分享截屏图片，适合发小红书、朋友圈。

---

## 🛠 技术底座

* **前端框架**：React 18 + Vite (极致的首屏启动与热更新)
* **UI 引擎**：Tailwind CSS v3 (Utility First) + Lucide React 图标
* **后台与数据库**：Supabase (PostgreSQL 强一致性底座 + Supabase Auth / OAuth + RESTful)
* **图片导出**：`html2canvas` 高清 DOM 截图转换
* **托管部署**：Vercel CD 自动化部署平台

---

## 🚀 私有化部署指南

### 1. 克隆 & 安装
```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
npm install
```

### 2. 构建 Supabase 数据库与安全策略
确保你的 Supabase 项目中进入 **Authentication -> Providers** 开启了 **GitHub Login**。
然后在 **SQL Editor** 中执行下述 SQL 建立你的专属安全数据表：

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
根目录下创建 `.env.local`：

```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的Anon_Key
```
*(上述参数可在 Supabase 仪表盘 -> Project Settings -> API 中获取)*

### 4. 启动与上线
运行 `npm run dev` 即可享受极速开发；若需向互联网发布，提交至 GitHub 仓库并导入 Vercel 即可秒级上线。

---

## 📝 详细版本历史 (Changelog)

| 版本号 | 发布焦点 | 新增特性与优化说明 |
|--------|---------|-------------------|
| **v0.1.1** | **Apple 风产品落地页与国际化多语言** | 彻底移除老旧的邮箱验证码；上线极具转化力的高端 Landing Page；新增产品核心哲学示例卡片演示；强化 GitHub OAuth 单点登录。<br/>新增极其优雅的 Apple 胶囊式多语言切换器 (支持简、繁、EN、日)，该项支持仅面对未登录访客，为应用引流；用户登录后系统将强力保障沉浸式全中文体验。|
| **v0.1.0** | **数据硬隔离与安全升级** | 接入 Supabase 表级 Row Level Security (RLS) 拦截；重构建表代码全面支持 `user_id`；确保任意两个用户间数据物理不可见。 |
| v0.0.4 | **社交裂变引流页设计** | 分享卡片 UI 重新调优；强制裁切标准 4:3 图片；大幅强化核心「每日成本」视觉面积；底部增加统一的 `trackify.ming.fi` 品牌输出。|
| v0.0.3 | **信息密度视图模式**   | 新增超紧凑列表模式（一屏可见更多资产）；增加视图实时切换开关；增加「使用中 / 闲置 / 卖出」的可折叠状态分类编组逻辑。 |
| v0.0.2 | **移动体验重塑**       | 纵向卡片结构；底部 iOS 风格 Sheet Action 交互 Modal；加入闲置状态管理器。 |
| v0.0.1 | **项目初始化架构**     | Vite 极速起跑；Supabase REST 接口走通；公式引擎（总价值/日期推演每日成本）上线。|
