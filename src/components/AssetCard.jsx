import React from 'react';

export default function AssetCard({ asset }) {
  const { name, price, start_date, image_url } = asset;

  // Exact formula from spec
  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = price / days;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col">
      {/* Image */}
      {image_url ? (
        <img
          src={image_url}
          alt={name}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <span className="text-3xl">📦</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h3 className="font-semibold text-base text-slate-800 leading-snug line-clamp-2">{name}</h3>

        {/* Stats row */}
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">价格</p>
            <p className="text-sm font-semibold text-slate-700">¥{Number(price).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5 text-right">使用天数</p>
            <p className="text-sm font-semibold text-slate-600 text-right">{days} 天</p>
          </div>
        </div>

        {/* Cost per day badge */}
        <div className="bg-emerald-50 rounded-xl px-3 py-2 flex justify-between items-center">
          <span className="text-xs text-emerald-700 font-medium">每日成本</span>
          <span className="text-sm font-bold text-emerald-600">¥{costPerDay.toFixed(2)} / 天</span>
        </div>
      </div>
    </div>
  );
}
