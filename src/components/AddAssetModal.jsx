import React, { useState } from 'react';
import { supabase } from '../supabase';
import { X } from 'lucide-react';

export default function AddAssetModal({ isOpen, onClose, onAssetAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    start_date: new Date().toISOString().split('T')[0],
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('assets')
        .insert([
          {
            name: formData.name,
            price: Number(formData.price),
            start_date: formData.start_date,
            image_url: formData.image_url || null,
            status: 'using'
          }
        ])
        .select();

      if (error) throw error;
      
      onAssetAdded(data[0]);
      onClose();
      // reset form
      setFormData({
        name: '',
        price: '',
        start_date: new Date().toISOString().split('T')[0],
        image_url: ''
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('添加资产失败，请检查数据库配置或报错信息');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal View */}
      <div className="relative bg-white rounded-[1.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 flex justify-between items-center rounded-t-[1.5rem] bg-white">
          <h2 className="text-xl font-bold text-slate-800">新增资产</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">资产名称</label>
            <input 
              required
              placeholder="例如：MacBook Pro 16"
              type="text" 
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">购入价格 (¥)</label>
            <input 
              required
              placeholder="例如：15000"
              type="number" 
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">开始使用日期</label>
            <input 
              required
              type="date" 
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700"
              value={formData.start_date}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">图片链接 (可选)</label>
            <input 
              type="url" 
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            />
          </div>

          <div className="pt-3">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '确认添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
