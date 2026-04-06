import React, { forwardRef } from 'react';

/**
 * ShareCard — an off-screen DOM node captured by html2canvas.
 * Keep all styles as inline styles (not Tailwind) so they are
 * reliably captured regardless of how Tailwind purges classes.
 */
const ShareCard = forwardRef(function ShareCard({ asset }, ref) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const totalFormatted = Number(price).toLocaleString();

  const statusLabel = { using: '使用中', retired: '闲置中', sold: '已卖出' }[status] || '使用中';

  return (
    <div
      ref={ref}
      style={{
        width: '360px',
        background: 'linear-gradient(145deg, #f8fafc, #ffffff)',
        borderRadius: '24px',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        position: 'relative',
      }}
    >
      {/* Image */}
      {image_url ? (
        <img
          src={image_url}
          alt={name}
          crossOrigin="anonymous"
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%', height: '160px',
            background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '56px',
          }}
        >
          📦
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
            color: '#64748b', textTransform: 'uppercase',
          }}>
            TRACKIFY
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 600, padding: '3px 10px',
            borderRadius: '20px', background: '#f0fdf4', color: '#16a34a',
          }}>
            {statusLabel}
          </span>
        </div>

        {/* Name */}
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', margin: '0 0 6px', lineHeight: 1.3 }}>
          {name}
        </h2>

        {/* Purchase price */}
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px' }}>
          购入价格 ¥{totalFormatted}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '20px' }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{days}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', fontWeight: 500 }}>使用天数</div>
          </div>
          <div style={{
            flex: 2, background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '16px', padding: '14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              ¥{costPerDay}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginTop: '4px', fontWeight: 500 }}>每日成本</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#cbd5e1', margin: 0 }}>
            用 Trackify 记录你的每一分投入
          </p>
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
