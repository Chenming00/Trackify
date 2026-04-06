import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Loader2, Mail } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      console.error('Error logging in:', error);
      setMessage(error.message || '发送失败，请重试');
    } finally {
      setLoading(false);
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
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1 mb-2">
                邮箱地址
              </label>
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
                  placeholder="hello@example.com"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-100/50 border-0 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 sm:text-[15px] transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> 发送中...</>
              ) : (
                '使用魔法链接登录'
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-5 p-4 rounded-xl text-sm font-medium ${message.includes('失败') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
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
