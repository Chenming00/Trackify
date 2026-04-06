import React from 'react';
import { Share2, MoreHorizontal } from 'lucide-react';

const STATUS_STYLE = {
  using:   { label: '使用中', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  retired: { label: '闲置中', bg: 'bg-slate-100',   text: 'text-slate-500'  },
  sold:    { label: '已卖出', bg: 'bg-red-100',      text: 'text-red-500'    },
};

export default function AssetCard({ asset, onEdit, onShare }) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = price / days;
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
      <div className="p-3 space-y-2">
        {/* Name + Status */}
        <div className="flex items-center justify-between gap-1">
          <h3 className="font-bold text-sm text-slate-800 truncate flex-1">{name}</h3>
          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${s.bg} ${s.text}`}>{s.label}</span>
        </div>

        {/* Price · Days — merged single line */}
        <p className="text-xs text-slate-400">
          ¥{Number(price).toLocaleString()} · {days}天
        </p>

        {/* Cost per day — hero, single line */}
        <div className="bg-emerald-50 rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-[10px] text-emerald-600 font-medium">每日成本</span>
          <span className="text-base font-extrabold text-emerald-600">¥{costPerDay.toFixed(2)}<span className="text-[10px] font-semibold ml-0.5 text-emerald-500">/天</span></span>
        </div>
      </div>
    </div>
  );
}
