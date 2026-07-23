import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Megaphone, FileText, BookOpen, ChevronRight,
  Layers, Users, GraduationCap, Heart, FileCheck, Settings2,
  Save, ExternalLink,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import type { RegistrationStatus, LocalizedName } from '../types';

const statusMeta: Record<RegistrationStatus, { color: string; labelKey: 'open' | 'closed' | 'comingSoon' }> = {
  open: { color: '#22c55e', labelKey: 'open' },
  closed: { color: '#ef4444', labelKey: 'closed' },
  coming_soon: { color: '#C9A227', labelKey: 'comingSoon' },
};

const langsList: { key: keyof LocalizedName; label: string }[] = [
  { key: 'ar', label: 'العربية' },
  { key: 'en', label: 'English' },
  { key: 'am', label: 'አማርኛ' },
  { key: 'om', label: 'Afaan Oromoo' },
];

export function AdminDashboardPage() {
  const { t, lang, dir } = useI18n();
  const {
    departments, announcements, posts, registrations, settings,
    updateSettings, setRegistrationStatus,
    updateDepartmentStat, updateDepartmentTelegram,
  } = useAdminStore();
  const { showToast } = useToast();
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const Arrow = dir === 'rtl' ? 'rotate-180' : '';

  const generalAnnCount = announcements.filter((a) => a.departmentSlug === 'org').length;
  const totalPending = registrations.filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-px w-8 bg-brand-secondary/60" />
          <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
            {lang === 'ar' ? 'لوحة التحكم' : 'Control Panel'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.dashboard}</h1>
      </motion.div>

      <div className="space-y-6">
        {/* ── Main Organization Card ── */}
        <OrgCard
          settings={settings}
          generalAnnCount={generalAnnCount}
          totalPending={totalPending}
          deptCount={departments.length}
          updateSettings={updateSettings}
          showToast={showToast}
          t={t}
          lang={lang}
        />

        {/* ── Section divider ── */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-px w-8 bg-brand-secondary/60" />
          <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
            {lang === 'ar' ? 'الأقسام' : 'Departments'}
          </span>
        </div>

        {/* ── Department Cards ── */}
        {departments.map((dept, i) => {
          const accent = dept.accentColor.base;
          const meta = statusMeta[dept.registrationStatus];
          const deptLink = `/admin/departments/${dept.slug}`;
          const annCount = announcements.filter((a) => a.departmentSlug === dept.slug).length;
          const postCount = posts.filter((p) => p.departmentSlug === dept.slug).length;
          const regCount = registrations.filter((r) => r.departmentSlug === dept.slug).length;
          const pending = registrations.filter((r) => r.departmentSlug === dept.slug && r.status === 'pending').length;
          const isExpanded = expandedDept === dept.slug;

          return (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-line/40"
            >
              {/* Card header — accent bar + logo + name */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }} />

              <div className="p-5">
                {/* Top row: logo + name + status */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-brand-bg-alt flex items-center justify-center shrink-0 ring-1 ring-brand-line/50">
                      <DepartmentLogo slug={dept.slug} size="sm" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-brand-ink text-sm leading-snug truncate">
                        {localize(dept.name, lang)}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                        <span className="text-[11px] text-brand-ink-muted">{t.admin[meta.labelKey]}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={deptLink} className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:gap-1.5 transition-all shrink-0">
                    {lang === 'ar' ? 'إدارة' : 'Manage'}
                    <ChevronRight size={14} className={Arrow} />
                  </Link>
                </div>

                {/* Content tiles */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: t.common.programs, count: dept.programs.length, icon: BookOpen },
                    { label: t.admin.announcements, count: annCount, icon: Megaphone },
                    { label: t.admin.posts, count: postCount, icon: FileText },
                    { label: t.admin.registrations, count: regCount, icon: FileCheck, badge: pending },
                  ].map((tile, ti) => (
                    <Link key={ti} to={deptLink} className="group bg-brand-bg-alt/40 rounded-xl p-2.5 hover:bg-brand-bg-alt transition-colors text-center">
                      <div className="flex items-center justify-center mb-1 relative">
                        <tile.icon size={14} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                        {!!tile.badge && tile.badge > 0 && (
                          <span className="absolute -top-1 -end-1 text-[8px] font-bold px-1 py-0.5 rounded-full bg-brand-secondary/20 text-brand-secondary leading-none">
                            {tile.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                      <div className="text-[8px] text-brand-ink-muted mt-0.5 truncate">{tile.label}</div>
                    </Link>
                  ))}
                </div>

                {/* Quick settings toggle */}
                <button
                  onClick={() => setExpandedDept(isExpanded ? null : dept.slug)}
                  className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-ink-muted hover:text-brand-primary transition-colors"
                >
                  <Settings2 size={13} />
                  {lang === 'ar' ? 'إعدادات سريعة' : 'Quick Settings'}
                  <ChevronRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90' : ''} ${Arrow}`} />
                </button>

                {/* Quick settings panel */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-brand-line/60 space-y-4">
                      {/* Registration status */}
                      <div>
                        <label className="block text-[11px] font-semibold text-brand-ink-muted mb-2">
                          {lang === 'ar' ? 'حالة التسجيل' : 'Registration Status'}
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {(['open', 'coming_soon', 'closed'] as RegistrationStatus[]).map((s) => {
                            const sm = statusMeta[s];
                            const active = dept.registrationStatus === s;
                            return (
                              <button
                                key={s}
                                onClick={() => { setRegistrationStatus(dept.slug, s); showToast(t.admin.saved, 'success'); }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active ? 'text-white shadow-sm' : 'bg-brand-bg-alt text-brand-ink-muted hover:text-brand-ink'}`}
                                style={active ? { backgroundColor: sm.color } : {}}
                              >
                                {t.admin[sm.labelKey]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stats */}
                      <div>
                        <label className="block text-[11px] font-semibold text-brand-ink-muted mb-2">
                          {t.admin.statistics}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {dept.stats.map((stat, si) => (
                            <div key={si}>
                              <span className="block text-[10px] text-brand-ink-muted mb-1">{localize(stat.label, lang)}</span>
                              <input
                                type="number"
                                defaultValue={stat.value}
                                onBlur={(e) => updateDepartmentStat(dept.id, si, parseInt(e.target.value) || 0)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Telegram */}
                      <div>
                        <label className="block text-[11px] font-semibold text-brand-ink-muted mb-2">
                          {lang === 'ar' ? 'معرّف تلجرام' : 'Telegram Chat ID'}
                        </label>
                        <input
                          type="text"
                          defaultValue={dept.telegramChatId}
                          onBlur={(e) => updateDepartmentTelegram(dept.id, e.target.value)}
                          placeholder="-1001234567890"
                          className="w-full px-3 py-1.5 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                        />
                      </div>

                      {/* View on site */}
                      <Link
                        to={`/departments/${dept.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                      >
                        <ExternalLink size={11} />
                        {lang === 'ar' ? 'عرض في الموقع' : 'View on site'}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Organization Card ──────────────────────────────────────────────────────

function OrgCard({
  settings, generalAnnCount, totalPending, deptCount, updateSettings, showToast, t, lang,
}: {
  settings: ReturnType<typeof useAdminStore>['settings'];
  generalAnnCount: number;
  totalPending: number;
  deptCount: number;
  updateSettings: (s: Partial<typeof settings>) => void;
  showToast: (m: string, s: string) => void;
  t: any;
  lang: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [heroTitle, setHeroTitle] = useState<LocalizedName>({ ...settings.heroTitle });
  const [heroSubtitle, setHeroSubtitle] = useState<LocalizedName>({ ...settings.heroSubtitle });

  const save = () => {
    updateSettings({ heroTitle, heroSubtitle });
    showToast(t.admin.saved, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-line/40"
    >
      <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-primary-light" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-brand-primary" />
            </div>
            <div>
              <h2 className="font-bold text-brand-ink text-sm leading-snug">
                {lang === 'ar' ? 'المؤسسة الرئيسية' : 'Main Institution'}
              </h2>
              <p className="text-[11px] text-brand-ink-muted mt-0.5">
                {lang === 'ar' ? 'إعدادات وإعلانات عامة' : 'General settings & announcements'}
              </p>
            </div>
          </div>
        </div>

        {/* Content tiles */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: lang === 'ar' ? 'إعلانات' : 'Announcements', count: generalAnnCount, icon: Megaphone, to: '/admin/announcements' },
            { label: lang === 'ar' ? 'بانتظار' : 'Pending', count: totalPending, icon: FileCheck, to: '/admin/registrations', badge: totalPending },
            { label: lang === 'ar' ? 'أقسام' : 'Departments', count: deptCount, icon: Building2, to: '/admin/departments' },
            { label: lang === 'ar' ? 'إعدادات' : 'Settings', count: 0, icon: Settings2, to: '/admin/settings', isSettings: true },
          ].map((tile, ti) => (
            <Link key={ti} to={tile.to} className="group bg-brand-bg-alt/40 rounded-xl p-2.5 hover:bg-brand-bg-alt transition-colors text-center">
              <div className="flex items-center justify-center mb-1 relative">
                <tile.icon size={14} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                {!!tile.badge && tile.badge > 0 && (
                  <span className="absolute -top-1 -end-1 text-[8px] font-bold px-1 py-0.5 rounded-full bg-brand-secondary/20 text-brand-secondary leading-none">
                    {tile.badge}
                  </span>
                )}
              </div>
              {tile.isSettings ? (
                <div className="text-[10px] font-semibold text-brand-primary">{tile.label}</div>
              ) : (
                <>
                  <div className="text-sm font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                  <div className="text-[8px] text-brand-ink-muted mt-0.5 truncate">{tile.label}</div>
                </>
              )}
            </Link>
          ))}
        </div>

        {/* Quick settings toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-ink-muted hover:text-brand-primary transition-colors"
        >
          <Settings2 size={13} />
          {lang === 'ar' ? 'إعدادات الواجهة' : 'Hero Settings'}
          <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {/* Quick settings panel */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-brand-line/60 space-y-3">
              {langsList.map((l) => (
                <div key={l.key} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="block text-[10px] text-brand-ink-muted mb-1">{lang === 'ar' ? 'العنوان' : 'Title'} ({l.label})</span>
                    <input
                      type="text"
                      value={heroTitle[l.key] ?? ''}
                      onChange={(e) => setHeroTitle((prev) => ({ ...prev, [l.key]: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-ink-muted mb-1">{lang === 'ar' ? 'الوصف' : 'Subtitle'} ({l.label})</span>
                    <input
                      type="text"
                      value={heroSubtitle[l.key] ?? ''}
                      onChange={(e) => setHeroSubtitle((prev) => ({ ...prev, [l.key]: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={save}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-xs hover:shadow-lg transition-all"
              >
                <Save size={13} />
                {t.common.save}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
