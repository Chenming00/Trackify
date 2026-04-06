import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { X, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'using',   label: '使用中',  color: 'text-emerald-600' },
  { value: 'retired', label: '闲置中',  color: 'text-amber-500' },
  { value: 'sold',    label: '已卖出',  color: 'text-slate-400' },
];

const EMPTY_FORM = {
  name: '',
  price: '',
  start_date: new Date().toISOString().split('T')[0],
  image_url: '',
  status: 'using',
};

export default function AssetFormModal({ isOpen, onClose, onSaved, onDeleted, editAsset }) {
  const isEdit = Boolean(editAsset);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync form data when editAsset changes
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
        const { data, error } = await supabase
          .from('assets')
          .update(payload)
          .eq('id', editAsset.id)
          .select();
        if (error) throw error;
        onSaved(data[0], 'update');
      } else {
        const { data, error } = await supabase
          .from('assets')
          .insert([payload])
          .select();
        if (error) throw error;
        onSaved(data[0], 'insert');
      }
      onClose();
    } catch (err) {
      console.error('Save error:', err);
      alert('保存失败，请检查控制台错误信息');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`确定删除「${editAsset.name}」吗？此操作不可撤销。`)) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', editAsset.id);
      if (error) throw error;
      onDeleted(editAsset.id);
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      alert('删除失败，请检查控制台错误信息');
    } finally {
      setIsDeleting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[1.5rem] w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{isEdit ? '编辑资产' : '新增资产'}</h2>
            {isEdit && <p className="text-xs text-slate-400 mt-0.5">ID: {editAsset?.id?.slice(0, 8)}…</p>}
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">资产名称</label>
            <input required type="text" placeholder="例如：MacBook Pro 16" className={inputClass} value={formData.name} onChange={set('name')} />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">购入价格 (¥)</label>
            <input required type="number" step="0.01" min="0" placeholder="例如：9999" className={inputClass} value={formData.price} onChange={set('price')} />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">开始使用日期</label>
            <input required type="date" className={`${inputClass} text-slate-700`} value={formData.start_date} onChange={set('start_date')} />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">图片链接（可选）</label>
            <input type="url" placeholder="https://..." className={inputClass} value={formData.image_url} onChange={set('image_url')} />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">状态</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, status: opt.value }))}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    formData.status === opt.value
                      ? 'border-slate-800 bg-slate-800 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : isEdit ? '保存修改' : '确认添加'}
            </button>
            {isEdit && (
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
              >
                <Trash2 size={16} />
                {isDeleting ? '删除中...' : '删除此资产'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
