import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import AssetCard from './components/AssetCard';
import AssetFormModal from './components/AssetFormModal';
import ShareModal from './components/ShareModal';
import { Plus } from 'lucide-react';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [formModal, setFormModal] = useState({ open: false, asset: null }); // null = add, object = edit
  const [shareModal, setShareModal] = useState({ open: false, asset: null });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('start_date', { ascending: false });
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Called after insert or update
  const handleSaved = (savedAsset, mode) => {
    if (mode === 'insert') {
      setAssets((prev) => [savedAsset, ...prev]);
    } else {
      setAssets((prev) => prev.map((a) => (a.id === savedAsset.id ? savedAsset : a)));
    }
  };

  // Called after delete
  const handleDeleted = (id) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const totalValue = assets.reduce((sum, a) => sum + Number(a.price), 0);
  const activeCount = assets.filter((a) => a.status !== 'sold').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans">
      <div className="pt-10 px-4 sm:px-6 max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">我的资产</h1>
          <p className="text-slate-400 text-sm mt-1">追踪你的每一分投入</p>
        </div>

        {/* Total Value Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-[1.75rem] p-6 sm:p-7 shadow-[0_12px_40px_-10px_rgba(16,185,129,0.5)] text-white mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-32 h-32 sm:w-40 sm:h-40 transform rotate-12 translate-x-8 -translate-y-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <p className="text-emerald-50/90 font-medium mb-1.5 text-xs sm:text-sm tracking-wide uppercase">资产总值 (¥)</p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] leading-none font-bold tracking-tight break-words">
              {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="mt-6 sm:mt-8 flex gap-2">
              <div className="bg-black/15 text-emerald-50 text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
                共 {assets.length} 项
              </div>
              <div className="bg-black/15 text-emerald-50 text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
                {activeCount} 项使用中
              </div>
            </div>
          </div>
        </div>

        {/* Asset List */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">资产列表</h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="animate-spin rounded-full h-9 w-9 border-[3px] border-slate-200 border-b-emerald-500" />
              <p className="text-slate-400 text-sm">加载中...</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="bg-white rounded-[1.5rem] border-2 border-dashed border-slate-200 p-10 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-slate-500 font-semibold mb-1">还没有任何资产</p>
              <p className="text-slate-400 text-sm mb-6">点击右下角 + 按钮添加第一项</p>
              <button
                onClick={() => setFormModal({ open: true, asset: null })}
                className="bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-600 transition-colors shadow-sm"
              >
                立即添加
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onEdit={(a) => setFormModal({ open: true, asset: a })}
                  onShare={(a) => setShareModal({ open: true, asset: a })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setFormModal({ open: true, asset: null })}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center"
        aria-label="添加资产"
      >
        <Plus size={26} />
      </button>

      {/* Unified Add / Edit Modal */}
      <AssetFormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, asset: null })}
        editAsset={formModal.asset}
        onSaved={handleSaved}
        onDeleted={handleDeleted}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.open}
        onClose={() => setShareModal({ open: false, asset: null })}
        asset={shareModal.asset}
      />
    </div>
  );
}
