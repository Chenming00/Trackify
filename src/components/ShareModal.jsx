import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ShareCard from './ShareCard';
import { X, Download, Loader2 } from 'lucide-react';

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
        scale: 3,          // high-DPI
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error('html2canvas error:', err);
      alert('图片生成失败，请检查控制台');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-[1.5rem] w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">分享卡片</h2>
            <p className="text-xs text-slate-400 mt-0.5">生成图片分享到社交媒体</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Hidden ShareCard for capture */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-9999px',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          >
            <ShareCard ref={cardRef} asset={asset} />
          </div>

          {/* Preview area */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-[220px]">
            {previewUrl ? (
              <img src={previewUrl} alt="share preview" className="w-full rounded-2xl" />
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-slate-400 text-sm font-medium">点击下方按钮生成预览</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          {!previewUrl ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  生成中...
                </>
              ) : (
                '生成分享图片'
              )}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewUrl(null)}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 transition-colors"
              >
                重新生成
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-emerald-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Download size={16} />
                下载图片
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
