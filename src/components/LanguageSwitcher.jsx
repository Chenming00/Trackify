import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const langs = [
    { code: 'zh-CN', label: '中' },
    { code: 'zh-TW', label: '繁' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日' },
  ];

  return (
    <div 
      className="relative flex items-center bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-1.5 transition-all duration-500 ease-out z-50 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-slate-700 z-10 transition-all duration-300 ${!hovered ? 'bg-white shadow-sm' : 'bg-transparent shadow-none'}`}>
        <Globe size={16} />
      </div>

      <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered ? 'w-[140px] opacity-100 gap-1 pl-1 pr-0.5' : 'w-0 opacity-0 gap-0 pl-0 pr-0'}`}>
        {langs.map(l => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`min-w-[30px] h-[30px] rounded-full text-[13px] font-bold flex items-center justify-center transition-all duration-300 ${
              lang === l.code 
                ? 'bg-emerald-500 text-white shadow-md scale-100' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white scale-95 hover:scale-100'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
