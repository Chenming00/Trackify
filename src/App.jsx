import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import AssetCard from './components/AssetCard';
import AddAssetModal from './components/AddAssetModal';
import { Plus } from 'lucide-react';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAssetAdded = (newAsset) => {
    setAssets([newAsset, ...assets]);
  };

  const totalValue = assets.reduce((sum, asset) => sum + Number(asset.price), 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="pt-12 px-5 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">我的资产</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-800 text-white p-2.5 rounded-full hover:bg-slate-700 transition-transform active:scale-95 shadow-md"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Top Green Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-[2rem] p-7 shadow-[0_12px_40px_-10px_rgba(16,185,129,0.5)] text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-40 h-40 transform rotate-12 translate-x-10 -translate-y-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <p className="text-emerald-50/90 font-medium mb-1.5 text-sm tracking-wide">资产总值 (¥)</p>
            <h2 className="text-[2.75rem] leading-none font-bold tracking-tight">
              {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="mt-8 flex items-center inline-flex">
              <div className="bg-black/15 text-emerald-50 text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-md">
                共 {assets.length} 项在管资产
              </div>
            </div>
          </div>
        </div>

        {/* Assets List */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800 mb-5 ml-1">资产列表</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : assets.length === 0 ? (
            <div className="bg-white rounded-[1.5rem] border border-slate-200 border-dashed p-10 text-center shadow-sm">
              <p className="text-slate-400 mb-4 font-medium">暂无添加任何资产</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-50 text-emerald-600 font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-100 transition-colors"
              >
                添加第一项资产
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {assets.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddAssetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAssetAdded={handleAssetAdded} 
      />
    </div>
  );
}
