import React, { forwardRef } from 'react';

/**
 * ShareCard — captured by html2canvas.
 * All inline styles for reliable capture.
 * Dark premium design, integer cost, no "daily_cost" label.
 */
const ShareCard = forwardRef(function ShareCard({ asset, blobUrl }, ref) {
  const { name, price, start_date, image_url, status } = asset;

  const days = Math.max(1, Math.floor((Date.now() - new Date(start_date)) / 86400000));
  const costPerDay = (price / days).toFixed(2);
  const totalFormatted = Number(price).toLocaleString();
  const statusLabel = { using: '使用中', retired: '闲置中', sold: '已卖出' }[status] || '使用中';
  const statusColor = { using: '#10b981', retired: '#94a3b8', sold: '#f87171' }[status] || '#10b981';

  // Use blob URL for image if available (CORS-safe), otherwise fall back to image_url
  const imgSrc = blobUrl || image_url;

  return (
    <div
      ref={ref}
      style={{
        width: '390px',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
        borderRadius: '28px',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        position: 'relative',
      }}
    >
      {/* Top image area with overlay */}
      <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden' }}>
        {imgSrc ? (
          /* Use background-image instead of <img> — html2canvas doesn't support object-fit:cover,
             which would cause stretching. background-size:cover is handled correctly. */
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
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '72px',
          }}>
            📦
          </div>
        )}
        {/* Gradient overlay for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.75) 100%)',
        }} />
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          borderRadius: '20px', padding: '4px 12px',
          border: `1px solid ${statusColor}40`,
        }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: statusColor, letterSpacing: '0.04em' }}>
            {statusLabel}
          </span>
        </div>
        {/* Asset name overlaid on image */}
        <div style={{ position: 'absolute', bottom: '16px', left: '24px', right: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
            TRACKIFY · ASSET TRACKER
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {name}
          </div>
        </div>
      </div>

      {/* Content body */}
      <div style={{ padding: '24px 28px 28px' }}>
        {/* Cost hero */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px' }}>
            <span style={{ fontSize: '54px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1 }}>
              ¥{costPerDay}
            </span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#64748b' }}>/天</span>
          </div>
          <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px', fontWeight: 500 }}>
            每日真实成本
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '20px' }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {/* Purchase price */}
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '14px 12px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#e2e8f0', lineHeight: 1 }}>¥{totalFormatted}</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>购入价格</div>
          </div>
          {/* Days */}
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '14px 12px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#e2e8f0', lineHeight: 1 }}>{days}天</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>已使用</div>
          </div>
        </div>

        {/* Brand footer */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#334155', fontWeight: 700, letterSpacing: '0.06em' }}>
            trackify.ming.fi
          </div>
          <div style={{ fontSize: '10px', color: '#1e293b', marginTop: '2px' }}>
            用 Trackify 记录你的每一分投入
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
