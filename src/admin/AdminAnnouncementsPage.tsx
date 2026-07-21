import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, Upload, ImageIcon, Eye } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Modal';
import { localize } from '../utils/localize';
import type { Announcement, DepartmentSlug } from '../types';

export function AdminAnnouncementsPage() {
  const { t, lang } = useI18n();
  const { announcements, departments, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAdminStore();
  const { showToast } = useToast();
  const [editing, setEditing] = useState<Partial<Announcement> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deptMap = Object.fromEntries(departments.map((d) => [d.slug, d]));

  const startNew = () => {
    setEditing({
      title: { ar: '', en: '', am: '', om: '' },
      departmentSlug: 'center-hifz' as DepartmentSlug,
      date: new Date().toISOString().split('T')[0],
      image: '',
      excerpt: { ar: '', en: '', am: '', om: '' },
      content: { ar: '', en: '', am: '', om: '' },
    });
  };

  const handleSave = () => {
    if (!editing) return;
    if (editing.id) {
      updateAnnouncement(editing.id, editing);
    } else {
      addAnnouncement(editing as Omit<Announcement, 'id'>);
    }
    showToast(t.admin.saved, 'success');
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteAnnouncement(deleteId);
      showToast(t.admin.deleted, 'success');
      setDeleteId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditing((prev) => prev ? { ...prev, image: reader.result as string } : prev);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.announcements}</h1>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          {t.admin.addAnnouncement}
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map((ann, i) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card-base p-4 flex items-center gap-4"
          >
            {ann.image ? (
              <img src={ann.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 bg-brand-bg-alt">
                <ImageIcon size={24} className="text-brand-ink-muted" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-brand-ink text-sm line-clamp-1">{localize(ann.title, lang)}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs font-semibold text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: deptMap[ann.departmentSlug]?.accentColor.base ?? '#047857' }}
                >
                  {localize(deptMap[ann.departmentSlug]?.name ?? { ar: '', en: '', am: '', om: '' }, lang)}
                </span>
                <span className="text-xs text-brand-ink-muted">{ann.date}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(ann)} className="p-2 rounded-lg text-brand-primary hover:bg-brand-primary/10 transition-colors">
                <Edit size={16} />
              </button>
              <button onClick={() => setDeleteId(ann.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {editing && (
        <Modal
          open={!!editing}
          onClose={() => setEditing(null)}
          title={editing.id ? t.admin.editAnnouncement : t.admin.addAnnouncement}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.title} ({lang})</label>
              <input
                type="text"
                value={editing.title?.[lang] ?? ''}
                onChange={(e) => setEditing({ ...editing, title: { ...editing.title!, [lang]: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.department}</label>
                <select
                  value={editing.departmentSlug}
                  onChange={(e) => setEditing({ ...editing, departmentSlug: e.target.value as DepartmentSlug })}
                  className={inputClass}
                >
                  {departments.map((d) => (
                    <option key={d.slug} value={d.slug}>{localize(d.name, lang)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.date}</label>
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.image}</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-brand-line hover:border-brand-primary transition-colors text-sm font-medium text-brand-ink-soft"
                >
                  <Upload size={18} />
                  {lang === 'ar' ? 'رفع صورة' : 'Upload Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input
                  type="text"
                  value={editing.image ?? ''}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  placeholder={lang === 'ar' ? 'أو الصق رابط الصورة' : 'Or paste image URL'}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
                {editing.image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-bg-alt shrink-0">
                    <img src={editing.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.excerpt} ({lang})</label>
              <textarea
                rows={2}
                value={editing.excerpt?.[lang] ?? ''}
                onChange={(e) => setEditing({ ...editing, excerpt: { ...editing.excerpt!, [lang]: e.target.value } })}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.content} ({lang})</label>
              <textarea
                rows={4}
                value={editing.content?.[lang] ?? ''}
                onChange={(e) => setEditing({ ...editing, content: { ...editing.content!, [lang]: e.target.value } })}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                <Save size={18} />
                {t.common.save}
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all"
              >
                <Eye size={18} />
                {lang === 'ar' ? 'معاينة' : 'Preview'}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all"
              >
                <X size={18} />
                {t.common.cancel}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)} title={lang === 'ar' ? 'معاينة الإعلان' : 'Announcement Preview'} size="md">
        {editing && (
          <div className="space-y-4">
            {editing.image && (
              <div className="rounded-xl overflow-hidden">
                <img src={editing.image} alt="" className="w-full h-48 object-cover" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {editing.departmentSlug && (
                <span
                  className="text-xs font-semibold text-white px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: deptMap[editing.departmentSlug]?.accentColor.base ?? '#047857' }}
                >
                  {localize(deptMap[editing.departmentSlug]?.name ?? { ar: '', en: '', am: '', om: '' }, lang)}
                </span>
              )}
              <span className="text-xs text-brand-ink-muted">{editing.date}</span>
            </div>
            <h2 className="text-xl font-bold text-brand-ink">{localize(editing.title ?? { ar: '', en: '', am: '', om: '' }, lang) || (lang === 'ar' ? 'بدون عنوان' : 'Untitled')}</h2>
            <p className="text-sm text-brand-ink-soft leading-relaxed">{localize(editing.excerpt ?? { ar: '', en: '', am: '', om: '' }, lang)}</p>
            <p className="text-sm text-brand-ink-soft leading-relaxed whitespace-pre-line">{localize(editing.content ?? { ar: '', en: '', am: '', om: '' }, lang)}</p>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title={t.admin.confirmDelete} size="sm">
        <div>
          <p className="text-brand-ink-soft mb-6">{t.admin.confirmDeleteMessage}</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all">
              {t.common.delete}
            </button>
            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all">
              {t.common.cancel}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
