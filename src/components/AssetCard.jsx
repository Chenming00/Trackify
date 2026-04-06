import React from 'react';
import { MoreHorizontal, Share2 } from 'lucide-react';

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
      {/* Vertical layout: image on top, info below */}
      <div className="flex flex-col">

        {/* Image — always full-width, fixed height */}
        {image_url ? (
          <img src={image_url} alt={name} className="w-full h-36 object-cover" />
        ) : (
          <div className="w-full h-28 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">

          {/* Row 1: Name + status + actions */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[15px] text-slate-800 leading-snug line-clamp-1">{name}</h3>
            </div>
            <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
              {s.label}
            </span>
          </div>

          {/* Row 2: Price + Days — clean two-column */}
          <div className="flex rounded-xl bg-slate-50 divide-x divide-slate-200/80">
            <div className="flex-1 py-2.5 px-3 text-center">
              <p className="text-[10px] text-slate-400 font-medium mb-0.5">购入价格</p>
              <p className="text-sm font-bold text-slate-700">¥{Number(price).toLocaleString()}</p>
            </div>
            <div className="flex-1 py-2.5 px-3 text-center">
              <p className="text-[10px] text-slate-400 font-medium mb-0.5">已使用</p>
              <p className="text-sm font-bold text-slate-700">{days} <span className="text-xs font-medium text-slate-400">天</span></p>
            </div>
          </div>

          {/* Row 3: Cost per day — HERO element */}
          <div className="bg-emerald-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-medium">每日成本</span>
            <span className="text-lg font-extrabold text-emerald-600">¥{costPerDay.toFixed(2)}<span className="text-xs font-semibold ml-0.5 text-emerald-500">/天</span></span>
          </div>

          {/* Row 4: Action buttons */}
          <div className="flex gap-2 pt-0.5">
            <button
              onClick={(e) => { e.stopPropagation(); onShare(asset); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all"
            >
              <Share2 size={13} />
              分享
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(asset); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all"
            >
              <MoreHorizontal size={13} />
              编辑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
