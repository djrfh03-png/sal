import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Megaphone, FileText, BookOpen, ChevronRight,
  Layers, Users, GraduationCap, Heart, FileCheck, Settings2,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { localize } from '../utils/localize';
import type { RegistrationStatus } from '../types';

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
  const { t, lang, dir } = useI18n();
  const { departments, announcements, posts, registrations, settings } = useAdminStore();
  const Arrow = dir === 'rtl' ? 'rotate-180' : '';

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
              const deptLink = `/admin/departments/${dept.slug}`;

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
                  {/* Header — links to per-department page */}
                  <Link to={deptLink} className="block px-4 sm:px-5 py-3.5 flex items-center gap-3 group hover:bg-brand-bg-alt/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
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
                    </div>
                    <ChevronRight size={18} className={`text-brand-ink-muted shrink-0 ${Arrow} group-hover:text-brand-primary transition-colors`} />
                  </Link>

                  {/* Quick stats row — each links to per-department page */}
                  <div className="px-4 sm:px-5 pb-3.5 grid grid-cols-4 gap-2">
                    {[
                      { label: t.common.programs, count: dept.programs.length, icon: BookOpen },
                      { label: t.admin.announcements, count: annCount, icon: Megaphone },
                      { label: t.admin.posts, count: postCount, icon: FileText },
                      { label: t.admin.registrations, count: regCount, icon: FileCheck, badge: pending },
                    ].map((tile, ti) => (
                      <Link key={ti} to={deptLink} className="group bg-brand-bg-alt/40 rounded-lg p-2.5 hover:bg-brand-bg-alt transition-colors text-center">
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
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
