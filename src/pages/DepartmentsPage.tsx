import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight, ArrowLeft, FileText, Sparkles, Loader2,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useDepartments } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { DepartmentCard } from '../components/DepartmentCard';
import { PageHero } from '../components/PageHero';

export function DepartmentsPage() {
  const { t, lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { data: departments, loading } = useDepartments();

  if (loading || !departments) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

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
      <PageHero
        eyebrow={lang === 'ar' ? 'أقسامنا' : 'Our Departments'}
        title={t.departments.title}
        subtitle={t.departments.subtitle}
        icon={BookOpen}
        accentColor="#1E5A8E"
      >
        {/* Quick legend — pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              to={`/departments/${dept.slug}/programs`}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-bg-alt border border-brand-line/70 hover:border-brand-primary/40 hover:shadow-soft transition-all duration-300"
            >
              <DepartmentLogo slug={dept.slug} size="sm" />
              <span className="text-xs font-semibold text-brand-ink-soft group-hover:text-brand-ink transition-colors leading-none">
                {localize(dept.name, lang)}
              </span>
            </Link>
          ))}
        </div>
      </PageHero>

      {/* Stats strip */}
      <div className="container-page -mt-6 pb-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line/40 rounded-2xl overflow-hidden border border-brand-line/60 shadow-card"
        >
          {deptStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
              className="bg-white p-5 md:p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold font-display tabular-nums text-brand-ink leading-none" dir={dir}>
                {stat.value.toLocaleString()}
                {stat.value > 0 && <span className="text-xl md:text-2xl text-brand-ink-muted">+</span>}
              </div>
              <div className="mt-2 text-xs md:text-sm font-semibold text-brand-ink-soft leading-snug">
                {stat.label}
              </div>
              {stat.hint && (
                <div className="mt-0.5 text-[11px] text-brand-ink-muted leading-snug">
                  {stat.hint}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Department tiles — clean, photo-free cards */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <DepartmentCard department={dept} />
              </motion.div>
            ))}
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
