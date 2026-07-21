import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, GraduationCap, Users, Heart,
  ArrowRight, ArrowLeft, FileText, Sparkles, ArrowUpRight,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': BookOpen,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

export function DepartmentsPage() {
  const { t, lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Aggregate stats across departments for the hero strip (mirrors HomePage impact stats)
  const deptStats = [
    {
      value: departments.length,
      label: t.home.departmentsTitle,
      color: '#047857',
      hint: lang === 'ar' ? 'أقسام متكاملة' : 'integrated departments',
    },
    {
      value: departments.reduce((sum, d) => sum + d.programs.length, 0),
      label: lang === 'ar' ? 'البرامج' : 'Programs',
      color: '#925E06',
      hint: lang === 'ar' ? 'برامج تعليمية' : 'educational programs',
    },
    {
      value: departments.reduce((sum, d) => sum + d.stats[0].value, 0),
      label: t.home.beneficiaries,
      color: '#0369A1',
      hint: lang === 'ar' ? 'مستفيد سنوياً' : 'yearly beneficiaries',
    },
    {
      value: 15,
      label: t.home.yearsService,
      color: '#1E3A8A',
      hint: lang === 'ar' ? 'من الخدمة' : 'of service',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero — smart split layout: text + visual cluster of the four department logos */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg-alt/60 to-transparent">
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.05]" />
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full bg-brand-secondary/8 blur-3xl" />
        <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full bg-brand-primary/6 blur-3xl" />

        <div className="container-page relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-secondary/60" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'أقسامنا' : 'Our Departments'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/60" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-5 text-brand-ink leading-tight">
              {t.departments.title}
            </h1>
            <p className="text-base md:text-lg text-brand-ink-soft max-w-2xl mx-auto leading-relaxed mb-8">
              {t.departments.subtitle}
            </p>

            {/* Quick legend — the four departments as a compact inline list */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-8">
              {departments.map((dept) => (
                <Link
                  key={dept.slug}
                  to={`/departments/${dept.slug}/programs`}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-brand-line/70 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                >
                  <DepartmentLogo slug={dept.slug} size="sm" />
                  <span className="text-xs font-semibold text-brand-ink leading-none">
                    {localize(dept.name, lang)}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-brand-secondary/40" />
              <div className="w-2 h-2 rotate-45 bg-brand-secondary/60" />
              <div className="h-px w-16 bg-brand-secondary/40" />
            </div>
          </motion.div>
        </div>

        {/* Stats strip — mirrors the HomePage impact-stats design */}
        <div className="container-page relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 bg-white rounded-3xl shadow-card p-8 md:p-10 border border-brand-line/60"
          >
            {deptStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="text-center relative group"
              >
                <div className="relative inline-flex items-center justify-center mb-3">
                  <div
                    className="absolute inset-0 -m-3 rounded-full opacity-10 blur-md"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div
                    className="relative text-4xl md:text-5xl font-bold font-display tabular-nums"
                    style={{ color: stat.color }}
                    dir={dir}
                  >
                    {stat.value.toLocaleString()}
                    {stat.value > 0 && <span className="text-2xl md:text-3xl ms-0.5">+</span>}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="h-px w-4" style={{ backgroundColor: stat.color, opacity: 0.4 }} />
                  <Sparkles size={11} style={{ color: stat.color }} />
                  <span className="h-px w-4" style={{ backgroundColor: stat.color, opacity: 0.4 }} />
                </div>
                <div className="text-sm md:text-base text-brand-ink font-semibold leading-snug">
                  {stat.label}
                </div>
                {stat.hint && (
                  <div className="mt-1 text-[11px] text-brand-ink-muted leading-snug">
                    {stat.hint}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Department tiles — smart, attractive cards that link to each department's programs */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => {
              const Icon = deptIcons[dept.slug] ?? BookOpen;
              const accent = dept.accentColor.base;
              const gold = dept.accentColor.accent;
              return (
                <motion.div
                  key={dept.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <Link
                    to={`/departments/${dept.slug}/programs`}
                    className="group relative block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 h-full"
                  >
                    {/* Top gradient banner */}
                    <div
                      className="relative h-28 overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
                    >
                      {/* Decorative geometric pattern */}
                      <div className="absolute top-0 end-0 w-28 h-28 opacity-[0.1] pointer-events-none">
                        <svg viewBox="0 0 128 128" fill="none" stroke={gold} strokeWidth="0.5">
                          <path d="M64 0 L128 64 L64 128 L0 64 Z" />
                          <path d="M64 16 L112 64 L64 112 L16 64 Z" />
                          <path d="M64 32 L96 64 L64 96 L32 64 Z" />
                          <circle cx="64" cy="64" r="12" />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 start-0 w-20 h-20 opacity-[0.08] pointer-events-none">
                        <svg viewBox="0 0 96 96" fill="none" stroke="#ffffff" strokeWidth="0.5">
                          <path d="M48 0 L96 48 L48 96 L0 48 Z" />
                          <path d="M48 12 L84 48 L48 84 L12 48 Z" />
                        </svg>
                      </div>

                      {/* Floating logo disc */}
                      <div className="absolute -bottom-7 start-6 z-10">
                        <div
                          className="rounded-2xl bg-white shadow-card flex items-center justify-center ring-1 ring-brand-line p-1.5"
                          style={{ width: '4.25rem', height: '4.25rem' }}
                        >
                          <DepartmentLogo slug={dept.slug} size="md" />
                        </div>
                      </div>

                      {/* Touch-to-explore hint */}
                      <div className="absolute top-3 end-3 z-10">
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide backdrop-blur-sm"
                          style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}
                        >
                          <Sparkles size={9} className="text-brand-secondary" />
                          <span>{lang === 'ar' ? 'اضغط للبرامج' : 'Tap for programs'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pt-10 pb-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon size={13} style={{ color: accent }} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                          {dept.establishedDate}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-brand-ink leading-snug mb-1.5 line-clamp-2 min-h-[2.6em]">
                        {localize(dept.name, lang)}
                      </h3>
                      <p className="text-xs text-brand-ink-muted leading-relaxed line-clamp-2 mb-4 min-h-[2.6em]">
                        {localize(dept.shortDescription, lang)}
                      </p>

                      {/* CTA pill */}
                      <div
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-300 group-hover:gap-3"
                        style={{ backgroundColor: accent + '0d' }}
                      >
                        <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
                          {lang === 'ar' ? 'استكشف البرامج' : 'Explore Programs'}
                        </span>
                        <div
                          className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                          style={{ backgroundColor: accent, color: '#fff' }}
                        >
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line that grows on hover */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Programs CTA — beautiful gradient card */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/programs"
              className="group relative block bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 pattern-bg-gold opacity-20" />
              {/* Decorative corner */}
              <div className="absolute top-0 end-0 w-48 h-48 opacity-[0.06] pointer-events-none">
                <svg viewBox="0 0 192 192" fill="none" stroke="#925E06" strokeWidth="0.5">
                  <path d="M96 0 L192 96 L96 192 L0 96 Z" />
                  <path d="M96 24 L168 96 L96 168 L24 96 Z" />
                  <path d="M96 48 L144 96 L96 144 L48 96 Z" />
                  <circle cx="96" cy="96" r="18" />
                </svg>
              </div>
              <div className="absolute bottom-0 start-0 w-32 h-32 opacity-[0.04] pointer-events-none">
                <svg viewBox="0 0 128 128" fill="none" stroke="#ffffff" strokeWidth="0.5">
                  <path d="M64 0 L128 64 L64 128 L0 64 Z" />
                  <path d="M64 16 L112 64 L64 112 L16 64 Z" />
                </svg>
              </div>

              <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/30 shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-3">
                  <BookOpen size={40} className="text-brand-secondary" />
                </div>
                <div className="flex-1 text-center md:text-start">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Sparkles size={16} className="text-brand-secondary" />
                    <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                      {lang === 'ar' ? 'برامجنا' : 'Our Programs'}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {lang === 'ar' ? 'استكشف جميع البرامج' : 'Explore All Programs'}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'برامج متكاملة تجمع بين العلم والتربية والإتقان، لكل الأقسام والمراحل'
                      : 'Integrated programs combining knowledge, nurturing, and mastery across all departments and stages'}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-secondary/20 text-brand-secondary font-semibold text-sm shrink-0 group-hover:gap-3 transition-all">
                  {lang === 'ar' ? 'تصفح الآن' : 'Browse Now'}
                  <Arrow size={20} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts CTA */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/posts"
              className="group relative block bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="absolute inset-0 pattern-bg-gold opacity-20" />
              {/* Decorative corner */}
              <div className="absolute top-0 end-0 w-40 h-40 opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 160 160" fill="none" stroke="#925E06" strokeWidth="0.5">
                  <path d="M80 0 L160 80 L80 160 L0 80 Z" />
                  <path d="M80 20 L140 80 L80 140 L20 80 Z" />
                  <circle cx="80" cy="80" r="16" />
                </svg>
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/30 shrink-0 transition-transform group-hover:scale-110">
                  <FileText size={32} className="text-brand-secondary" />
                </div>
                <div className="flex-1 text-center md:text-start">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {lang === 'ar' ? 'استكشف جميع المنشورات' : 'Explore All Posts'}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {lang === 'ar'
                      ? 'تابع آخر الأخبار والأنشطة والمنشورات من جميع أقسام المؤسسة'
                      : 'Follow the latest news, activities, and posts from all our departments'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-brand-secondary font-semibold text-sm shrink-0 group-hover:gap-3 transition-all">
                  {lang === 'ar' ? 'تصفح الآن' : 'Browse Now'}
                  <Arrow size={20} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
