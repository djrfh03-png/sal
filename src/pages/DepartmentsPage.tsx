import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Users, Heart, ChevronRight, ChevronLeft,
  ChevronDown, ArrowRight, ArrowLeft, FileText, Sparkles,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { DepartmentCard } from '../components/DepartmentCard';
import type { Department } from '../types';

export function DepartmentsPage() {
  const { t, lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const deptIcons: Record<string, typeof BookOpen> = {
    'center-hifz': BookOpen,
    'school': GraduationCap,
    'halqa': Users,
    'charity': Heart,
  };

  return (
    <div className="pt-16">
      {/* Quran-themed hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8170707/pexels-photo-8170707.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary-dark/85 via-brand-primary-dark/75 to-brand-primary-dark/90" />
          <div className="absolute top-1/4 end-0 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl" />
        </div>

        <div className="container-page relative z-10 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-brand-secondary/50" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'أقسامنا' : 'Our Departments'}
              </span>
              <div className="h-px w-10 bg-brand-secondary/50" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.departments.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{t.departments.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Department cards */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs section — one interactive card per department */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.common.programs}</h2>
            <p className="text-brand-ink-soft">
              {lang === 'ar' ? 'استكشف برامج كل قسم' : 'Explore programs for each department'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <ProgramCard key={dept.slug} department={dept} icon={deptIcons[dept.slug] ?? BookOpen} delay={i * 0.1} />
            ))}
          </div>

          {/* Madrasa exception: expandable grade sections */}
          <MadrasaGrades />
        </div>
      </section>

      {/* Posts feature card */}
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
                <svg viewBox="0 0 160 160" fill="none" stroke="#c9a24b" strokeWidth="0.5">
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

// Interactive Program Card for each department
function ProgramCard({ department, icon: Icon, delay }: { department: Department; icon: typeof BookOpen; delay: number }) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const accent = department.accentColor.base;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/departments/${department.slug}/programs`}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 block h-full"
      >
        {/* Top gradient bar */}
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${department.accentColor.accent})` }} />

        {/* Decorative pattern */}
        <div className="absolute top-2 end-2 w-16 h-16 opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 64 64" fill="none" stroke={accent} strokeWidth="0.5">
            <path d="M32 0 L64 32 L32 64 L0 32 Z" />
            <path d="M32 8 L56 32 L32 56 L8 32 Z" />
            <circle cx="32" cy="32" r="6" />
          </svg>
        </div>

        <div className="p-6 relative">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ backgroundColor: accent + '15' }}
          >
            <Icon size={24} style={{ color: accent }} />
          </div>

          <h3 className="font-bold text-brand-ink text-sm leading-snug mb-2 line-clamp-2">
            {localize(department.name, lang)}
          </h3>
          <p className="text-xs text-brand-ink-soft leading-relaxed mb-4 line-clamp-2">
            {localize(department.shortDescription, lang)}
          </p>

          {/* Program count */}
          <div className="flex items-center gap-1.5 text-xs text-brand-ink-muted mb-4">
            <Sparkles size={14} style={{ color: department.accentColor.accent }} />
            <span>{department.programs.length} {lang === 'ar' ? 'برنامج متاح' : 'programs available'}</span>
          </div>

          {/* Explore Programs button */}
          <div
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: accent }}
          >
            {lang === 'ar' ? 'استكشف البرامج' : 'Explore Programs'}
            <Arrow size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Madrasa expandable grade sections
function MadrasaGrades() {
  const { lang } = useI18n();
  const [openGrade, setOpenGrade] = useState<string | null>(null);
  const school = departments.find((d) => d.slug === 'school');
  if (!school) return null;

  const accent = school.accentColor.base;

  // Group school programs by grade levels
  const gradeGroups = [
    { key: 'temhid-1', label: { ar: 'تمهيد الأول', en: 'Temhid Al-Awwal', am: '', om: '' }, indices: [0] },
    { key: 'temhid-2', label: { ar: 'تمهيد الأخير', en: 'Temhid Al-Akhir', am: '', om: '' }, indices: [1] },
    { key: 'grade-1', label: { ar: 'الصف الأول', en: 'Grade 1', am: '', om: '' }, indices: [2, 3, 4] },
    { key: 'grade-2', label: { ar: 'الصف الثاني', en: 'Grade 2', am: '', om: '' }, indices: [5, 6] },
    { key: 'grade-3', label: { ar: 'الصف الثالث', en: 'Grade 3', am: '', om: '' }, indices: [7, 8] },
    { key: 'grade-4', label: { ar: 'الصف الرابع', en: 'Grade 4', am: '', om: '' }, indices: [9] },
    { key: 'grade-5', label: { ar: 'الصف الخامس', en: 'Grade 5', am: '', om: '' }, indices: [10] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-brand-ink mb-2">
          {lang === 'ar' ? 'برامج المدرسة حسب المراحل' : 'School Programs by Grade Level'}
        </h3>
        <p className="text-sm text-brand-ink-soft">
          {lang === 'ar' ? 'اضغط على كل مرحلة لعرض برامجها' : 'Click each grade to view its programs'}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {gradeGroups.map((group) => {
          const isOpen = openGrade === group.key;
          const programs = group.indices
            .map((i) => school.programs[i])
            .filter(Boolean);

          return (
            <div
              key={group.key}
              className="bg-white rounded-2xl shadow-soft overflow-hidden border border-brand-line"
            >
              <button
                onClick={() => setOpenGrade(isOpen ? null : group.key)}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-bg-alt/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: accent + '15', color: accent }}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <span className="font-semibold text-sm text-brand-ink">
                    {localize(group.label, lang)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-ink-muted">{programs.length} {lang === 'ar' ? 'برامج' : 'programs'}</span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-2">
                      {programs.map((program, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg-alt/50"
                          style={{ borderInlineStart: `3px solid ${accent}` }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ backgroundColor: accent + '15', color: accent }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium text-brand-ink">
                            {localize(program.name, lang)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
