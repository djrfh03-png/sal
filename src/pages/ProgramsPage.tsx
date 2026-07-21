import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, GraduationCap, Users, Heart, ArrowRight, ArrowLeft, Sparkles,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { ProgramCard } from '../components/ProgramCard';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': BookOpen,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

export function ProgramsPage() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-bg-alt/30" style={{ borderInlineStart: '4px solid var(--color-brand-primary, #1E5A8E)' }}>
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.03]" />
        <div className="absolute top-1/4 end-0 w-80 h-80 rounded-full blur-3xl bg-brand-primary/5" />
        <div className="container-page relative py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-brand-primary/10 border-brand-primary/20">
                <BookOpen size={24} className="text-brand-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-brand-primary">
                {t.common.programs}
              </h1>
            </div>
            <p className="max-w-2xl leading-relaxed text-brand-ink-soft">
              {lang === 'ar'
                ? 'برامج متكاملة تجمع بين العلم والتربية والإتقان، لكل الأقسام والمراحل'
                : 'Integrated programs combining knowledge, nurturing, and mastery across all departments and stages'}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Sparkles size={16} className="text-brand-secondary" />
              <span className="text-sm font-semibold text-brand-primary">
                {departments.reduce((sum, d) => sum + d.programs.length, 0)} {lang === 'ar' ? 'برنامج متاح' : 'programs available'}
              </span>
            </div>

            {/* Department count pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {departments.map((dept) => (
                <Link
                  key={dept.slug}
                  to={`/departments/${dept.slug}/programs`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: dept.accentColor.base + '12', color: dept.accentColor.base }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dept.accentColor.base }} />
                  {localize(dept.name, lang)}
                  <span className="font-bold tabular-nums">{dept.programs.length}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs by department */}
      {departments.map((dept, idx) => {
        const Icon = deptIcons[dept.slug] ?? BookOpen;
        const accent = dept.accentColor.base;
        const gold = dept.accentColor.accent;

        return (
          <section key={dept.slug} className={idx % 2 === 1 ? 'section-pad bg-brand-bg-alt/50' : 'section-pad'}>
            <div className="container-page max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
              >
                <Link
                  to={`/departments/${dept.slug}/programs`}
                  className="group flex items-center gap-3"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110"
                    style={{ backgroundColor: accent + '15', borderColor: accent + '30' }}
                  >
                    <Icon size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: accent }}>
                      {localize(dept.name, lang)}
                    </h2>
                    <p className="text-xs text-brand-ink-muted mt-0.5">
                      {dept.programs.length} {lang === 'ar' ? 'برنامج' : 'programs'}
                    </p>
                  </div>
                </Link>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dept.programs.map((program, i) => (
                  <ProgramCard key={i} program={program} index={i} accent={accent} gold={gold} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to={`/departments/${dept.slug}/programs`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3"
                  style={{ backgroundColor: accent + '12', color: accent }}
                >
                  {lang === 'ar' ? 'استكشف جميع برامج القسم' : 'Explore all department programs'}
                  <Arrow size={18} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
