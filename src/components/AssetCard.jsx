import React from 'react';
import { Share2, MoreHorizontal } from 'lucide-react';
import { useTranslation } from '../i18n';

const STATUS_STYLE = {
  using:   { label: '使用中', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  retired: { label: '闲置中', bg: 'bg-slate-100',   text: 'text-slate-500'  },
  sold:    { label: '已卖出', bg: 'bg-red-100',      text: 'text-red-500'    },
};

export default function AssetCard({ asset, onEdit, onShare }) {
  const { t } = useTranslation();
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = Math.round(price / days);
  const s = STATUS_STYLE[status] || STATUS_STYLE.using;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/80 overflow-hidden">
      {/* Image — reduced height */}
      <div className="relative">
        {image_url ? (
          <img src={image_url} alt={name} className="w-full h-24 object-cover" />
        ) : (
          <div className="w-full h-20 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
            <span className="text-3xl">📦</span>
          </div>
        )}
        {/* Action icons overlay */}
        <div className="absolute top-1.5 right-1.5 flex gap-1">
          <button onClick={(e) => { e.stopPropagation(); onShare(asset); }} className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-500 hover:text-emerald-500 transition-colors">
            <Share2 size={12} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEdit(asset); }} className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-500 hover:text-slate-700 transition-colors">
            <MoreHorizontal size={12} />
          </button>
        </div>
      </div>

      {/* Content — compressed */}
      <div className="p-3 space-y-1.5 flex flex-col items-center text-center">
        {/* Name + Status */}
        <div className="flex justify-between items-center w-full gap-1 mb-1">
          <h3 className="font-bold text-sm text-slate-800 truncate flex-1 text-left">{name}</h3>
          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${s.bg} ${s.text}`}>{s.label}</span>
        </div>

        {/* Cost per day — hero, visual center */}
        <div className="flex items-baseline justify-center gap-1 mt-1">
          <span className="text-3xl font-black tracking-tight text-slate-800">¥{costPerDay}</span>
          <span className="text-xs font-medium text-slate-400">{t('per_day')}</span>
        </div>

        {/* Price · Days — auxiliary info */}
        <p className="text-[11px] text-slate-400">
          ¥{Number(price).toLocaleString()} · {days}{t('days')}
        </p>
      </div>
    </div>
  );
}
