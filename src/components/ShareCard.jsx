import React, { forwardRef } from 'react';

/**
 * ShareCard — captured by html2canvas.
 * All inline styles for reliable capture.
 * Bright, minimalist design matching the actual app UI.
 */
const ShareCard = forwardRef(function ShareCard({ asset, blobUrl }, ref) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const totalFormatted = Number(price).toLocaleString();
  
  const statusConfig = {
    using:   { label: '使用中', bg: '#d1fae5', text: '#047857', border: '#a7f3d0' },
    retired: { label: '闲置中', bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' },
    sold:    { label: '已卖出', bg: '#fee2e2', text: '#ef4444', border: '#fecaca' },
  };
  const sc = statusConfig[status] || statusConfig.using;

  // Use blob URL for image if available (CORS-safe), otherwise fall back to image_url
  const imgSrc = blobUrl || image_url;
  
  // Try to use true hostname, fallback if running in environments where it's weird
  let host = 'trackify.app';
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      host = window.location.hostname;
    }
  }

  return (
    <div
      ref={ref}
      style={{
        width: '390px',
        background: '#ffffff',
        borderRadius: '28px',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
    >
      {/* 16:9 Image Area */}
      <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
        {imgSrc ? (
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '64px',
          }}>
            📦
          </div>
        )}
      </div>

      {/* Content body */}
      <div style={{ padding: '24px 28px 28px' }}>
        
        {/* Name + Status row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: 0, lineHeight: 1.3 }}>
            {name}
          </h2>
          <div style={{
            flexShrink: 0,
            display: 'inline-flex', alignItems: 'center',
            background: sc.bg, border: `1px solid ${sc.border}`,
            borderRadius: '20px', padding: '4px 10px', marginTop: '2px',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: sc.text, letterSpacing: '0.02em', lineHeight: 1 }}>
              {sc.label}
            </span>
          </div>
        </div>

        {/* Cost hero */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
          <span style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            ¥{costPerDay}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>/天</span>
        </div>

        {/* Info row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {/* Purchase price */}
          <div style={{
            flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '14px 12px',
            textAlign: 'center', border: '1px solid #f1f5f9',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#334155', lineHeight: 1 }}>¥{totalFormatted}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', fontWeight: 600, letterSpacing: '0.04em' }}>购入价格</div>
          </div>
          {/* Days */}
          <div style={{
            flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '14px 12px',
            textAlign: 'center', border: '1px solid #f1f5f9',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#334155', lineHeight: 1 }}>{days}天</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', fontWeight: 600, letterSpacing: '0.04em' }}>已使用</div>
          </div>
        </div>

        {/* Brand footer */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: '6px 12px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
              {host}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
