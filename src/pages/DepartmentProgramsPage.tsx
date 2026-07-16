import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';

export function DepartmentProgramsPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const department = departments.find((d) => d.slug === slug);

  if (!department) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
          <Button to="/departments" variant="outline">{t.common.back}</Button>
        </div>
      </div>
    );
  }

  const accent = department.accentColor.base;
  const gold = department.accentColor.accent;
  const isSchool = department.slug === 'school';

  // School grade groupings — used for display labels
  const gradeGroupLabels = isSchool ? [
    { key: 'temhid-1', label: { ar: 'تمهيد الأول', en: 'Temhid Al-Awwal', am: '', om: '' } },
    { key: 'temhid-2', label: { ar: 'تمهيد الأخير', en: 'Temhid Al-Akhir', am: '', om: '' } },
    { key: 'grade-1', label: { ar: 'الصف الأول', en: 'Grade 1', am: '', om: '' } },
    { key: 'grade-2', label: { ar: 'الصف الثاني', en: 'Grade 2', am: '', om: '' } },
    { key: 'grade-3', label: { ar: 'الصف الثالث', en: 'Grade 3', am: '', om: '' } },
    { key: 'grade-4', label: { ar: 'الصف الرابع', en: 'Grade 4', am: '', om: '' } },
    { key: 'grade-5', label: { ar: 'الصف الخامس', en: 'Grade 5', am: '', om: '' } },
  ] : null;

  return (
    <div className="pt-16">
      {/* Header — no colored background, color on text */}
      <section className="relative overflow-hidden bg-brand-bg-alt/30" style={{ borderInlineStart: `4px solid ${accent}` }}>
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.03]" />
        <div className="absolute top-1/4 end-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: accent + '08' }} />
        <div className="container-page relative py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/departments/${department.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors"
              style={{ color: accent }}
            >
              <Arrow size={16} />
              {localize(department.name, lang)}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{ backgroundColor: accent + '15', borderColor: accent + '30' }}
              >
                <BookOpen size={24} style={{ color: accent }} />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold" style={{ color: accent }}>
                {t.common.programs}
              </h1>
            </div>
            <p className="max-w-2xl leading-relaxed text-brand-ink-soft">
              {localize(department.shortDescription, lang)}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Sparkles size={16} style={{ color: gold }} />
              <span className="text-sm font-semibold" style={{ color: accent }}>
                {department.programs.length} {lang === 'ar' ? 'برنامج متاح' : 'programs available'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs listing */}
      <section className="section-pad">
        <div className="container-page max-w-5xl">
          {isSchool && gradeGroupLabels ? (
            <SchoolProgramsGroups department={department} gradeGroups={gradeGroupLabels} accent={accent} gold={gold} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {department.programs.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                  style={{ borderInlineStart: `4px solid ${accent}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold transition-transform group-hover:scale-110"
                      style={{ backgroundColor: accent + '15', color: accent }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-ink text-base leading-snug mb-1">
                        {localize(program.name, lang)}
                      </h3>
                      {program.description && (
                        <p className="text-sm text-brand-ink-soft leading-relaxed">
                          {localize(program.description, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-page max-w-4xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button to={`/departments/${department.slug}`} variant="outline" accentColor={department.accentColor}>
              <Arrow size={18} />
              {t.common.back}
            </Button>
            <Button to={`/register?dept=${department.slug}`} variant="primary" accentColor={department.accentColor}>
              {t.registration.applyNow}
              <Arrow size={18} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SchoolProgramsGroups({
  department,
  gradeGroups,
  accent,
  gold,
}: {
  department: typeof departments[0];
  gradeGroups: { key: string; label: { ar: string; en: string; am: string; om: string } }[];
  accent: string;
  gold: string;
}) {
  const { lang } = useI18n();
  const [openGrade, setOpenGrade] = useState<string | null>(gradeGroups[0]?.key ?? null);

  return (
    <div className="space-y-4">
      {gradeGroups.map((group) => {
        const isOpen = openGrade === group.key;
        const programs = department.programs.filter((p) => p.gradeGroup === group.key);

        return (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-line"
          >
            <button
              onClick={() => setOpenGrade(isOpen ? null : group.key)}
              className="w-full flex items-center justify-between p-5 hover:bg-brand-bg-alt/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: accent + '15', color: accent }}
                >
                  {group.key.startsWith('grade') ? group.key.split('-')[1] : 'T'}
                </div>
                <span className="font-bold text-brand-ink text-base">
                  {localize(group.label, lang)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: gold + '20', color: accent }}
                >
                  {programs.length} {lang === 'ar' ? 'برامج' : 'programs'}
                </span>
                <ChevronDown
                  size={20}
                  className="text-brand-ink-muted transition-transform"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                />
              </div>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  {programs.map((program, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-brand-bg-alt/50"
                      style={{ borderInlineStart: `3px solid ${accent}` }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
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
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
