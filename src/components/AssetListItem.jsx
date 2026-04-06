import React from 'react';
import { Share2, MoreHorizontal } from 'lucide-react';
import { useTranslation } from '../i18n';

const STATUS_DOT = {
  using:   'bg-emerald-400',
  retired: 'bg-slate-300',
  sold:    'bg-red-300',
};

export default function AssetListItem({ asset, onEdit, onShare }) {
  const { t } = useTranslation();
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100/80 active:bg-slate-50 transition-colors">
      {/* Thumbnail */}
      {image_url ? (
        <img src={image_url} alt={name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-lg">📦</div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[status] || STATUS_DOT.using}`} />
          <h3 className="text-sm font-semibold text-slate-800 truncate">{name}</h3>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          ¥{Number(price).toLocaleString()} · {days}{t('days')}
        </p>
      </div>

      {/* Cost per day — primary info */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold text-emerald-600">¥{costPerDay}</p>
        <p className="text-[10px] text-slate-400">{t('per_day')}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 flex-shrink-0 -mr-1">
        <button onClick={(e) => { e.stopPropagation(); onShare(asset); }} className="p-1 text-slate-300 hover:text-emerald-500 rounded transition-colors">
          <Share2 size={12} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onEdit(asset); }} className="p-1 text-slate-300 hover:text-slate-600 rounded transition-colors">
          <MoreHorizontal size={12} />
        </button>
      </div>
    </div>
  );
}
