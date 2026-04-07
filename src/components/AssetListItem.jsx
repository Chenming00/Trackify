import React, { useState } from 'react';
import { Share2, Edit2, TrendingDown } from 'lucide-react';
import { useTranslation } from '../i18n';
import CostTrendChart from './CostTrendChart';

const STATUS_CONFIG = {
  using:   { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-600', label: '使用中' },
  retired: { dot: 'bg-slate-300',   badge: 'bg-slate-100 text-slate-500',    label: '闲置中'  },
  sold:    { dot: 'bg-red-300',     badge: 'bg-red-50 text-red-500',         label: '已卖出' },
};

export default function AssetListItem({ asset, onEdit, onShare }) {
  const { t } = useTranslation();
  const [showChart, setShowChart] = useState(false);
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.using;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm transition-all overflow-hidden relative group hover:border-slate-200 hover:shadow-md">
      <div
        className="flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-4 cursor-pointer"
        onClick={() => setShowChart(!showChart)}
      >
        {/* Thumbnail */}
        <div
          className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden"
          style={
            image_url
              ? { backgroundImage: `url(${image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }
          }
        >
          {!image_url && <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
            <h3 className="text-sm sm:text-[15px] font-semibold text-slate-800 truncate">{name}</h3>
          </div>
          <p className="text-xs text-slate-400 truncate">
            ¥{Number(price).toLocaleString()} · {days}{t('days')}
          </p>
        </div>

        {/* Daily cost */}
        <div className="flex-shrink-0 text-right min-w-[64px]">
          <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">¥{costPerDay}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{t('per_day')}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-0.5 flex-shrink-0 -mr-1">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(asset); }}
            className="p-1.5 text-slate-300 hover:text-slate-600 rounded-full transition-colors bg-white hover:bg-slate-50"
            title="编辑"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onShare(asset); }}
            className="p-1.5 text-slate-300 hover:text-emerald-500 rounded-full transition-colors bg-white hover:bg-emerald-50"
            title="分享"
          >
            <Share2 size={13} />
          </button>
        </div>
      </div>
      
      {/* Chart Section */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showChart ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="bg-slate-50/50 border-t border-slate-100/60 p-4 pt-3">
            <CostTrendChart price={Number(price)} startDate={start_date} />
          </div>
        </div>
      </div>
    </div>
  );
}
