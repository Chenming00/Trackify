import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useToast } from './Toast';

const EMPTY_FORM = {
  name: '',
  price: '',
  start_date: new Date().toISOString().split('T')[0],
  image_url: '',
  status: 'using',
};

export default function AssetFormModal({ isOpen, onClose, onSaved, onDeleted, editAsset, user }) {
  const { t } = useTranslation();
  const toast = useToast();
  const isEdit = Boolean(editAsset);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [imgError, setImgError] = useState(false);

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
    setConfirmDelete(false);
    setImgError(false);
  }, [editAsset, isOpen]);

  // Reset img error when URL changes
  useEffect(() => { setImgError(false); }, [formData.image_url]);

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
      toast.error(t('err_save'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('assets').delete().eq('id', editAsset.id);
      if (error) throw error;
      onDeleted(editAsset.id);
      onClose();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(t('err_del'));
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  const field = (label, input) => (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">{label}</label>
      {input}
    </div>
  );

  const inputCls = "w-full px-4 py-3 bg-slate-100/50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all outline-none text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="bg-white/90 backdrop-blur-xl w-full sm:max-w-md mt-auto sm:mt-0 sm:rounded-3xl rounded-t-[2.5rem] p-6 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] sm:shadow-2xl border-t border-slate-100 sm:border animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 fade-in duration-300 max-h-[92dvh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {isEdit ? t('edit_title') : t('add_title')}
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          {field(t('form_name'),
            <input
              required
              type="text"
              className={inputCls}
              placeholder="MacBook Pro 16"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}

          {/* Price */}
          {field(t('form_price'),
            <input
              required
              type="number"
              min="0"
              step="0.01"
              className={inputCls}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          )}

          {/* Date */}
          {field(t('form_date'),
            <input
              required
              type="date"
              className={inputCls}
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          )}

          {/* Image URL + live preview */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">
              {t('form_img')} <span className="font-normal text-slate-400">{t('form_img_opt')}</span>
            </label>
            <input
              type="url"
              className={inputCls}
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
            {/* Preview */}
            {formData.image_url && (
              <div className="mt-2 rounded-xl overflow-hidden h-28 bg-slate-100">
                {!imgError ? (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${formData.image_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-slate-400">
                    <span className="text-2xl">🖼️</span>
                    <span className="text-xs">图片加载失败</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Status — always visible */}
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

          {/* Buttons */}
          <div className="pt-2 flex gap-3">
            {isEdit && (
              confirmDelete ? (
                /* Inline delete confirmation */
                <div className="flex-1 flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-3 py-2">
                  <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
                  <span className="text-xs text-red-600 font-medium flex-1">{t('confirm_del')}</span>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-lg"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? t('deleting') : '删除'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting || isSubmitting}
                  className="flex justify-center items-center p-3.5 bg-red-50 text-red-400 rounded-2xl hover:bg-red-100 active:scale-95 transition-all outline-none disabled:opacity-50"
                  title={t('delete_btn')}
                >
                  <Trash2 size={20} />
                </button>
              )
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
