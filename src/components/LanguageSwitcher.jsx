import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const clickOut = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, []);

  const d = {
    'zh-CN': '简',
    'zh-TW': '繁',
    'en': 'EN',
    'ja': '日'
  };

  return (
    <div className="relative inline-block z-50 delay-75" ref={ref}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-xl bg-white/50 hover:bg-white shadow-sm border border-slate-100 backdrop-blur-sm"
      >
        <Globe size={16} />
        <span className="text-[11px] font-bold uppercase">{d[lang]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <button onClick={() => { setLang('zh-CN'); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${lang === 'zh-CN' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-50' : 'text-slate-600'}`}>简体中文</button>
          <button onClick={() => { setLang('zh-TW'); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${lang === 'zh-TW' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-50' : 'text-slate-600'}`}>繁體中文</button>
          <button onClick={() => { setLang('en'); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${lang === 'en' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-50' : 'text-slate-600'}`}>English</button>
          <button onClick={() => { setLang('ja'); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${lang === 'ja' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-50' : 'text-slate-600'}`}>日本語</button>
        </div>
      )}
    </div>
  );
}
