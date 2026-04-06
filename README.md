# Trackify 资产管理 · V2

一款简洁、现代化的个人资产管理应用，拥有 iOS 卡片风格界面，支持每日成本自动折算与云端实时同步。

## 🌟 功能特性

- **资产总值概览**：顶部显示实时统计的绿色汇总卡片。
- **每日成本与使用天数**：自动计算从购入日到今天的使用天数，以及平摊的每日成本。
- **iOS 卡片式 UI**：圆角 + 弥散阴影 + 绿色 badge 高亮，视觉清晰有层次感。
- **浮动添加按钮（FAB）**：右下角固定悬浮按钮，点击弹出表单 Modal，立即写入 Supabase，列表自动刷新。
- **加载 & 空状态**：包含 spinner 加载动画和友好的空状态引导页。
- **云端实时数据**：Supabase 作为后端，多端数据一致同步。
- **一键部署**：完全兼容 Vercel，环境变量注入即可上线。

## 🛠 技术栈

- **前端**：[React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **样式**：[Tailwind CSS v3](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **后端 / 数据库**：[Supabase](https://supabase.com/) (PostgreSQL + 自动 REST API)

## 📁 代码结构

```
src/
├── supabase.js              # Supabase 客户端初始化
├── main.jsx                 # React 入口
├── App.jsx                  # 主页面（状态管理、数据拉取）
└── components/
    ├── AssetCard.jsx        # 资产卡片（展示名称、价格、天数、每日成本）
    └── AddAssetModal.jsx    # 新增资产弹窗表单
```

---

## 🚀 快速上手

### 1. 克隆项目

```bash
git clone https://github.com/Chenming00/Trackify.git
cd Trackify
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置数据库（Supabase）

在 Supabase 控制台 **SQL Editor** 中运行以下语句：

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

### 4. 配置环境变量

在项目根目录创建 `.env.local`：

```env
VITE_SUPABASE_URL=你的_SUPABASE_项目_URL
VITE_SUPABASE_ANON_KEY=你的_SUPABASE_ANON_KEY
```

> 在 Supabase 控制台 → Project Settings → API 中获取以上两个值。

### 5. 启动开发服务器

```bash
npm run dev
```

打开 `http://localhost:5173` 即可查看应用。

---

## 📦 部署到 Vercel

1. 将代码推送至 GitHub `main` 分支：
   ```bash
   git push -u origin main
   ```
2. 登录 [Vercel 控制台](https://vercel.com/)，点击 **Add New → Project**，导入 GitHub 仓库。
3. 在 **Environment Variables** 中添加 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。
4. 点击 **Deploy**，完成！

