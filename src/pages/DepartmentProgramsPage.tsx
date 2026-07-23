import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useDepartment } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { ProgramCard } from '../components/ProgramCard';
import { PageHero } from '../components/PageHero';
import { Loader2 } from 'lucide-react';

export function DepartmentProgramsPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { data: department, loading } = useDepartment(slug);

  if (loading || !department) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  const accent = department.accentColor.base;
  const gold = department.accentColor.accent;
  const isSchool = department.slug === 'school';

  // School grade groupings — used for display labels
  const gradeGroupLabels = isSchool ? [
    { key: 'temhid-1', label: { ar: 'تمهيد الأول', en: 'Temhid Al-Awwal', am: 'የመጀመሪያ ዝግጅት', om: 'Qophaa\'ii 1ffaa' } },
    { key: 'temhid-2', label: { ar: 'تمهيد الأخير', en: 'Temhid Al-Akhir', am: 'የመጨረሻ ዝግጅት', om: 'Qophaa\'ii 2ffaa' } },
    { key: 'grade-1', label: { ar: 'الصف الأول', en: 'Grade 1', am: '1ኛ ክፍል', om: 'Kutaa 1' } },
    { key: 'grade-2', label: { ar: 'الصف الثاني', en: 'Grade 2', am: '2ኛ ክፍል', om: 'Kutaa 2' } },
    { key: 'grade-3', label: { ar: 'الصف الثالث', en: 'Grade 3', am: '3ኛ ክፍል', om: 'Kutaa 3' } },
    { key: 'grade-4', label: { ar: 'الصف الرابع', en: 'Grade 4', am: '4ኛ ክፍል', om: 'Kutaa 4' } },
    { key: 'grade-5', label: { ar: 'الصف الخامس', en: 'Grade 5', am: '5ኛ ክፍል', om: 'Kutaa 5' } },
  ] : null;

  return (
    <div className="pt-16">
      <PageHero
        eyebrow={lang === 'ar' ? 'برامج القسم' : 'Department Programs'}
        title={t.common.programs}
        subtitle={localize(department.shortDescription, lang)}
        icon={BookOpen}
        accentColor={accent}
      >
        <div className="flex items-center gap-3 justify-center mt-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: accent + '12', color: accent }}
          >
            <Sparkles size={14} style={{ color: gold }} />
            <span className="tabular-nums font-bold">{department.programs.length}</span>
            <span>{lang === 'ar' ? 'برنامج متاح' : 'programs available'}</span>
          </div>
          <Link
            to={`/departments/${department.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand-bg-alt text-brand-ink-soft hover:bg-brand-line transition-colors"
          >
            {lang === 'ar' ? 'عن القسم' : 'About department'}
            <Arrow size={14} />
          </Link>
        </div>
      </PageHero>

      {/* Programs listing */}
      <section className="section-pad">
        <div className="container-page max-w-5xl">
          {isSchool && gradeGroupLabels ? (
            <SchoolProgramsGroups department={department} gradeGroups={gradeGroupLabels} accent={accent} gold={gold} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {department.programs.map((program, i) => (
                <ProgramCard key={i} program={program} index={i} accent={accent} gold={gold} />
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
            <Button to={`/departments/${department.slug}/register`} variant="primary" accentColor={department.accentColor}>
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
  department: Department;
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
                    <ProgramCard key={i} program={program} index={i} accent={accent} gold={gold} variant="compact" />
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

