import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import ShareCard from './ShareCard';
import { X, Download, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from '../i18n';

/**
 * Pre-fetch an image URL as a same-origin blob URL so html2canvas
 * can capture it without CORS issues.
 */
async function toBlobUrl(url) {
  if (!url) return null;
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('fetch failed');
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    // Return null on failure; ShareCard will fall back to emoji placeholder
    return null;
  }
}

export default function ShareModal({ isOpen, onClose, asset }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null);

  // Auto-generate preview when modal opens
  useEffect(() => {
    if (!isOpen || !asset) return;
    setPreviewUrl(null);
    setBlobUrl(null);

    let revoked = false;
    let localBlobUrl = null;

    const run = async () => {
      // Pre-fetch image as blob for CORS-safe capture
      localBlobUrl = await toBlobUrl(asset.image_url);
      if (revoked) {
        if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
        return;
      }
      setBlobUrl(localBlobUrl);

      // Wait one tick for React to render with blobUrl
      await new Promise((r) => setTimeout(r, 100));
      if (revoked) return;

      await generateCanvas(localBlobUrl);
    };

    run();

    // Cleanup blob URL when modal closes
    return () => {
      revoked = true;
      if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
      setBlobUrl(null);
      setPreviewUrl(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, asset]);

  const generateCanvas = async (currentBlobUrl) => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      // Short delay to allow DOM update
      await new Promise((r) => setTimeout(r, 80));
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        imageTimeout: 8000,
      });
      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error('html2canvas error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => generateCanvas(blobUrl);

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `trackify-${asset?.name ?? 'card'}.png`;
    a.click();
  };

  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-sm sm:rounded-3xl rounded-t-[2.5rem] overflow-hidden shadow-2xl border-t border-slate-100 sm:border animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 fade-in duration-300">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-base font-bold text-slate-800">{t('share_title')}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t('share_desc')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-1 -mt-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preview area */}
        <div className="px-5 pb-3">
          <div className="relative bg-slate-100/80 rounded-2xl overflow-hidden flex items-center justify-center min-h-[220px] shadow-inner border border-slate-200/60 p-2">
            {previewUrl ? (
              <img src={previewUrl} alt="share preview" className="w-full rounded-[14px] shadow-sm block" />
            ) : (
              /* Light skeleton while generating */
              <div className="w-full aspect-[390/560] bg-gradient-to-b from-slate-200 to-slate-100 rounded-[14px] animate-pulse" />
            )}
            {/* Loading overlay */}
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl">
                <Loader2 size={28} className="animate-spin text-emerald-500 mb-2" />
                <span className="text-slate-600 text-[13px] font-semibold">{t('generating')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 pb-6 flex gap-3 mt-1">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            title={t('regen')}
            className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 flex-shrink-0"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          </button>
          <button
            onClick={handleDownload}
            disabled={!previewUrl || isGenerating}
            className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px]"
          >
            <Download size={18} />
            {t('download')}
          </button>
        </div>

        {/* Hidden ShareCard rendered in-DOM for html2canvas (opacity-0) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-9999px',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <ShareCard ref={cardRef} asset={asset} blobUrl={blobUrl} />
        </div>
      </div>
    </div>
  );
}
