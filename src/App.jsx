import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import AssetCard from './components/AssetCard';
import AssetListItem from './components/AssetListItem';
import AssetFormModal from './components/AssetFormModal';
import ShareModal from './components/ShareModal';
import LandingPage from './components/LandingPage';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Logo from './components/Logo';
import { Plus, LayoutGrid, List, LogOut, ArrowDownUp, Clock, Tag } from 'lucide-react';
import { useTranslation } from './i18n';
import { ToastProvider, useToast } from './components/Toast';

function AppContent() {
  const { t, setLang } = useTranslation();
  const toast = useToast();
  const [session, setSession] = useState(null);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [formModal, setFormModal] = useState({ open: false, asset: null });
  const [shareModal, setShareModal] = useState({ open: false, asset: null });
  const [view, setView] = useState('main'); // 'main', 'terms', 'privacy'
  const [sortBy, setSortBy] = useState('date_desc'); // date_desc, cost_desc, price_desc
  
  // Array of open group titles (using string titles as keys)
  const [openGroups, setOpenGroups] = useState({ [t('status_using')]: true, [t('status_retired')]: true });

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
      // 登录后强制锁定为中文 (Requested by user)
      setLang('zh-CN');
      fetchAssets();
    } else {
      setAssets([]); // Clear assets on logout
    }
  }, [session, setLang]);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', session.user.id)
        .order('start_date', { ascending: false });
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error('获取列表失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaved = (savedAsset, mode) => {
    if (mode === 'insert') {
      setAssets((prev) => [savedAsset, ...prev]);
      toast.success('资产添加成功');
    } else {
      setAssets((prev) => prev.map((a) => (a.id === savedAsset.id ? savedAsset : a)));
      toast.success('修改已保存');
    }
  };

  const handleDeleted = (id) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    toast.success('已删除资产');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (view === 'terms') {
    return <Terms onBack={() => setView('main')} />;
  }

  if (view === 'privacy') {
    return <Privacy onBack={() => setView('main')} />;
  }

  if (!session) {
    return <LandingPage onNavigate={setView} />;
  }

  // Derived stats
  const totalValue = assets.reduce((sum, a) => sum + Number(a.price), 0);
  const usingAssets = assets.filter((a) => a.status === 'using' || !a.status);
  const retiredAssets = assets.filter((a) => a.status === 'retired');
  const soldAssets = assets.filter((a) => a.status === 'sold');
  
  // Calculate today's total daily cost for "using" assets
  const todayTotalCost = usingAssets.reduce((sum, a) => {
    const days = Math.max(1, Math.floor((Date.now() - new Date(a.start_date).getTime()) / 86400000));
    return sum + (a.price / days);
  }, 0);

  // Sorting
  const sortAssets = (arr) => {
    return [...arr].sort((a, b) => {
      const aDays = Math.max(1, Math.floor((Date.now() - new Date(a.start_date)) / 86400000));
      const bDays = Math.max(1, Math.floor((Date.now() - new Date(b.start_date)) / 86400000));
      const aCost = Number(a.price) / aDays;
      const bCost = Number(b.price) / bDays;

      if (sortBy === 'cost_desc') return bCost - aCost;
      if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
      // default: date_desc
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
    });
  };

  const renderAsset = (asset) =>
    viewMode === 'list' ? (
      <AssetListItem key={asset.id} asset={asset} onEdit={(a) => setFormModal({ open: true, asset: a })} onShare={(a) => setShareModal({ open: true, asset: a })} />
    ) : (
      <AssetCard key={asset.id} asset={asset} onEdit={(a) => setFormModal({ open: true, asset: a })} onShare={(a) => setShareModal({ open: true, asset: a })} />
    );

  const toggleGroup = (title) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const renderGroup = (title, items) => {
    if (items.length === 0) return null;
    const isOpen = openGroups[title];
    const sortedItems = sortAssets(items);

    return (
      <div className="group mb-5">
        <button 
          onClick={() => toggleGroup(title)}
          className="flex items-center gap-2 cursor-pointer select-none mb-2 outline-none w-full"
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
          <span className="text-[10px] text-slate-300 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">{items.length}</span>
          <span className={`text-slate-300 text-[10px] ml-auto transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}>▶</span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            {viewMode === 'list' ? (
              <div className="space-y-2 pb-1">
                {sortedItems.map(renderAsset)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-1">
                {sortedItems.map(renderAsset)}
              </div>
            )}
          </div>
        </div>
      </div>
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
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-slate-500 bg-white hover:bg-slate-100 rounded-full shadow-sm border border-slate-100 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_-8px_rgba(16,185,129,0.45)] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-28 h-28 transform rotate-12 translate-x-6 -translate-y-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            {/* Top row: Total Value */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-emerald-50/80 font-medium text-[10px] tracking-widest uppercase">{t('total_val')}</p>
                <div className="flex gap-1.5">
                  <span className="bg-white/15 text-[10px] font-medium px-2 py-0.5 rounded-md">{assets.length} {t('n_assets')}</span>
                  <span className="bg-white/15 text-[10px] font-medium px-2 py-0.5 rounded-md">{usingAssets.length} {t('n_using')}</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl leading-none font-extrabold tracking-tight break-words">
                ¥{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            {/* Bottom Row: Today's Total Cost */}
            <div className="bg-black/10 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
              <span className="text-xs font-semibold text-emerald-50 opacity-90">今日总摊销成本</span>
              <span className="text-lg font-black tracking-tight">¥{todayTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* List controls: Sort & View Toggle */}
        <div className="flex items-center justify-between mt-6">
          {/* Sorting */}
          <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setSortBy('date_desc')}
              className={`flex items-center gap-1.5 p-1.5 px-2.5 rounded-md transition-all text-xs font-semibold ${sortBy === 'date_desc' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}
            >
              <Clock size={13} />
              <span className="hidden sm:inline">最新</span>
            </button>
            <button
              onClick={() => setSortBy('cost_desc')}
              className={`flex items-center gap-1.5 p-1.5 px-2.5 rounded-md transition-all text-xs font-semibold ${sortBy === 'cost_desc' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}
            >
              <ArrowDownUp size={13} />
              <span className="hidden sm:inline">降序</span>
              <span>成本</span>
            </button>
            <button
              onClick={() => setSortBy('price_desc')}
              className={`flex items-center gap-1.5 p-1.5 px-2.5 rounded-md transition-all text-xs font-semibold ${sortBy === 'price_desc' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}
            >
              <Tag size={13} />
              <span className="hidden sm:inline">降序</span>
              <span>总价</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5 ml-auto">
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
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center mt-2">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-500 font-semibold text-sm mb-1">{t('empty_title')}</p>
            <p className="text-slate-400 text-xs mb-5">{t('empty_desc')}</p>
            <button onClick={() => setFormModal({ open: true, asset: null })} className="bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">
              {t('add_now')}
            </button>
          </div>
        ) : (
          <div className="pt-2">
            {renderGroup(t('status_using'), usingAssets)}
            {renderGroup(t('status_retired'), retiredAssets)}
            {renderGroup(t('status_sold'), soldAssets)}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setFormModal({ open: true, asset: null })}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center"
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
      
      <footer className="mt-8 pb-12 text-center text-[10px] text-slate-300 font-medium">
        <div className="flex justify-center gap-4 mb-2">
          <button onClick={() => setView('terms')} className="hover:text-slate-400 transition-colors">使用条款</button>
          <button onClick={() => setView('privacy')} className="hover:text-slate-400 transition-colors">隐私政策</button>
        </div>
        <p>TRACKIFY © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

// Wrap AppContent in ToastProvider at root
export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
