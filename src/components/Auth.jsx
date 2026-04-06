import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Loader2, Mail, Github } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [message, setMessage] = useState('');

  const handleGithubLogin = async () => {
    setLoadingGithub(true);
    setMessage('');
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
      setMessage(error.message || 'GitHub 登录失败，请重试');
      setLoadingGithub(false); // only stop loading on error, redirect otherwise
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setMessage('登录链接已发送到您的邮箱，请查收！(可能在垃圾邮件中)');
    } catch (error) {
      console.error('Error logging in with email:', error);
      setMessage(error.message || '发送失败，请重试');
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Trackify</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium tracking-wide uppercase">Asset Tracker</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] border border-slate-100">
          
          {/* GitHub Login (Recommended) */}
          <div className="mb-6">
            <button
              onClick={handleGithubLogin}
              disabled={loadingGithub || loadingEmail}
              className="w-full flex justify-center items-center gap-2 bg-[#24292F] hover:bg-[#24292F]/90 text-white font-semibold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingGithub ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Github size={18} />
              )}
              用 GitHub 登录
            </button>
            <p className="text-center text-xs text-emerald-600 mt-2 font-medium">✨ 极速体验 · 推荐使用 GitHub 登录</p>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">或者是</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Email Magic Link Form */}
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入邮箱地址"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-100/50 border-0 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 sm:text-[15px] transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingEmail || loadingGithub}
              className="w-full flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingEmail ? (
                <><Loader2 size={16} className="animate-spin" /> 发送中...</>
              ) : (
                '获取邮件登录链接'
              )}
            </button>
          </form>

          {/* Feedback Message */}
          {message && (
            <div className={`mt-5 p-4 rounded-xl text-sm font-medium animate-in fade-in zoom-in duration-300 ${message.includes('失败') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
              <p className="text-center leading-relaxed">{message}</p>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
          安全加密 · 保护每一位用户的隐私数据
        </p>
      </div>
    </div>
  );
}
