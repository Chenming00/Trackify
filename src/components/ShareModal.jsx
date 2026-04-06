import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ShareCard from './ShareCard';
import { X, Download, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function ShareModal({ isOpen, onClose, asset }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen || !asset) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPreviewUrl(null);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error('html2canvas error:', err);
      alert(t('err_gen'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `trackify-${asset.name}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel — bottom sheet on mobile */}
      <div className="bg-white/80 backdrop-blur-xl w-full sm:max-w-md sm:rounded-3xl rounded-t-[2.5rem] overflow-hidden shadow-2xl border-t border-slate-100 sm:border animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 fade-in duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{t('share_title')}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t('share_desc')}</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-4">
          {/* Hidden ShareCard for html2canvas */}
          <div style={{ position: 'absolute', top: 0, left: '-9999px', pointerEvents: 'none', zIndex: -1 }}>
            <ShareCard ref={cardRef} asset={asset} t={t} />
          </div>

          {/* Preview */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-[200px]">
            {previewUrl ? (
              <img src={previewUrl} alt="share preview" className="w-full rounded-2xl" />
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-slate-400 font-medium text-sm mb-4">{t('click_preview')}</p>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
                >
                  {isGenerating ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isGenerating ? t('generating') : t('gen_pic')}
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          {previewUrl && (
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                <span className="hidden sm:inline">{t('regen')}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px]"
              >
                <Download size={18} />
                {t('download')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
