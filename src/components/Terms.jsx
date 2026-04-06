import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Logo from './Logo';

export default function Terms({ onBack }) {
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
          <h1 className="text-3xl font-black tracking-tight">使用条款</h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">1. 接受条款</h2>
            <p>通过访问或使用 Trackify (以下简称“本服务”)，即表示您同意受本使用条款的约束。如果您不同意这些条款，请勿使用本服务。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">2. 服务说明</h2>
            <p>Trackify 是一个资产追踪工具，旨在帮助用户记录和计算其资产的每日使用成本。本服务目前通过 GitHub OAuth 提供登录支持。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">3. 用户责任</h2>
            <p>您应对您在 Trackify 上进行的任何活动负责。您不得利用本服务进行任何非法活动或侵犯他人权益的行为。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">4. 免责声明</h2>
            <p>本服务按“原样”提供。我们不保证服务不会中断或没有错误。在法律允许的最大范围内，Trackify 不对因使用本服务而产生的任何直接或间接损失负责。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">5. 条款修改</h2>
            <p>我们保留随时修改这些条款的权利。修改后的条款将在发布时立即生效。继续使用本服务即表示您接受修订后的条款。</p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-100 text-slate-400 text-xs">
          最后更新日期：2026年4月7日
        </footer>
      </div>
    </div>
  );
}
