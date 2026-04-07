import React from 'react';
import { Share2, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';

const STATUS_CONFIG = {
  using:   { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-600', label: '使用中' },
  retired: { dot: 'bg-slate-300',   badge: 'bg-slate-100 text-slate-500',    label: '闲置中'  },
  sold:    { dot: 'bg-red-300',     badge: 'bg-red-50 text-red-500',         label: '已卖出' },
};

export default function AssetListItem({ asset, onEdit, onShare }) {
  const { t } = useTranslation();
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.using;

  return (
    <div
      className="group flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 active:scale-[0.99] transition-all duration-200 cursor-pointer"
      onClick={() => onEdit(asset)}
    >
      {/* Thumbnail — background-image for distortion-free display */}
      <div
        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden"
        style={
          image_url
            ? { backgroundImage: `url(${image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }
        }
      >
        {!image_url && (
          <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
        )}
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

      {/* Daily cost — right column */}
      <div className="flex-shrink-0 text-right min-w-[64px]">
        <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">¥{costPerDay}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">{t('per_day')}</p>
      </div>

      {/* Share button + chevron */}
      <div className="flex-shrink-0 flex items-center gap-1 -mr-1">
        <button
          onClick={(e) => { e.stopPropagation(); onShare(asset); }}
          className="p-2 text-slate-300 hover:text-emerald-500 rounded-full hover:bg-emerald-50 transition-colors"
          title="分享"
        >
          <Share2 size={14} />
        </button>
        <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
      </div>
    </div>
  );
}
