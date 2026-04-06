import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';
import { Loader2, Github, ChevronDown, Sparkles, TrendingDown, Package, Globe, Lock } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n';

/* ─── tiny hook: animate number counter on viewport entry ─── */
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [value, ref];
}

/* ─── Animated demo "daily cost" ticker ─── */
function DailyCostTicker({ value = 32.08 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 900, 1);
      setDisplay(parseFloat((p * value).toFixed(2)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, 600);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [value]);
  return <>{display.toFixed(2)}</>;
}

/* ─── Feature card icons map ─── */
const FEAT_ICONS = [
  <TrendingDown size={24} />,
  <Package size={24} />,
  <Globe size={24} />,
  <Lock size={24} />,
];

export default function LandingPage({ onNavigate }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with GitHub:', error);
      alert(t('err_login'));
      setLoading(false);
    }
  };

  const features = [1, 2, 3, 4].map((n) => ({
    icon: FEAT_ICONS[n - 1],
    title: t(`feat${n}_title`),
    desc: t(`feat${n}_desc`),
  }));



  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          NAVBAR — glassmorphism, sticky
      ════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Logo className="w-8 h-8" />
            <span className="font-extrabold tracking-wide text-lg text-slate-900 uppercase leading-none">
              Trackify
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Chenming00/Trackify" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-800 transition-colors hidden sm:flex items-center mr-2"
              title="Open Source on GitHub"
            >
              <Github size={20} />
            </a>
            <LanguageSwitcher />
            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Github size={14} />}
              {t('login_btn')}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          HERO — full‑screen gradient
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 overflow-hidden">
        {/* Layered ambient blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-xl max-h-xl bg-emerald-300/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-8%] w-[50vw] h-[50vw] max-w-lg max-h-lg bg-sky-300/20 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] left-[55%] w-[30vw] h-[30vw] max-w-xs bg-violet-300/15 rounded-full blur-[80px]" />
        </div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles size={12} className="text-emerald-500" />
            {t('hero_eyebrow')}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900 mb-6">
            {t('hero_title1')}
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              {t('hero_title2')}
            </span>
          </h1>

          <p className="text-slate-500 text-lg sm:text-xl font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            {t('hero_desc')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-[15px] w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Github size={18} className="group-hover:scale-110 transition-transform duration-300" />
              )}
              {t('login_btn')}
            </button>
            <a
              href="https://github.com/Chenming00/Trackify"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl shadow-sm active:scale-95 transition-all duration-300 text-[15px] w-full sm:w-auto"
            >
              <Github size={18} className="text-slate-700" />
              开源仓库
            </a>
          </div>
          <p className="text-slate-400 text-xs font-medium">{t('login_sub')}</p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DEMO CARD — floating showcase
      ════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="max-w-md mx-auto text-center relative z-10">
          {/* Eyebrow */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
            {t('demo_tag')}
          </p>

          {/* The floating card */}
          <div
            className="bg-white rounded-[2.5rem] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100 text-left relative overflow-hidden mb-14 hover:-translate-y-2 transition-transform duration-500"
            style={{ isolation: 'isolate' }}
          >
            {/* subtle inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-emerald-50/30 rounded-[2.5rem] pointer-events-none" />

            {/* Status badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {t('status_using')}
              </span>
            </div>

            {/* Product emoji + name */}
            <div className="flex items-center gap-3 mb-6 mt-1 relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                📱
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{t('demo_name')}</h3>
            </div>

            {/* Stats row */}
            <div className="flex gap-3 mb-5 relative">
              <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100/80">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1.5">{t('price_label')}</p>
                <p className="text-xl font-extrabold text-slate-700">¥5,999</p>
              </div>
              <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100/80">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1.5">{t('days_used')}</p>
                <p className="text-xl font-extrabold text-slate-700">
                  187 <span className="text-xs font-semibold text-slate-400">{t('days')}</span>
                </p>
              </div>
            </div>

            {/* Daily cost highlight */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl px-5 py-4 flex items-center justify-between relative shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]">
              <span className="text-xs font-bold text-emerald-50 uppercase tracking-widest">{t('daily_cost')}</span>
              <span className="text-2xl font-extrabold text-white">
                ¥<DailyCostTicker value={32.08} /><span className="text-xs text-white/80 ml-1">{t('per_day')}</span>
              </span>
            </div>
          </div>

          {/* Quote */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('demo_quote')} 💸
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <section className="bg-slate-900 text-white py-16 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 text-center">
          {[
            { num: t('stat1_num'), label: t('stat1_label') },
            { num: t('stat2_num'), label: t('stat2_label') },
            { num: t('stat3_num'), label: t('stat3_label') },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 ${i < 2 ? 'sm:border-r sm:border-white/10' : ''}`}
            >
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent leading-none">
                {s.num}
              </span>
              <span className="text-slate-400 text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
              {t('feat_eyebrow')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {t('phil_title1')}
              <br />
              <span className="text-slate-400 font-bold">{t('phil_title2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="relative py-28 px-5 overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6">
            {t('phil_eyebrow')}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white mb-8">
            {t('phil_title1')}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {t('phil_title2')}
            </span>
          </h2>

          <p
            className="text-slate-400 font-medium text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('phil_desc') }}
          />

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_8px_30px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-[16px] mb-4"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Github size={20} className="group-hover:scale-110 transition-transform" />}
            {t('start_btn')}
          </button>
          <p className="text-slate-500 text-xs font-medium">{t('start_sub')}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-slate-950 py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo className="w-7 h-7 opacity-80" />
            <span className="font-extrabold text-sm text-white/60 uppercase tracking-wide">Trackify</span>
          </div>

          <p className="text-slate-500 text-xs font-medium order-last sm:order-none">
            {t('footer_quote')}
          </p>

          <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
            <a 
              href="https://github.com/Chenming00/Trackify" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1 mr-2"
            >
              <Github size={14} /> Open Source
            </a>
            <button onClick={() => onNavigate('terms')} className="hover:text-emerald-400 transition-colors">
              使用条款
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors">
              隐私政策
            </button>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
