import React from 'react';

export default function AssetCard({ asset }) {
  const { name, price, start_date, image_url } = asset;

  // Exact formula from spec
  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = price / days;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {/* Mobile: horizontal (image left); sm+: vertical (fits 2-col grid) */}
      <div className="flex sm:flex-col">

        {/* Image */}
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-24 h-full sm:w-full sm:h-36 object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-24 sm:w-full sm:h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl sm:text-3xl">📦</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-slate-800 leading-snug line-clamp-2">{name}</h3>

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
