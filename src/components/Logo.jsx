import React from 'react';

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bars */}
      <rect x="22" y="45" width="14" height="25" rx="3" fill="#4ade80" />
      <rect x="43" y="32" width="14" height="38" rx="3" fill="#22c55e" />
      <rect x="64" y="42" width="14" height="28" rx="3" fill="#16a34a" />
      
      {/* Curved Arrow */}
      <path d="M 12 72 Q 40 72 75 34" stroke="#10b981" strokeWidth="8" strokeLinecap="round" fill="none" />
      <polygon points="65,30 84,24 80,44" fill="#10b981" />
    </svg>
  );
}
