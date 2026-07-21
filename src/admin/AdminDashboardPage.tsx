import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Megaphone, FileText, BookOpen, ChevronDown, ChevronUp,
  Layers, Users, GraduationCap, Heart, ExternalLink, Save,
  BarChart3, FileCheck, Send, Settings2,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';
import type { DepartmentSlug, RegistrationStatus, LocalizedName } from '../types';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': Layers,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

const statusMeta: Record<RegistrationStatus, { color: string; bg: string; labelKey: 'open' | 'closed' | 'comingSoon' }> = {
  open: { color: '#22c55e', bg: 'bg-emerald-500', labelKey: 'open' },
  closed: { color: '#ef4444', bg: 'bg-red-500', labelKey: 'closed' },
  coming_soon: { color: '#C9A227', bg: 'bg-amber-500', labelKey: 'comingSoon' },
};

export function AdminDashboardPage() {
  const { t, lang } = useI18n();
  const {
    departments, announcements, posts, registrations, settings,
    setRegistrationStatus, updateDepartmentStat, updateDepartmentRequirements,
    updateDepartmentTelegram,
  } = useAdminStore();
  const { showToast } = useToast();
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [statDrafts, setStatDrafts] = useState<Record<string, number[]>>(
    Object.fromEntries(departments.map((d) => [d.id, d.stats.map((s) => s.value)]))
  );
  const [reqDrafts, setReqDrafts] = useState<Record<string, LocalizedName>>(
    Object.fromEntries(departments.map((d) => [d.id, { ...d.requirements }]))
  );
  const [tgDrafts, setTgDrafts] = useState<Record<string, string>>(
    Object.fromEntries(departments.map((d) => [d.id, d.telegramChatId]))
  );

  const langs: { key: keyof LocalizedName; label: string }[] = [
    { key: 'ar', label: 'العربية' },
    { key: 'en', label: 'English' },
    { key: 'am', label: 'አማርኛ' },
    { key: 'om', label: 'Afaan Oromoo' },
  ];

  const saveDeptSettings = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    if (!dept) return;
    statDrafts[deptId]?.forEach((val, i) => updateDepartmentStat(deptId, i, val));
    const rv = reqDrafts[deptId];
    if (rv) (Object.keys(rv) as (keyof LocalizedName)[]).forEach((l) => updateDepartmentRequirements(deptId, l, rv[l]));
    updateDepartmentTelegram(deptId, tgDrafts[deptId] ?? '');
    showToast(t.admin.saved, 'success');
  };

  const generalAnnCount = announcements.filter((a) => a.departmentSlug === 'org').length;
  const totalPending = registrations.filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-5xl mx-auto">
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
        {/* ── Institution card ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          <div className="px-4 sm:px-5 py-4 flex items-center gap-3 border-b border-brand-line/70 border-t-[3px] border-t-brand-primary">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-brand-primary/10">
              <Building2 size={22} className="text-brand-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-brand-ink text-sm leading-snug">
                {lang === 'ar' ? 'المؤسسة الرئيسية' : 'Main Institution'}
              </h2>
              <p className="text-[11px] text-brand-ink-muted mt-0.5">
                {lang === 'ar' ? 'إعدادات وإعلانات عامة' : 'General settings & announcements'}
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: lang === 'ar' ? 'إعلانات عامة' : 'General Announcements', count: generalAnnCount, icon: Megaphone, to: '/admin/announcements' },
              { label: lang === 'ar' ? 'بانتظار المراجعة' : 'Pending Review', count: totalPending, icon: FileCheck, to: '/admin/registrations', badge: totalPending },
              { label: t.admin.departments, count: departments.length, icon: Building2, to: '/admin/departments' },
              { label: t.admin.websiteSettings, count: 0, icon: Settings2, to: '/admin/settings', isSettings: true },
            ].map((tile, ti) => (
              <Link key={ti} to={tile.to} className="group bg-brand-bg-alt/50 rounded-xl p-3 hover:bg-brand-bg-alt transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <tile.icon size={16} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                  {!!tile.badge && tile.badge > 0 && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary leading-none">
                      {tile.badge} new
                    </span>
                  )}
                </div>
                {tile.isSettings ? (
                  <div className="text-[11px] font-semibold text-brand-primary">{tile.label}</div>
                ) : (
                  <>
                    <div className="text-lg font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                    <div className="text-[10px] text-brand-ink-muted mt-1">{tile.label}</div>
                  </>
                )}
              </Link>
            ))}
          </div>
          <div className="px-4 sm:px-5 py-2.5 bg-brand-bg-alt/30 border-t border-brand-line/60">
            <span className="text-[11px] font-semibold text-brand-ink-soft">
              {lang === 'ar' ? 'عنوان الواجهة:' : 'Hero:'} {settings.heroTitle[lang]}
            </span>
          </div>
        </motion.section>

        {/* ── Department cards ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-secondary/60" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'الأقسام' : 'Departments'}
            </span>
          </div>

          <div className="space-y-4">
            {departments.map((dept, i) => {
              const Icon = deptIcons[dept.slug] ?? BookOpen;
              const accent = dept.accentColor.base;
              const meta = statusMeta[dept.registrationStatus];
              const isExpanded = expandedDept === dept.slug;

              const annCount = announcements.filter((a) => a.departmentSlug === dept.slug).length;
              const postCount = posts.filter((p) => p.departmentSlug === dept.slug).length;
              const regCount = registrations.filter((r) => r.departmentSlug === dept.slug).length;
              const pending = registrations.filter((r) => r.departmentSlug === dept.slug && r.status === 'pending').length;

              return (
                <motion.section
                  key={dept.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                  style={{ borderTop: `3px solid ${accent}` }}
                >
                  {/* Header */}
                  <div className="px-4 sm:px-5 py-3.5 flex items-center gap-3 flex-wrap">
                    <Link to={`/departments/${dept.slug}`} className="flex items-center gap-3 min-w-0 flex-1 group">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '14' }}>
                        <Icon size={22} style={{ color: accent }} />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-brand-ink text-sm leading-snug truncate group-hover:text-brand-primary transition-colors">
                          {localize(dept.name, lang)}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${meta.bg}`} />
                          <span className="text-[11px] text-brand-ink-muted">{t.admin[meta.labelKey]}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Registration status toggle */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {(['open', 'coming_soon', 'closed'] as RegistrationStatus[]).map((s) => {
                        const sm = statusMeta[s];
                        const active = dept.registrationStatus === s;
                        return (
                          <button
                            key={s}
                            onClick={() => {
                              setRegistrationStatus(dept.slug, s);
                              showToast(t.admin.saved, 'success');
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                              active ? 'text-white shadow-sm' : 'bg-brand-bg-alt text-brand-ink-muted hover:text-brand-ink'
                            }`}
                            style={active ? { backgroundColor: sm.color } : {}}
                          >
                            {t.admin[sm.labelKey]}
                          </button>
                        );
                      })}
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedDept(isExpanded ? null : dept.slug)}
                      className="p-2 rounded-lg text-brand-ink-muted hover:bg-brand-bg-alt transition-colors shrink-0"
                      aria-label="Toggle settings"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Quick stats row */}
                  <div className="px-4 sm:px-5 pb-3.5 grid grid-cols-4 gap-2">
                    {[
                      { label: t.common.programs, count: dept.programs.length, icon: BookOpen, to: '/admin/programs' },
                      { label: t.admin.announcements, count: annCount, icon: Megaphone, to: '/admin/announcements' },
                      { label: t.admin.posts, count: postCount, icon: FileText, to: '/admin/posts' },
                      { label: t.admin.registrations, count: regCount, icon: FileCheck, to: '/admin/registrations', badge: pending },
                    ].map((tile, ti) => (
                      <Link key={ti} to={tile.to} className="group bg-brand-bg-alt/40 rounded-lg p-2.5 hover:bg-brand-bg-alt transition-colors text-center">
                        <div className="flex items-center justify-center mb-1 relative">
                          <tile.icon size={14} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                          {!!tile.badge && tile.badge > 0 && (
                            <span className="absolute -top-1 -end-1 text-[8px] font-bold px-1 py-0.5 rounded-full bg-brand-secondary/20 text-brand-secondary leading-none">
                              {tile.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-base font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                        <div className="text-[9px] text-brand-ink-muted mt-0.5 truncate">{tile.label}</div>
                      </Link>
                    ))}
                  </div>

                  {/* Expanded settings panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-brand-line/60"
                      >
                        <div className="p-4 sm:p-5 space-y-5 bg-brand-bg-alt/20">
                          {/* Stats editor */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <BarChart3 size={14} style={{ color: accent }} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                                {t.admin.statistics}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {dept.stats.map((stat, si) => (
                                <div key={si}>
                                  <label className="block text-xs font-semibold text-brand-ink mb-1">{localize(stat.label, lang)}</label>
                                  <input
                                    type="number"
                                    value={statDrafts[dept.id]?.[si] ?? 0}
                                    onChange={(e) =>
                                      setStatDrafts((prev) => ({
                                        ...prev,
                                        [dept.id]: prev[dept.id]?.map((v, j) => (j === si ? parseInt(e.target.value) || 0 : v)) ?? [],
                                      }))
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Requirements editor */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <FileCheck size={14} style={{ color: accent }} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                                {lang === 'ar' ? 'شروط التسجيل' : 'Registration Requirements'}
                              </span>
                            </div>
                            <div className="space-y-2.5">
                              {langs.map((l) => (
                                <div key={l.key}>
                                  <label className="block text-[11px] font-semibold text-brand-ink-muted mb-1">{l.label}</label>
                                  <textarea
                                    value={reqDrafts[dept.id]?.[l.key] ?? ''}
                                    onChange={(e) =>
                                      setReqDrafts((prev) => ({
                                        ...prev,
                                        [dept.id]: { ...prev[dept.id], [l.key]: e.target.value },
                                      }))
                                    }
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-xs resize-y"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Telegram chat ID */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <Send size={14} style={{ color: accent }} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                                {lang === 'ar' ? 'معرّف تلجرام' : 'Telegram Chat ID'}
                              </span>
                            </div>
                            <input
                              type="text"
                              value={tgDrafts[dept.id] ?? ''}
                              onChange={(e) => setTgDrafts((prev) => ({ ...prev, [dept.id]: e.target.value }))}
                              placeholder="-1001234567890"
                              className="w-full px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm font-mono"
                            />
                            <p className="text-[10px] text-brand-ink-muted mt-1">
                              {lang === 'ar' ? 'سيتم إرسال التسجيلات تلقائياً إلى هذا المحادثة' : 'Registrations are automatically sent to this chat'}
                            </p>
                          </div>

                          {/* Save + view */}
                          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                            <Link
                              to={`/departments/${dept.slug}`}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                            >
                              <ExternalLink size={12} />
                              {lang === 'ar' ? 'عرض في الموقع' : 'View on site'}
                            </Link>
                            <button
                              onClick={() => saveDeptSettings(dept.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-xs hover:shadow-lg transition-all"
                            >
                              <Save size={14} />
                              {t.common.save}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
