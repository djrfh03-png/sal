import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Megaphone, FileText, ClipboardList, BookOpen,
  ChevronRight, ChevronLeft, Plus, ArrowRight, ArrowLeft,
  Layers, Users, GraduationCap, Heart,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { localize } from '../utils/localize';

export function AdminDashboardPage() {
  const { t, lang, dir } = useI18n();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { departments, announcements, posts, registrations } = useAdminStore();
  const [openDept, setOpenDept] = useState<string | null>(null);

  const deptIcons: Record<string, typeof BookOpen> = {
    'center-hifz': Layers,
    'school': GraduationCap,
    'halqa': Users,
    'charity': Heart,
  };

  const deptAnnCount = (slug: string) => announcements.filter(a => a.departmentSlug === slug).length;
  const deptPostCount = (slug: string) => posts.filter(p => p.departmentSlug === slug).length;
  const deptRegCount = (slug: string) => registrations.filter(r => r.departmentSlug === slug).length;

  const generalAnnCount = announcements.filter(a => a.departmentSlug === 'org').length;

  // Overall stats
  const totalStats = [
    { label: t.admin.departments, value: departments.length, icon: Building2, color: '#0f4d3a' },
    { label: t.admin.announcements, value: announcements.length, icon: Megaphone, color: '#123a70' },
    { label: t.admin.posts, value: posts.length, icon: FileText, color: '#15479c' },
    { label: t.admin.registrations, value: registrations.length, icon: ClipboardList, color: '#1a56b8' },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl font-bold text-brand-ink mb-6"
      >
        {t.admin.dashboard}
      </motion.h1>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {totalStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: stat.color + '15' }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-ink leading-none">{stat.value}</div>
                <div className="text-xs text-brand-ink-muted mt-0.5">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* General organization section */}
      <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-5 shadow-card mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
              <Building2 size={22} className="text-brand-secondary" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">
                {lang === 'ar' ? 'إعلانات المؤسسة العامة' : 'General Institution'}
              </h2>
              <p className="text-xs text-white/50">{generalAnnCount} {lang === 'ar' ? 'إعلان عام' : 'general announcements'}</p>
            </div>
          </div>
          <Link
            to="/admin/announcements"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
          >
            <Megaphone size={14} />
            {lang === 'ar' ? 'إدارة الإعلانات' : 'Manage Announcements'}
            <Chevron size={14} />
          </Link>
        </div>
      </div>

      {/* Department cards — each expandable to show its systems */}
      <h2 className="text-lg font-bold text-brand-ink mb-4">
        {lang === 'ar' ? 'إدارة الأقسام' : 'Departments Management'}
      </h2>

      <div className="space-y-4">
        {departments.map((dept, i) => {
          const Icon = deptIcons[dept.slug] ?? BookOpen;
          const accent = dept.accentColor.base;
          const isOpen = openDept === dept.slug;
          const annCount = deptAnnCount(dept.slug);
          const postCount = deptPostCount(dept.slug);
          const regCount = deptRegCount(dept.slug);

          const systems = [
            { label: lang === 'ar' ? 'البرامج' : 'Programs', count: dept.programs.length, icon: BookOpen, to: `/admin/programs` },
            { label: t.admin.announcements, count: annCount, icon: Megaphone, to: `/admin/announcements` },
            { label: t.admin.posts, count: postCount, icon: FileText, to: `/admin/posts` },
            { label: t.admin.registrations, count: regCount, icon: ClipboardList, to: `/admin/registrations` },
          ];

          return (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
              style={{ borderInlineStart: `4px solid ${accent}` }}
            >
              {/* Header row */}
              <button
                onClick={() => setOpenDept(isOpen ? null : dept.slug)}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-bg-alt/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '15' }}>
                    <Icon size={22} style={{ color: accent }} />
                  </div>
                  <div className="text-start">
                    <h3 className="font-bold text-brand-ink text-sm">{localize(dept.name, lang)}</h3>
                    <p className="text-xs text-brand-ink-muted line-clamp-1 max-w-xs">{localize(dept.shortDescription, lang)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: accent + '12', color: accent }}>
                    {dept.programs.length + annCount + postCount + regCount} {lang === 'ar' ? 'عنصر' : 'items'}
                  </span>
                  <Chevron
                    size={18}
                    className="text-brand-ink-muted transition-transform"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}
                  />
                </div>
              </button>

              {/* Expanded systems */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {systems.map((sys, si) => (
                          <Link
                            key={si}
                            to={sys.to}
                            className="group flex items-center gap-3 p-3 rounded-xl bg-brand-bg-alt/50 hover:bg-brand-bg-alt transition-all hover:-translate-y-0.5"
                          >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '12' }}>
                              <sys.icon size={16} style={{ color: accent }} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-lg font-bold text-brand-ink leading-none">{sys.count}</div>
                              <div className="text-xs text-brand-ink-muted mt-0.5 truncate">{sys.label}</div>
                            </div>
                            <Arrow size={14} className="ms-auto shrink-0 text-brand-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                          </Link>
                        ))}
                      </div>

                      {/* Quick actions */}
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-brand-line/50">
                        <Link
                          to={`/departments/${dept.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ backgroundColor: accent + '10', color: accent }}
                        >
                          {lang === 'ar' ? 'عرض القسم' : 'View Department'}
                          <Arrow size={12} />
                        </Link>
                        <Link
                          to={`/admin/programs`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg-alt text-xs font-semibold text-brand-ink-soft hover:bg-brand-line transition-all"
                        >
                          <Plus size={12} />
                          {lang === 'ar' ? 'إضافة برنامج' : 'Add Program'}
                        </Link>
                        <Link
                          to={`/admin/departments`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg-alt text-xs font-semibold text-brand-ink-soft hover:bg-brand-line transition-all"
                        >
                          {lang === 'ar' ? 'تحرير الإحصائيات' : 'Edit Stats'}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
