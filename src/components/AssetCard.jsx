import React from 'react';

export default function AssetCard({ asset }) {
  const { name, price, start_date, image_url } = asset;
  
  // Calculate cost per day
  const calculateCostPerDay = () => {
    const startDate = new Date(start_date);
    const today = new Date();
    // Normalize times to midnight to avoid partial day issues
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Difference in milliseconds
    const diffTime = today - startDate;
    // Calculate full days, default to 1 minimum to prevent infinity/division by zero
    const diffDays = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 1);
    
    // cost = price / days
    const cost = price / diffDays;
    return `¥${cost.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {image_url ? (
        <img 
          src={image_url} 
          alt={name} 
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-400 font-medium">
          暂无图片
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-slate-800 mb-4 truncate leading-tight">{name}</h3>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium mb-1">购入价格</span>
            <span className="text-sm font-semibold text-slate-700">¥ {Number(price).toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium mb-1">每日成本</span>
            <span className="text-base font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">{calculateCostPerDay()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
