import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { X, Trash2 } from 'lucide-react';
import { useTranslation } from '../i18n';

const EMPTY_FORM = {
  name: '',
  price: '',
  start_date: new Date().toISOString().split('T')[0],
  image_url: '',
  status: 'using',
};

export default function AssetFormModal({ isOpen, onClose, onSaved, onDeleted, editAsset, user }) {
  const { t } = useTranslation();
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
    } catch (error) {
      console.error('Error saving asset:', error);
      alert(t('err_save'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isEdit && window.confirm(t('confirm_del'))) {
      setIsDeleting(true);
      try {
        const { error } = await supabase.from('assets').delete().eq('id', editAsset.id);
        if (error) throw error;
        onDeleted(editAsset.id);
        onClose();
      } catch (error) {
        console.error('Error deleting:', error);
        alert(t('err_del'));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet — slides up on mobile, centered on tablet+ */}
      <div className="bg-white/80 backdrop-blur-xl w-full sm:max-w-md mt-auto sm:mt-0 sm:rounded-3xl rounded-t-[2.5rem] p-6 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] sm:shadow-2xl border-t border-slate-100 sm:border animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{isEdit ? t('edit_title') : t('add_title')}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">{t('form_name')}</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-slate-100/50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all outline-none text-sm"
              placeholder="MacBook Pro 16"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">{t('form_price')}</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-slate-100/50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all outline-none text-sm"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">{t('form_date')}</label>
            <input
              required
              type="date"
              className="w-full px-4 py-3 bg-slate-100/50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm font-medium transition-all outline-none"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">
              {t('form_img')} <span className="font-normal text-slate-400">{t('form_img_opt')}</span>
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 bg-slate-100/50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all outline-none text-sm"
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          {isEdit && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">{t('form_status')}</label>
              <div className="flex bg-slate-100/50 p-1.5 rounded-2xl">
                {['using', 'retired', 'sold'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      formData.status === status
                        ? 'bg-white text-emerald-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t(`status_${status}`)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting || isSubmitting}
                className="flex justify-center items-center p-3.5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 active:scale-95 transition-all outline-none disabled:opacity-50"
                title={t('delete_btn')}
              >
                <Trash2 size={20} />
              </button>
            )}
              <button
                type="submit"
                disabled={isSubmitting || isDeleting}
                className="flex-1 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 rounded-2xl shadow-md active:scale-95 transition-all outline-none disabled:opacity-70 disabled:scale-100 text-[15px]"
              >
                {isSubmitting ? t('saving') : isEdit ? t('save_edit') : t('save_add')}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
