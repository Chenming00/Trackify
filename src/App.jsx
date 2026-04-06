import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import AssetCard from './components/AssetCard';
import AssetListItem from './components/AssetListItem';
import AssetFormModal from './components/AssetFormModal';
import ShareModal from './components/ShareModal';
import LandingPage from './components/LandingPage';
import Logo from './components/Logo';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Plus, LayoutGrid, List, LogOut } from 'lucide-react';
import { useTranslation } from './i18n';

export default function App() {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [formModal, setFormModal] = useState({ open: false, asset: null });
  const [shareModal, setShareModal] = useState({ open: false, asset: null });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAssets();
    } else {
      setAssets([]); // Clear assets on logout
    }
  }, [session]);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', session.user.id) // Ensure we only get own assets (though RLS also handles this)
        .order('start_date', { ascending: false });
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaved = (savedAsset, mode) => {
    if (mode === 'insert') setAssets((prev) => [savedAsset, ...prev]);
    else setAssets((prev) => prev.map((a) => (a.id === savedAsset.id ? savedAsset : a)));
  };

  const handleDeleted = (id) => setAssets((prev) => prev.filter((a) => a.id !== id));

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return <LandingPage />;
  }

  const totalValue = assets.reduce((sum, a) => sum + Number(a.price), 0);
  const usingAssets = assets.filter((a) => a.status === 'using' || !a.status);
  const retiredAssets = assets.filter((a) => a.status === 'retired');
  const soldAssets = assets.filter((a) => a.status === 'sold');

  const renderAsset = (asset) =>
    viewMode === 'list' ? (
      <AssetListItem key={asset.id} asset={asset} onEdit={(a) => setFormModal({ open: true, asset: a })} onShare={(a) => setShareModal({ open: true, asset: a })} />
    ) : (
      <AssetCard key={asset.id} asset={asset} onEdit={(a) => setFormModal({ open: true, asset: a })} onShare={(a) => setShareModal({ open: true, asset: a })} />
    );

  const renderGroup = (title, items, defaultOpen = true) => {
    if (items.length === 0) return null;
    return (
      <details open={defaultOpen} className="group">
        <summary className="flex items-center gap-2 cursor-pointer select-none mb-2 list-none [&::-webkit-details-marker]:hidden">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
          <span className="text-[10px] text-slate-300 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">{items.length}</span>
          <span className="text-slate-300 text-[10px] ml-auto group-open:rotate-90 transition-transform">▶</span>
        </summary>
        {viewMode === 'list' ? (
          <div className="space-y-2">
            {items.map(renderAsset)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {items.map(renderAsset)}
          </div>
        )}
      </details>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans">
      <div className="pt-8 px-4 sm:px-6 max-w-2xl mx-auto space-y-4">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 shadow-sm rounded-xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">{t('title')}</h1>
              <p className="text-slate-400 text-sm mt-0.5 max-w-[200px] truncate">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm border border-slate-100 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl p-5 shadow-[0_8px_30px_-8px_rgba(16,185,129,0.45)] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-28 h-28 transform rotate-12 translate-x-6 -translate-y-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <p className="text-emerald-50/80 font-medium text-[10px] tracking-widest uppercase mb-1">{t('total_val')}</p>
            <h2 className="text-2xl sm:text-3xl leading-none font-extrabold tracking-tight break-words">
              ¥{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="mt-4 flex gap-2">
              <span className="bg-white/15 text-[10px] font-medium px-2.5 py-1 rounded-full">{assets.length} {t('n_assets')}</span>
              <span className="bg-white/15 text-[10px] font-medium px-2.5 py-1 rounded-full">{usingAssets.length} {t('n_using')}</span>
            </div>
          </div>
        </div>

        {/* List header + view toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">{t('list_title')}</h2>
          <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}
              title="列表模式"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}
              title="卡片模式"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-[3px] border-slate-200 border-b-emerald-500" />
            <p className="text-slate-400 text-xs">{t('loading')}</p>
          </div>
        ) : assets.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-500 font-semibold text-sm mb-1">{t('empty_title')}</p>
            <p className="text-slate-400 text-xs mb-5">{t('empty_desc')}</p>
            <button onClick={() => setFormModal({ open: true, asset: null })} className="bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition-colors">
              {t('add_now')}
            </button>
          </div>
        ) : (
          <div className="space-y-5 pt-1">
            {renderGroup(t('status_using'), usingAssets, true)}
            {renderGroup(t('status_retired'), retiredAssets, true)}
            {renderGroup(t('status_sold'), soldAssets, false)}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setFormModal({ open: true, asset: null })}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-slate-700 active:scale-90 transition-all flex items-center justify-center"
        aria-label="添加资产"
      >
        <Plus size={26} />
      </button>

      <AssetFormModal 
        isOpen={formModal.open} 
        onClose={() => setFormModal({ open: false, asset: null })} 
        editAsset={formModal.asset} 
        onSaved={handleSaved} 
        onDeleted={handleDeleted}
        user={session.user}
      />
      <ShareModal isOpen={shareModal.open} onClose={() => setShareModal({ open: false, asset: null })} asset={shareModal.asset} />
    </div>
  );
}
