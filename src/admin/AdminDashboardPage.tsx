import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Megaphone, FileText, ClipboardList, BookOpen,
  ArrowRight, ArrowLeft, Layers, Users, GraduationCap, Heart,
  Settings2, ExternalLink, ChevronRight, Globe, Mail, Image,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { localize } from '../utils/localize';
import type { DepartmentSlug, RegistrationStatus } from '../types';

export function AdminDashboardPage() {
  const { t, lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const {
    departments, announcements, posts, registrations, settings,
  } = useAdminStore();

  const deptIcons: Record<string, typeof BookOpen> = {
    'center-hifz': Layers,
    'school': GraduationCap,
    'halqa': Users,
    'charity': Heart,
  };

  const statusMeta: Record<RegistrationStatus, { color: string; label: string; dot: string }> = {
    open: { color: '#22c55e', label: t.admin.open, dot: 'bg-emerald-500' },
    closed: { color: '#ef4444', label: t.admin.closed, dot: 'bg-red-500' },
    coming_soon: { color: '#C9A227', label: t.admin.comingSoon, dot: 'bg-amber-500' },
  };

  const deptAnn = (slug: DepartmentSlug) => announcements.filter(a => a.departmentSlug === slug);
  const deptPosts = (slug: DepartmentSlug) => posts.filter(p => p.departmentSlug === slug);
  const deptRegs = (slug: DepartmentSlug) => registrations.filter(r => r.departmentSlug === slug);
  const generalAnnCount = announcements.filter(a => a.departmentSlug === 'org').length;
  const totalPending = registrations.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-px w-8 bg-brand-secondary/60" />
          <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
            {lang === 'ar' ? 'لوحة التحكم' : 'Control Panel'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.dashboard}</h1>
      </motion.div>

      <div className="space-y-8">
        {/* ─────────────────────────────────────────────── */}
        {/* INSTITUTION CARD — all org-wide things only     */}
        {/* ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          <div className="px-4 sm:px-5 py-4 flex items-center gap-4 border-b border-brand-line/70 border-t-[3px] border-t-brand-primary">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-primary/10">
              <Building2 size={24} className="text-brand-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-brand-ink leading-snug">
                {lang === 'ar' ? 'المؤسسة الرئيسية' : 'Main Institution'}
              </h2>
              <p className="text-[11px] text-brand-ink-muted mt-0.5">
                {lang === 'ar' ? 'الإعدادات والإعلانات العامة' : 'General settings and announcements'}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Org content tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { label: lang === 'ar' ? 'إعلانات عامة' : 'General announcements', count: generalAnnCount, icon: Megaphone, to: '/admin/announcements' },
                { label: lang === 'ar' ? 'بانتظار المراجعة' : 'Pending review', count: totalPending, icon: ClipboardList, to: '/admin/registrations', badge: totalPending },
                { label: t.admin.departments, count: departments.length, icon: Building2, to: '/admin/departments' },
              ].map((tile, ti) => (
                <Link
                  key={ti}
                  to={tile.to}
                  className="group relative bg-brand-bg-alt/50 rounded-xl p-3 hover:bg-brand-bg-alt transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <tile.icon size={17} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                    {!!tile.badge && tile.badge > 0 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary leading-none">
                        {tile.badge} new
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                  <div className="text-[10px] text-brand-ink-muted mt-1">{tile.label}</div>
                </Link>
              ))}
            </div>

            {/* Org settings quick links */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="h-px w-5 bg-brand-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                  {lang === 'ar' ? 'إعدادات المؤسسة' : 'Institution Settings'}
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Image, label: t.admin.logo, to: '/admin/settings' },
                  { icon: Settings2, label: t.admin.heroTitle, to: '/admin/settings' },
                  { icon: Mail, label: t.contact.title, to: '/admin/settings' },
                  { icon: Globe, label: lang === 'ar' ? 'روابط التواصل' : 'Social Links', to: '/admin/settings' },
                ].map((s, si) => (
                  <Link
                    key={si}
                    to={s.to}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-bg-alt/40 hover:bg-brand-bg-alt transition-colors group"
                  >
                    <span className="flex items-center gap-2 text-xs text-brand-ink-soft">
                      <s.icon size={14} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                      {s.label}
                    </span>
                    <ChevronRight size={14} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — current hero title preview */}
          <div className="px-4 sm:px-5 py-2.5 bg-brand-bg-alt/30 border-t border-brand-line/60">
            <span className="text-[11px] font-semibold text-brand-ink-soft">
              {lang === 'ar' ? 'عنوان الواجهة:' : 'Hero title:'} {settings.heroTitle[lang]}
            </span>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────── */}
        {/* DEPARTMENT CARDS — each department fully separate */}
        {/* ─────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-secondary/60" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'الأقسام' : 'Departments'}
            </span>
          </div>

          <div className="space-y-5">
            {departments.map((dept, i) => {
              const Icon = deptIcons[dept.slug] ?? BookOpen;
              const accent = dept.accentColor.base;
              const anns = deptAnn(dept.slug);
              const dposts = deptPosts(dept.slug);
              const dregs = deptRegs(dept.slug);
              const pending = dregs.filter(r => r.status === 'pending').length;
              const meta = statusMeta[dept.registrationStatus];

              const tiles = [
                { label: t.common.programs, count: dept.programs.length, icon: BookOpen, to: '/admin/programs' },
                { label: t.admin.announcements, count: anns.length, icon: Megaphone, to: '/admin/announcements' },
                { label: t.admin.posts, count: dposts.length, icon: FileText, to: '/admin/posts' },
                { label: t.admin.registrations, count: dregs.length, icon: ClipboardList, to: '/admin/registrations', badge: pending },
              ];

              return (
                <motion.section
                  key={dept.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                >
                  {/* Section header — department identity only */}
                  <div
                    className="px-4 sm:px-5 py-4 flex items-center gap-4 flex-wrap border-b border-brand-line/70"
                    style={{ borderTop: `3px solid ${accent}` }}
                  >
                    <Link to={`/departments/${dept.slug}`} className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: accent + '14' }}
                      >
                        <Icon size={24} style={{ color: accent }} />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-brand-ink leading-snug truncate hover:text-brand-primary transition-colors">
                          {localize(dept.name, lang)}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                          <span className="text-[11px] text-brand-ink-muted">
                            {meta.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Body — content tiles + stats, all for THIS department only */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Content counts */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {tiles.map((tile, ti) => (
                        <Link
                          key={ti}
                          to={tile.to}
                          className="group relative bg-brand-bg-alt/50 rounded-xl p-3 hover:bg-brand-bg-alt transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <tile.icon size={17} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                            {!!tile.badge && tile.badge > 0 && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary leading-none">
                                {tile.badge} new
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-bold font-display text-brand-ink leading-none tabular-nums">
                            {tile.count}
                          </div>
                          <div className="text-[10px] text-brand-ink-muted mt-1">{tile.label}</div>
                        </Link>
                      ))}

                      {/* Quick actions row */}
                      <div className="col-span-2 sm:col-span-4 flex items-center gap-2 pt-1 flex-wrap">
                        <Link
                          to={`/departments/${dept.slug}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                        >
                          <ExternalLink size={12} />
                          {lang === 'ar' ? 'عرض في الموقع' : 'View on site'}
                        </Link>
                        <span className="text-brand-line">·</span>
                        <Link
                          to="/admin/statistics"
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-ink-muted hover:text-brand-primary transition-colors"
                        >
                          <Settings2 size={12} />
                          {lang === 'ar' ? 'تعديل الإحصائيات والشروط' : 'Edit Stats & Requirements'}
                        </Link>
                      </div>
                    </div>

                    {/* Department stats — THIS department only */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="h-px w-5" style={{ backgroundColor: accent + '60' }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                          {t.common.stats}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {dept.stats.map((stat, si) => (
                          <div key={si} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-bg-alt/40">
                            <span className="text-xs text-brand-ink-soft">{localize(stat.label, lang)}</span>
                            <span className="text-sm font-bold font-display tabular-nums shrink-0" style={{ color: accent }}>
                              {stat.value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer — registration status pill + pending hint */}
                  <div className="px-4 sm:px-5 py-2.5 bg-brand-bg-alt/30 border-t border-brand-line/60 flex items-center justify-between flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                      <span className="text-[11px] font-semibold text-brand-ink-soft">
                        {lang === 'ar' ? 'حالة التسجيل:' : 'Registration:'} {meta.label}
                      </span>
                    </div>
                    {pending > 0 && (
                      <Link
                        to="/admin/registrations"
                        className="text-[11px] font-semibold text-brand-secondary hover:underline inline-flex items-center gap-1"
                      >
                        {pending} {lang === 'ar' ? 'طلب جديد' : 'pending'}
                        <Arrow size={11} />
                      </Link>
                    )}
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
