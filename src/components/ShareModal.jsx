import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ShareCard from './ShareCard';
import { X, Download, Loader2, RefreshCw } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, asset }) {
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
      alert('图片生成失败');
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
      <div className="relative bg-white w-full sm:max-w-sm sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-5 pt-3 pb-3 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-800">分享卡片</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">生成图片分享到社交媒体</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-4">
          {/* Hidden ShareCard for html2canvas */}
          <div style={{ position: 'absolute', top: 0, left: '-9999px', pointerEvents: 'none', zIndex: -1 }}>
            <ShareCard ref={cardRef} asset={asset} />
          </div>

          {/* Preview */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-[200px]">
            {previewUrl ? (
              <img src={previewUrl} alt="share preview" className="w-full rounded-2xl" />
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-slate-400 text-xs font-medium">点击下方按钮生成预览</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          {!previewUrl ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {isGenerating ? (
                <><Loader2 size={16} className="animate-spin" /> 生成中...</>
              ) : (
                '生成分享图片'
              )}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewUrl(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-200 active:scale-[0.98] transition-all"
              >
                <RefreshCw size={14} />
                重新生成
              </button>
              <button
                onClick={handleDownload}
                className="flex-[2] bg-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-600 active:scale-[0.98] transition-colors shadow-sm"
              >
                <Download size={14} />
                下载图片
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
