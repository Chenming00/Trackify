import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ReferenceLine, ResponsiveContainer, CartesianGrid,
} from 'recharts';

/**
 * Shows the "daily cost decay" curve:
 * costPerDay = price / day  →  decreases as day increases.
 *
 * Props:
 *   price      - number: purchase price
 *   startDate  - string: ISO date string
 *   compact    - boolean: if true, renders a smaller mini-chart
 */

function generatePoints(price, startDate) {
  const start = new Date(startDate);
  const startTs = start.getTime();
  const todayTs = Date.now();
  const totalDays = Math.max(1, Math.floor((todayTs - startTs) / 86400000));

  // Project up to 2x current age (or at least 365 days ahead)
  const maxDays = Math.max(totalDays * 2, totalDays + 365);

  // Sample ~40 points logarithmically to show the curve well
  const points = [];
  const sampleCount = 40;
  for (let i = 0; i < sampleCount; i++) {
    // Logarithmic distribution to show early steep drop
    const ratio = i / (sampleCount - 1);
    const day = Math.max(1, Math.round(Math.pow(ratio, 1.5) * maxDays + 1));
    const cost = price / day;
    points.push({ day, cost: parseFloat(cost.toFixed(2)) });
  }

  // Deduplicate by day
  const seen = new Set();
  return points.filter((p) => {
    if (seen.has(p.day)) return false;
    seen.add(p.day);
    return true;
  });
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { day, cost } = payload[0].payload;
  return (
    <div className="bg-white border border-slate-100 shadow-lg rounded-xl px-3 py-2 text-xs">
      <p className="text-slate-500">第 {day} 天</p>
      <p className="font-bold text-slate-800">¥{cost} <span className="font-normal text-slate-400">/天</span></p>
    </div>
  );
};

export default function CostTrendChart({ price, startDate, compact = false }) {
  const data = useMemo(() => generatePoints(price, startDate), [price, startDate]);
  const today = Math.max(1, Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000));
  const height = compact ? 80 : 140;

  return (
    <div className="w-full">
      {!compact && (
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-[11px] text-slate-400 font-medium">每日成本走势</span>
          <span className="text-[11px] text-slate-400">当前第 {today} 天</span>
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          {!compact && (
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          )}
          <XAxis
            dataKey="day"
            tick={{ fontSize: 9, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}d`}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 9, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `¥${v}`}
            width={40}
          />
          {!compact && <Tooltip content={<CustomTooltip />} />}
          <ReferenceLine
            x={today}
            stroke="#10b981"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={compact ? null : { value: '今天', position: 'top', fontSize: 9, fill: '#10b981' }}
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
