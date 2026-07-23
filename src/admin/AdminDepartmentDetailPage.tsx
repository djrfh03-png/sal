import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Settings2, Megaphone, FileText, FileCheck,
  Plus, Trash2, Edit, Save, X, Upload, ImageIcon, Send,
  BarChart3, ExternalLink, type LucideIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from './AdminStore';
import { useToast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Modal';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import type { Announcement, Post, PostType, Registration, RegistrationStatus, LocalizedName, Department } from '../types';

type Tab = 'settings' | 'announcements' | 'posts' | 'registrations';

const statusMeta: Record<RegistrationStatus, { color: string; labelKey: 'open' | 'closed' | 'comingSoon' }> = {
  open: { color: '#22c55e', labelKey: 'open' },
  closed: { color: '#ef4444', labelKey: 'closed' },
  coming_soon: { color: '#C9A227', labelKey: 'comingSoon' },
};

const regStatusColors: Record<Registration['status'], string> = {
  pending: '#925E06',
  reviewed: '#1E3A8A',
  accepted: '#22c55e',
  rejected: '#ef4444',
};

const langsList: { key: keyof LocalizedName; label: string }[] = [
  { key: 'ar', label: 'العربية' },
  { key: 'en', label: 'English' },
  { key: 'am', label: 'አማርኛ' },
  { key: 'om', label: 'Afaan Oromoo' },
];

export function AdminDepartmentDetailPage() {
  const { slug } = useParams();
  const { t, lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const store = useAdminStore();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('settings');

  const department = store.departments.find((d) => d.slug === slug);

  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
        <Link to="/admin/dashboard" className="text-brand-primary font-semibold">{t.admin.departments}</Link>
      </div>
    );
  }

  const accent = department.accentColor.base;
  const deptAnnouncements = store.announcements.filter((a) => a.departmentSlug === department.slug);
  const deptPosts = store.posts.filter((p) => p.departmentSlug === department.slug);
  const deptRegistrations = store.registrations.filter((r) => r.departmentSlug === department.slug);

  const tabs: { key: Tab; label: string; icon: LucideIcon; count?: number }[] = [
    { key: 'settings', label: lang === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings2 },
    { key: 'announcements', label: t.admin.announcements, icon: Megaphone, count: deptAnnouncements.length },
    { key: 'posts', label: t.admin.posts, icon: FileText, count: deptPosts.length },
    { key: 'registrations', label: t.admin.registrations, icon: FileCheck, count: deptRegistrations.length },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/admin/dashboard" className={`inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink-muted hover:text-brand-primary transition-colors mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Arrow size={14} />
          {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '14' }}>
            <DepartmentLogo slug={department.slug} size="md" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-brand-ink leading-tight">{localize(department.name, lang)}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusMeta[department.registrationStatus].color }} />
              <span className="text-[11px] text-brand-ink-muted">{t.admin[statusMeta[department.registrationStatus].labelKey]}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                active ? 'text-white shadow-card' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
              }`}
              style={active ? { backgroundColor: accent } : {}}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-brand-bg-alt'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'settings' && (
            <SettingsTab department={department} accent={accent} lang={lang} t={t} showToast={showToast} store={store} />
          )}
          {activeTab === 'announcements' && (
            <AnnouncementsTab department={department} accent={accent} lang={lang} t={t} showToast={showToast} store={store} items={deptAnnouncements} />
          )}
          {activeTab === 'posts' && (
            <PostsTab department={department} accent={accent} lang={lang} t={t} showToast={showToast} store={store} items={deptPosts} />
          )}
          {activeTab === 'registrations' && (
            <RegistrationsTab accent={accent} lang={lang} t={t} items={deptRegistrations} store={store} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Settings Tab ───────────────────────────────────────────────────────────

function SettingsTab({ department, accent, lang, t, showToast, store }: {
  department: Department; accent: string; lang: string; t: any; showToast: (m: string, s: string) => void; store: ReturnType<typeof useAdminStore>;
}) {
  const [statDrafts, setStatDrafts] = useState<number[]>(department.stats.map((s) => s.value));
  const [reqDrafts, setReqDrafts] = useState<LocalizedName>({ ...department.requirements });
  const [tgDraft, setTgDraft] = useState<string>(department.telegramChatId);
  const [coverDraft, setCoverDraft] = useState<string>(department.coverImage);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    statDrafts.forEach((val, i) => store.updateDepartmentStat(department.id, i, val));
    (Object.keys(reqDrafts) as (keyof LocalizedName)[]).forEach((l) => store.updateDepartmentRequirements(department.id, l, reqDrafts[l]));
    store.updateDepartmentTelegram(department.id, tgDraft);
    if (coverDraft !== department.coverImage) store.updateDepartment(department.id, { coverImage: coverDraft });
    showToast(t.admin.saved, 'success');
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setCoverDraft(reader.result as string); reader.readAsDataURL(file); }
  };

  return (
    <div className="space-y-5">
      {/* Cover Photo */}
      <SettingsCard accent={accent} icon={ImageIcon} title={lang === 'ar' ? 'صورة الغلاف' : 'Cover Photo'}>
        <div className="space-y-3">
          <div className="relative h-32 rounded-xl overflow-hidden border border-brand-line">
            {coverDraft ? (
              <>
                <img src={coverDraft} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setCoverDraft('')} className="absolute top-2 end-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"><X size={13} /></button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-bg-alt text-brand-ink-muted text-xs">{lang === 'ar' ? 'لا توجد صورة' : 'No image'}</div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => coverInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-brand-line hover:border-brand-primary transition-colors text-sm font-medium text-brand-ink-soft">
              <Upload size={15} />{lang === 'ar' ? 'رفع صورة' : 'Upload'}
            </button>
            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            <input type="text" value={coverDraft.startsWith('data:') ? '' : coverDraft} onChange={(e) => setCoverDraft(e.target.value)} placeholder={lang === 'ar' ? 'أو رابط صورة' : 'Or image URL'} className="flex-1 px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm" />
          </div>
        </div>
      </SettingsCard>

      {/* Registration status */}
      <SettingsCard accent={accent} icon={Settings2} title={lang === 'ar' ? 'حالة التسجيل' : 'Registration Status'}>
        <div className="flex gap-2 flex-wrap">
          {(['open', 'coming_soon', 'closed'] as RegistrationStatus[]).map((s) => {
            const sm = statusMeta[s];
            const active = department.registrationStatus === s;
            return (
              <button key={s} onClick={() => { store.setRegistrationStatus(department.slug, s); showToast(t.admin.saved, 'success'); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${active ? 'text-white shadow-sm' : 'bg-brand-bg-alt text-brand-ink-muted hover:text-brand-ink'}`}
                style={active ? { backgroundColor: sm.color } : {}}>
                {t.admin[sm.labelKey]}
              </button>
            );
          })}
        </div>
      </SettingsCard>

      {/* Stats */}
      <SettingsCard accent={accent} icon={BarChart3} title={t.admin.statistics}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {department.stats.map((stat, si) => (
            <div key={si}>
              <label className="block text-xs font-semibold text-brand-ink mb-1">{localize(stat.label, lang)}</label>
              <input type="number" value={statDrafts[si] ?? 0}
                onChange={(e) => setStatDrafts((prev) => prev.map((v, j) => j === si ? parseInt(e.target.value) || 0 : v))}
                className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm" />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Requirements */}
      <SettingsCard accent={accent} icon={FileCheck} title={lang === 'ar' ? 'شروط التسجيل' : 'Registration Requirements'}>
        <div className="space-y-2.5">
          {langsList.map((l) => (
            <div key={l.key}>
              <label className="block text-[11px] font-semibold text-brand-ink-muted mb-1">{l.label}</label>
              <textarea value={reqDrafts[l.key] ?? ''} rows={2}
                onChange={(e) => setReqDrafts((prev) => ({ ...prev, [l.key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs resize-y" />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Telegram */}
      <SettingsCard accent={accent} icon={Send} title={lang === 'ar' ? 'معرّف تلجرام' : 'Telegram Chat ID'}>
        <input type="text" value={tgDraft} onChange={(e) => setTgDraft(e.target.value)} placeholder="-1001234567890"
          className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm font-mono" />
        <p className="text-[10px] text-brand-ink-muted mt-1.5">
          {lang === 'ar' ? 'سيتم إرسال التسجيلات تلقائياً إلى هذا المحادثة' : 'Registrations are automatically sent to this chat'}
        </p>
      </SettingsCard>

      {/* Save + view */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link to={`/departments/${department.slug}`} target="_blank"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors">
          <ExternalLink size={12} />
          {lang === 'ar' ? 'عرض في الموقع' : 'View on site'}
        </Link>
        <button onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-xs hover:shadow-lg transition-all">
          <Save size={14} />
          {t.common.save}
        </button>
      </div>
    </div>
  );
}

// ─── Announcements Tab ──────────────────────────────────────────────────────

function AnnouncementsTab({ department, accent, lang, t, showToast, store, items }: {
  department: Department; accent: string; lang: string; t: any; showToast: (m: string, s: string) => void; store: ReturnType<typeof useAdminStore>; items: Announcement[];
}) {
  const [editing, setEditing] = useState<Partial<Announcement> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm';

  const startNew = () => setEditing({
    title: { ar: '', en: '', am: '', om: '' }, departmentSlug: department.slug,
    date: new Date().toISOString().split('T')[0], image: '',
    excerpt: { ar: '', en: '', am: '', om: '' }, content: { ar: '', en: '', am: '', om: '' },
  });

  const handleSave = () => {
    if (!editing) return;
    if (editing.id) store.updateAnnouncement(editing.id, editing);
    else store.addAnnouncement(editing as Omit<Announcement, 'id'>);
    showToast(t.admin.saved, 'success');
    setEditing(null);
  };

  const handleDelete = () => { if (deleteId) { store.deleteAnnouncement(deleteId); showToast(t.admin.deleted, 'success'); setDeleteId(null); } };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setEditing((prev) => prev ? { ...prev, image: reader.result as string } : prev); reader.readAsDataURL(file); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-brand-ink text-sm">{t.admin.announcements}</h2>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all" style={{ backgroundColor: accent }}>
          <Plus size={16} />{t.admin.addAnnouncement}
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Megaphone} accent={accent} label={lang === 'ar' ? 'لا توجد إعلانات' : 'No announcements yet'} />
      ) : (
        <div className="space-y-3">
          {items.map((ann, i) => (
            <motion.div key={ann.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-base p-4 flex items-center gap-4">
              {ann.image ? <img src={ann.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                : <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-brand-bg-alt"><ImageIcon size={20} className="text-brand-ink-muted" /></div>}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand-ink text-sm line-clamp-1">{localize(ann.title, lang)}</h3>
                <span className="text-xs text-brand-ink-muted">{ann.date}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(ann)} className="p-2 rounded-lg hover:bg-brand-primary/10 transition-colors" style={{ color: accent }}><Edit size={15} /></button>
                <button onClick={() => setDeleteId(ann.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {editing && (
        <Modal open={!!editing} onClose={() => setEditing(null)} title={editing.id ? t.admin.editAnnouncement : t.admin.addAnnouncement} size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.title} ({lang})</label>
              <input type="text" value={editing.title?.[lang as keyof LocalizedName] ?? ''} onChange={(e) => setEditing({ ...editing, title: { ...editing.title!, [lang]: e.target.value } })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.date}</label>
              <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.image}</label>
              <div className="flex items-center gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-brand-line hover:border-brand-primary transition-colors text-sm font-medium text-brand-ink-soft">
                  <Upload size={16} />{lang === 'ar' ? 'رفع صورة' : 'Upload'}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <input type="text" value={editing.image ?? ''} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder={lang === 'ar' ? 'أو رابط' : 'Or URL'} className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.excerpt} ({lang})</label>
              <textarea rows={2} value={editing.excerpt?.[lang as keyof LocalizedName] ?? ''} onChange={(e) => setEditing({ ...editing, excerpt: { ...editing.excerpt!, [lang]: e.target.value } })} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.content} ({lang})</label>
              <textarea rows={4} value={editing.content?.[lang as keyof LocalizedName] ?? ''} onChange={(e) => setEditing({ ...editing, content: { ...editing.content!, [lang]: e.target.value } })} className={`${inputClass} resize-none`} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all" style={{ backgroundColor: accent }}><Save size={16} />{t.common.save}</button>
              <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all"><X size={16} />{t.common.cancel}</button>
            </div>
          </div>
        </Modal>
      )}

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title={t.admin.confirmDelete} size="sm">
        <p className="text-brand-ink-soft mb-6">{t.admin.confirmDeleteMessage}</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all">{t.common.delete}</button>
          <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all">{t.common.cancel}</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Posts Tab ──────────────────────────────────────────────────────────────

function PostsTab({ department, accent, lang, t, showToast, store, items }: {
  department: Department; accent: string; lang: string; t: any; showToast: (m: string, s: string) => void; store: ReturnType<typeof useAdminStore>; items: Post[];
}) {
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm';
  const typeIcon: Record<PostType, typeof FileText> = { image: ImageIcon, video: FileText, article: FileText };

  const startNew = () => setEditing({
    type: 'article' as PostType, departmentSlug: department.slug,
    title: { ar: '', en: '', am: '', om: '' }, media: '',
    content: { ar: '', en: '', am: '', om: '' }, date: new Date().toISOString().split('T')[0],
  });

  const handleSave = () => {
    if (!editing) return;
    if (editing.id) store.updatePost(editing.id, editing);
    else store.addPost(editing as Omit<Post, 'id'>);
    showToast(t.admin.saved, 'success');
    setEditing(null);
  };

  const handleDelete = () => { if (deleteId) { store.deletePost(deleteId); showToast(t.admin.deleted, 'success'); setDeleteId(null); } };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setEditing((prev) => prev ? { ...prev, media: reader.result as string } : prev); reader.readAsDataURL(file); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-brand-ink text-sm">{t.admin.posts}</h2>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all" style={{ backgroundColor: accent }}>
          <Plus size={16} />{t.admin.addPost}
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={FileText} accent={accent} label={lang === 'ar' ? 'لا توجد منشورات' : 'No posts yet'} />
      ) : (
        <div className="space-y-3">
          {items.map((post, i) => {
            const Icon = typeIcon[post.type];
            return (
              <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card-base p-4 flex items-center gap-4">
                {post.media ? <img src={post.media} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  : <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-brand-bg-alt"><Icon size={20} className="text-brand-ink-muted" /></div>}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand-ink text-sm line-clamp-1">{localize(post.title, lang)}</h3>
                  <span className="text-xs text-brand-ink-muted">{post.date}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditing(post)} className="p-2 rounded-lg hover:bg-brand-primary/10 transition-colors" style={{ color: accent }}><Edit size={15} /></button>
                  <button onClick={() => setDeleteId(post.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {editing && (
        <Modal open={!!editing} onClose={() => setEditing(null)} title={editing.id ? t.admin.editPost : t.admin.addPost} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.type}</label>
                <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value as PostType })} className={inputClass}>
                  <option value="image">{t.posts.image}</option>
                  <option value="video">{t.posts.video}</option>
                  <option value="article">{t.posts.article}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.date}</label>
                <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.title} ({lang})</label>
              <input type="text" value={editing.title?.[lang as keyof LocalizedName] ?? ''} onChange={(e) => setEditing({ ...editing, title: { ...editing.title!, [lang]: e.target.value } })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.media}</label>
              <div className="flex items-center gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-brand-line hover:border-brand-primary transition-colors text-sm font-medium text-brand-ink-soft">
                  <Upload size={16} />{lang === 'ar' ? 'رفع' : 'Upload'}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                <input type="text" value={editing.media ?? ''} onChange={(e) => setEditing({ ...editing, media: e.target.value })} placeholder={lang === 'ar' ? 'أو رابط' : 'Or URL'} className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.content} ({lang})</label>
              <textarea rows={4} value={editing.content?.[lang as keyof LocalizedName] ?? ''} onChange={(e) => setEditing({ ...editing, content: { ...editing.content!, [lang]: e.target.value } })} className={`${inputClass} resize-none`} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all" style={{ backgroundColor: accent }}><Save size={16} />{t.common.save}</button>
              <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all"><X size={16} />{t.common.cancel}</button>
            </div>
          </div>
        </Modal>
      )}

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title={t.admin.confirmDelete} size="sm">
        <p className="text-brand-ink-soft mb-6">{t.admin.confirmDeleteMessage}</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all">{t.common.delete}</button>
          <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all">{t.common.cancel}</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Registrations Tab ──────────────────────────────────────────────────────

function RegistrationsTab({ accent, lang, t, items, store }: {
  accent: string; lang: string; t: any; items: Registration[]; store: ReturnType<typeof useAdminStore>;
}) {
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  if (items.length === 0) {
    return <EmptyState icon={FileCheck} accent={accent} label={lang === 'ar' ? 'لا توجد تسجيلات' : 'No registrations yet'} />;
  }

  return (
    <div>
      <h2 className="font-bold text-brand-ink text-sm mb-4">{t.admin.registrations}</h2>
      <div className="space-y-3">
        {items.map((reg, i) => (
          <motion.div key={reg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.03 }}
            onClick={() => setSelectedReg(reg)} className="card-base p-4 cursor-pointer hover:bg-brand-bg-alt/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-brand-ink text-sm">{reg.fullName}</h3>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: regStatusColors[reg.status] + '20', color: regStatusColors[reg.status] }}>{reg.status}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-ink-soft">
              <span>{reg.phone}</span>
              <span>· {reg.age}y</span>
              <span>· {reg.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={!!selectedReg} onClose={() => setSelectedReg(null)} title={t.admin.applicantDetail} size="md">
        {selectedReg && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailField label={t.registration.fullName} value={selectedReg.fullName} />
              <DetailField label={t.registration.phone} value={selectedReg.phone} />
              <DetailField label={t.registration.age} value={String(selectedReg.age)} />
              <DetailField label={t.registration.email} value={selectedReg.email || '-'} />
              <DetailField label={t.registration.address} value={selectedReg.address || '-'} />
            </div>
            {selectedReg.notes && (
              <div>
                <label className="block text-xs font-semibold text-brand-ink-muted mb-1">{t.registration.notes}</label>
                <p className="text-sm text-brand-ink-soft bg-brand-bg-alt rounded-lg p-3">{selectedReg.notes}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-2">{t.admin.status}</label>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'reviewed', 'accepted', 'rejected'] as const).map((s) => (
                  <button key={s} onClick={() => { store.updateRegistrationStatus(selectedReg.id, s); setSelectedReg({ ...selectedReg, status: s }); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedReg.status === s ? 'text-white' : 'bg-brand-bg-alt text-brand-ink-soft'}`}
                    style={selectedReg.status === s ? { backgroundColor: regStatusColors[s] } : {}}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── Shared components ──────────────────────────────────────────────────────

function SettingsCard({ accent, icon: Icon, title, children }: { accent: string; icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-brand-line/60">
        <Icon size={16} style={{ color: accent }} />
        <h3 className="font-bold text-brand-ink text-sm">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, accent, label }: { icon: LucideIcon; accent: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: accent + '12' }}>
        <Icon size={28} style={{ color: accent }} />
      </div>
      <p className="text-sm text-brand-ink-muted">{label}</p>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-ink-muted mb-1">{label}</label>
      <p className="text-sm text-brand-ink font-medium">{value}</p>
    </div>
  );
}
