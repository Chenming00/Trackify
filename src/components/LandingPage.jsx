import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Loader2, Github } from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with GitHub:', error);
      alert(error.message || 'GitHub 登录失败，请重试');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* --- Section 1: Hero --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="absolute top-12 font-bold tracking-widest text-xs text-slate-400 uppercase">
          Trackify
        </div>

        <div className="text-center max-w-2xl mx-auto z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6">
            你不是在花钱<br />
            <span className="text-emerald-600">你是在每天亏钱</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-md mx-auto">
            清晰地追踪你的每一笔大额消费，直面它的真实成本。
          </p>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="group relative inline-flex items-center justify-center gap-3 bg-[#111111] hover:bg-black text-white font-semibold py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mx-auto"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
            )}
            <span className="text-[15px]">用 GitHub 登录</span>
          </button>
        </div>
      </section>

      {/* --- Section 2: Core Concept (Card Showcase) --- */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-md mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">真实数据演示</p>

          {/* Fake Asset Card directly embedded with nice styling */}
          <div className="bg-[#fafafa] rounded-[2rem] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 text-left relative overflow-hidden mb-12 transform hover:-translate-y-1 transition-transform duration-500">
            {/* Status dot */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-full">使用中</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-6 mt-2">iPhone 17 Pro</h3>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
                <p className="text-[10px] text-slate-400 font-medium mb-1">购入价格</p>
                <p className="text-lg font-bold text-slate-700">¥5,999</p>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
                <p className="text-[10px] text-slate-400 font-medium mb-1">已使用</p>
                <p className="text-lg font-bold text-slate-700">187<span className="text-xs text-slate-400 ml-1">天</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl px-5 py-4 flex items-center justify-between border border-emerald-100/50">
              <span className="text-xs font-semibold text-emerald-600">每日实际成本</span>
              <span className="text-2xl font-extrabold text-emerald-600">¥32.08<span className="text-xs text-emerald-500 ml-1">/天</span></span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            你每天都在为它付费
          </h2>
        </div>
      </section>

      {/* --- Section 3: Philosophy --- */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            把一次性消费
            <br />
            <span className="text-slate-400">变成每天的真实成本</span>
          </h2>

          <p className="text-sm md:text-base text-slate-500 font-medium mb-16">
            不再盲目购买，建立理性的消费观。<br className="hidden md:block" />
            现在，掌握你的每一分资产。
          </p>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white font-semibold py-4 px-8 rounded-2xl shadow-lg active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Github size={20} />}
            <span className="text-[15px]">立即开始追踪</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-400 font-medium">
        <p>TRACKIFY © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
