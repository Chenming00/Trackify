import React from 'react';
import { MoreHorizontal, Share2 } from 'lucide-react';

const STATUS_STYLE = {
  using:   { label: '使用中', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  retired: { label: '闲置中', bg: 'bg-amber-50',   text: 'text-amber-500'  },
  sold:    { label: '已卖出', bg: 'bg-slate-100',   text: 'text-slate-400'  },
};

export default function AssetCard({ asset, onEdit, onShare }) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = price / days;

  const s = STATUS_STYLE[status] || STATUS_STYLE.using;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {/* Mobile: horizontal. sm+: vertical */}
      <div className="flex sm:flex-col">

        {/* Image */}
        {image_url ? (
          <img src={image_url} alt={name} className="w-24 h-full sm:w-full sm:h-36 object-cover flex-shrink-0" />
        ) : (
          <div className="w-24 sm:w-full sm:h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl sm:text-3xl">📦</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2 min-w-0">
          {/* Name + Action buttons */}
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-semibold text-sm sm:text-base text-slate-800 leading-snug line-clamp-2 flex-1">{name}</h3>
            <div className="flex gap-1 flex-shrink-0 -mt-0.5">
              <button
                onClick={(e) => { e.stopPropagation(); onShare(asset); }}
                title="分享"
                className="p-1.5 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <Share2 size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(asset); }}
                title="编辑"
                className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* Status badge */}
          <div className={`inline-flex self-start items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
            {s.label}
          </div>

          {/* Price & Days */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">价格</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">¥{Number(price).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">已用</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">{days} 天</p>
            </div>
          </div>

          {/* Cost per day badge */}
          <div className="bg-emerald-50 rounded-xl px-2.5 py-1.5 flex justify-between items-center mt-auto">
            <span className="text-[10px] sm:text-xs text-emerald-700 font-medium">每日成本</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600">¥{costPerDay.toFixed(2)}/天</span>
          </div>
        </div>
      </div>
    </div>
  );
}
