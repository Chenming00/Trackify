import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Logo from './Logo';

export default function Privacy({ onBack }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">返回首页</span>
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Logo className="w-10 h-10" />
          <h1 className="text-3xl font-black tracking-tight">隐私政策</h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">1. 信息收集</h2>
            <p>我们仅收集通过 GitHub OAuth 登录时提供的最基本信息（如您的 GitHub 用户 ID 和电子邮件），用于识别您的身份并保护您的数据。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">2. 数据存储</h2>
            <p>您的资产数据存储在 Supabase 云端数据库中。我们利用端到端的行级安全策略 (RLS) 来确保您的数据物理隔离，只有您本人可以访问。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">3. 信息分享</h2>
            <p>我们不会向任何第三方出售、交易或以其他方式转让您的个人识别信息。您的数据纯粹用于为您提供资产追踪服务。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">4. 第三方链接</h2>
            <p>我们的服务可能包含指向第三方网站的链接。这些网站有其独立的隐私政策，我们对其内容和活动不承担任何法律责任。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">5. 您的权利</h2>
            <p>您可以随时通过 GitHub 授权撤销访问权限，或在应用内删除您的资产记录。如果您希望完全删除账户及所有相关数据，请联系我们的支持团队。</p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-100 text-slate-400 text-xs">
          最后更新日期：2026年4月7日
        </footer>
      </div>
    </div>
  );
}
