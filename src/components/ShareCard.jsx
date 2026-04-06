import React, { forwardRef } from 'react';

/**
 * ShareCard — off-screen DOM captured by html2canvas.
 * All inline styles for reliable capture.
 */
const ShareCard = forwardRef(function ShareCard({ asset, t = (key) => ({ days_used: '已使用', daily_cost: '每日成本' }[key] || key) }, ref) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const totalFormatted = Number(price).toLocaleString();

  const statusLabel = { using: '使用中', retired: '闲置中', sold: '已卖出' }[status] || '使用中';

  return (
    <div
      ref={ref}
      style={{
        width: '380px',
        background: 'linear-gradient(170deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '28px',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif',
        boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
      }}
    >
      {/* Image — fixed 4:3 aspect ratio */}
      {image_url ? (
        <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={image_url}
            alt={name}
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%', aspectRatio: '4/3',
            background: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '64px',
          }}
        >
          📦
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '24px 28px 20px' }}>
        {/* Brand tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
            color: '#94a3b8', textTransform: 'uppercase',
          }}>
            TRACKIFY · Asset Tracker
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700, padding: '3px 10px',
            borderRadius: '20px', background: '#f0fdf4', color: '#16a34a',
          }}>
            {statusLabel}
          </span>
        </div>

        {/* Name */}
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.2 }}>
          {name}
        </h2>

        {/* Price */}
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px', fontWeight: 500 }}>
          购入价格 ¥{totalFormatted}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {/* Days */}
          <div style={{
            flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '16px 12px',
            textAlign: 'center', border: '1px solid #f1f5f9',
          }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{days}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px', fontWeight: 600, letterSpacing: '0.05em' }}>{t('days_used')}</div>
          </div>
          {/* Cost per day — HERO */}
          <div style={{
            flex: 2, background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '16px', padding: '16px 12px', textAlign: 'center',
            boxShadow: '0 8px 24px -4px rgba(16,185,129,0.4)',
          }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              ¥{costPerDay}
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '6px', fontWeight: 600, letterSpacing: '0.05em' }}>{t('daily_cost')}</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '16px' }} />

        {/* Footer — brand URL */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#cbd5e1', margin: '0 0 2px', fontWeight: 500 }}>
            用 Trackify 记录你的每一分投入
          </p>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontWeight: 700, letterSpacing: '0.04em' }}>
            trackify.ming.fi
          </p>
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
