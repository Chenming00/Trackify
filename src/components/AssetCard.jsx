import React, { useState } from 'react';
import { Share2, MoreHorizontal, TrendingDown } from 'lucide-react';
import { useTranslation } from '../i18n';
import CostTrendChart from './CostTrendChart';

const STATUS_STYLE = {
  using:   { label: '使用中', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  retired: { label: '闲置中', bg: 'bg-slate-100',   text: 'text-slate-500'  },
  sold:    { label: '已卖出', bg: 'bg-red-50',       text: 'text-red-500'    },
};

export default function AssetCard({ asset, onEdit, onShare }) {
  const { t } = useTranslation();
  const [showChart, setShowChart] = useState(false);
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const s = STATUS_STYLE[status] || STATUS_STYLE.using;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-slate-100/80 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer"
      onClick={() => onEdit(asset)}
    >
      {/* Image — 16:9 aspect ratio, background-image for no distortion */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <div
          className="absolute inset-0"
          style={
            image_url
              ? {
                  backgroundImage: `url(${image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : { background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }
          }
        >
          {!image_url && (
            <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
          )}
        </div>
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex gap-1.5 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); setShowChart(!showChart); }}
            className={`p-1.5 ${showChart ? 'bg-indigo-50 text-indigo-600' : 'bg-white/80 text-slate-500'} backdrop-blur-sm rounded-full hover:text-indigo-600 shadow-sm transition-colors`}
            title="查看走势"
          >
            <TrendingDown size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onShare(asset); }}
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-500 hover:text-emerald-500 shadow-sm transition-colors"
            title="分享"
          >
            <Share2 size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(asset); }}
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-500 hover:text-slate-700 shadow-sm transition-colors"
            title="编辑"
          >
            <MoreHorizontal size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Name + Status */}
        <div className="flex items-start justify-between gap-1 mb-2">
          <h3 className="font-bold text-sm sm:text-[15px] text-slate-800 leading-snug line-clamp-2 flex-1">{name}</h3>
          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${s.bg} ${s.text}`}>
            {s.label}
          </span>
        </div>

        {/* Cost hero */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 leading-none">
            ¥{costPerDay}
          </span>
          <span className="text-xs font-medium text-slate-400">{t('per_day')}</span>
        </div>

        {/* Auxiliary info */}
        <p className="text-[11px] text-slate-400">
          ¥{Number(price).toLocaleString()} · {days}{t('days')}
        </p>
      </div>

      {/* Chart Section */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showChart ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="bg-slate-50/50 border-t border-slate-100/60 p-4 pt-3" onClick={(e) => e.stopPropagation()}>
            <CostTrendChart price={Number(price)} startDate={start_date} compact={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
