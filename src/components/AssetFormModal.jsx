import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { X, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'using',   label: '使用中' },
  { value: 'retired', label: '闲置中' },
  { value: 'sold',    label: '已卖出' },
];

const EMPTY_FORM = {
  name: '',
  price: '',
  start_date: new Date().toISOString().split('T')[0],
  image_url: '',
  status: 'using',
};

export default function AssetFormModal({ isOpen, onClose, onSaved, onDeleted, editAsset, user }) {
  const isEdit = Boolean(editAsset);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (editAsset) {
      setFormData({
        name: editAsset.name || '',
        price: editAsset.price ?? '',
        start_date: editAsset.start_date || new Date().toISOString().split('T')[0],
        image_url: editAsset.image_url || '',
        status: editAsset.status || 'using',
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [editAsset, isOpen]);

  if (!isOpen) return null;

  const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        start_date: formData.start_date,
        image_url: formData.image_url || null,
        status: formData.status,
      };
      if (isEdit) {
        const { data, error } = await supabase.from('assets').update(payload).eq('id', editAsset.id).select();
        if (error) throw error;
        onSaved(data[0], 'update');
      } else {
        const { data, error } = await supabase.from('assets').insert([{ ...payload, user_id: user.id }]).select();
        if (error) throw error;
        onSaved(data[0], 'insert');
      }
      onClose();
    } catch (err) {
      console.error('Save error:', err);
      alert('保存失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`确定删除「${editAsset.name}」吗？`)) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('assets').delete().eq('id', editAsset.id);
      if (error) throw error;
      onDeleted(editAsset.id);
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      alert('删除失败');
    } finally {
      setIsDeleting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-100 border-0 text-[15px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet — slides up on mobile, centered on tablet+ */}
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* iOS-style drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">{isEdit ? '编辑资产' : '新增资产'}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1 uppercase tracking-wide">资产名称</label>
            <input required type="text" placeholder="MacBook Pro 16&quot;" className={inputClass} value={formData.name} onChange={set('name')} />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1 uppercase tracking-wide">购入价格 (¥)</label>
            <input required type="number" step="0.01" min="0" placeholder="9999" className={inputClass} value={formData.price} onChange={set('price')} />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1 uppercase tracking-wide">开始使用日期</label>
            <input required type="date" className={`${inputClass} text-slate-700`} value={formData.start_date} onChange={set('start_date')} />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1 uppercase tracking-wide">图片链接 <span className="text-slate-400 normal-case">(可选)</span></label>
            <input type="url" placeholder="https://..." className={inputClass} value={formData.image_url} onChange={set('image_url')} />
          </div>

          {/* Status — iOS segmented control */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 ml-1 uppercase tracking-wide">状态</label>
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, status: opt.value }))}
                  className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                    formData.status === opt.value
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-all shadow-md disabled:opacity-60"
          >
            {isSubmitting ? '保存中...' : isEdit ? '保存修改' : '确认添加'}
          </button>

          {/* Delete */}
          {isEdit && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              <Trash2 size={15} />
              {isDeleting ? '删除中...' : '删除此资产'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
