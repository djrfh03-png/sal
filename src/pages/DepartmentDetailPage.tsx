import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, ListChecks, ArrowRight, ArrowLeft, Send, BookOpen, FileText, Megaphone } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { announcements } from '../data/announcements';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { RegistrationStatusBanner } from '../components/RegistrationStatusBanner';
import { StatCounter } from '../components/ui/StatCounter';
import { ProgramCard } from '../components/ProgramCard';

type Tab = 'mission' | 'vision' | 'values' | 'objectives';

export function DepartmentDetailPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>('mission');
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

  const tabs: { key: Tab; label: string; icon: typeof Target }[] = [
    { key: 'mission', label: t.common.mission, icon: Target },
    { key: 'vision', label: t.common.vision, icon: Eye },
    { key: 'values', label: t.common.values, icon: Gem },
    { key: 'objectives', label: t.common.objectives, icon: ListChecks },
  ];

  const tabContent: Record<Tab, string | string[]> = {
    mission: localize(department.mission, lang),
    vision: localize(department.vision, lang),
    values: department.values.map((v) => localize(v, lang)),
    objectives: department.objectives.map((o) => localize(o, lang)),
  };

  return (
    <div className="pt-16">
      {/* Cover Header — no colored background, color on text */}
      <section className="relative overflow-hidden bg-brand-bg-alt/30" style={{ borderInlineStart: `4px solid ${accent}` }}>
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.03]" />
        <div className="absolute top-1/4 end-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: accent + '08' }} />
        <div className="container-page relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center border-2 shrink-0"
              style={{ backgroundColor: accent + '15', borderColor: accent + '30' }}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: accent }}>
                  {localize(department.name, lang).charAt(0)}
                </span>
              </div>
            </div>
            <div className="text-center md:text-start">
              <div className="text-sm font-medium mb-1" style={{ color: accent }}>{t.common.established} {department.establishedDate}</div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2" style={{ color: accent }}>
                {localize(department.name, lang)}
              </h1>
              <p className="text-brand-ink-soft max-w-2xl leading-relaxed">
                {localize(department.shortDescription, lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="section-pad">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-ink-soft leading-relaxed text-lg">
              {localize(department.fullDescription, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission/Vision/Values/Objectives Tabs */}
      <section className="pb-16">
        <div className="container-page max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key ? 'text-white shadow-card' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
                }`}
                style={activeTab === tab.key ? { backgroundColor: accent } : {}}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card-base p-6"
          >
            {Array.isArray(tabContent[activeTab]) ? (
              <ul className="space-y-3">
                {(tabContent[activeTab] as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                    <span className="text-brand-ink-soft leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-brand-ink-soft leading-relaxed text-lg">{tabContent[activeTab] as string}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Programs — explore card with preview + link to full programs page */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen size={22} style={{ color: accent }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: accent }}>
                {t.common.programs}
              </h2>
            </div>
            <p className="text-brand-ink-soft">
              {lang === 'ar'
                ? 'برامج متكاملة تجمع بين العلم والتربية والإتقان'
                : 'Integrated programs combining knowledge, nurturing, and mastery'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {department.programs.slice(0, 3).map((program, i) => (
              <ProgramCard key={i} program={program} index={i} accent={accent} gold={department.accentColor.accent} />
            ))}
          </div>

          <div className="text-center">
            <Button
              to={`/departments/${department.slug}/programs`}
              variant="outline"
              accentColor={department.accentColor}
            >
              {lang === 'ar' ? 'استكشف جميع البرامج' : 'Explore all programs'}
              <Arrow size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: accent }}>
              {lang === 'ar' ? 'إحصائيات القسم' : 'Department Statistics'}
            </h2>
            <p className="text-brand-ink-soft">{lang === 'ar' ? 'أرقام تعكس مسيرة القسم وإنجازاته' : 'Numbers reflecting the department\'s journey and achievements'}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {department.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base p-8"
              >
                <StatCounter
                  value={stat.value}
                  label={localize(stat.label, lang)}
                  color={department.slug === 'charity' && i === 0 ? department.accentColor.heart : accent}
                  suffix=""
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Announcements */}
      <DeptAnnouncements slug={department.slug} accent={accent} />

      {/* Posts explore card */}
      <section className="section-pad">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/posts?dept=${department.slug}`}
              className="group relative block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${department.accentColor.accent})` }} />
              <div className="absolute top-4 end-4 w-24 h-24 opacity-[0.04] pointer-events-none">
                <svg viewBox="0 0 96 96" fill="none" stroke={accent} strokeWidth="0.5">
                  <path d="M48 0 L96 48 L48 96 L0 48 Z" />
                  <path d="M48 12 L84 48 L48 84 L12 48 Z" />
                  <circle cx="48" cy="48" r="10" />
                </svg>
              </div>
              <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: accent + '15' }}
                >
                  <FileText size={28} style={{ color: accent }} />
                </div>
                <div className="flex-1 text-center md:text-start">
                  <h3 className="text-xl font-bold text-brand-ink mb-1.5">
                    {lang === 'ar' ? 'منشورات القسم' : 'Department Posts'}
                  </h3>
                  <p className="text-sm text-brand-ink-soft leading-relaxed">
                    {lang === 'ar'
                      ? 'تابع آخر الأخبار والأنشطة والمنشورات من هذا القسم'
                      : 'Follow the latest news, activities, and posts from this department'}
                  </p>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shrink-0 transition-all group-hover:gap-3"
                  style={{ backgroundColor: accent + '12', color: accent }}
                >
                  {lang === 'ar' ? 'تصفح الآن' : 'Browse Now'}
                  <Arrow size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Registration Status */}
      <section className="pb-16">
        <div className="container-page max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-brand-ink">{t.common.registration}</h2>
            <Button to={`/register?dept=${department.slug}`} variant="primary" accentColor={department.accentColor}>
              {t.registration.applyNow}
              <Arrow size={18} />
            </Button>
          </div>
          <RegistrationStatusBanner status={department.registrationStatus} accentColor={department.accentColor} />
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="pb-20">
        <div className="container-page">
          <div className="rounded-3xl p-8 md:p-12 text-center" style={{ backgroundColor: accent + '10' }}>
            <Send size={32} className="mx-auto mb-4" style={{ color: accent }} />
            <h3 className="text-xl font-bold text-brand-ink mb-2">
              {lang === 'ar' ? 'انضم إلى قناتنا على التيليجرام' : 'Join our Telegram channel'}
            </h3>
            <p className="text-brand-ink-soft mb-6">
              {lang === 'ar' ? 'تابع آخر الأخبار والإعلانات' : 'Follow our latest news and announcements'}
            </p>
            <Button href={department.telegramLink} variant="primary" accentColor={department.accentColor}>
              <Send size={18} />
              {t.contact.telegram}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function DeptAnnouncements({ slug, accent }: { slug: string; accent: string }) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const deptAnnouncements = announcements.filter(a => a.departmentSlug === slug);

  return (
    <section className="section-pad bg-brand-bg-alt/50">
      <div className="container-page max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Megaphone size={20} style={{ color: accent }} />
            <h2 className="text-2xl font-bold" style={{ color: accent }}>
              {lang === 'ar' ? 'إعلانات القسم' : 'Department Announcements'}
            </h2>
          </div>
          <p className="text-brand-ink-soft">{lang === 'ar' ? 'آخر أخبار وأنشطة القسم' : 'Latest news and activities'}</p>
        </motion.div>

        {deptAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {deptAnnouncements.slice(0, 4).map((ann, i) => {
              const date = new Date(ann.date);
              const day = date.getDate();
              const month = date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { month: 'short' });
              return (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    to={`/announcements/${ann.id}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
                      <span className="text-lg font-bold leading-none">{day}</span>
                      <span className="text-[10px] font-semibold uppercase mt-0.5">{month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-ink leading-snug mb-1 line-clamp-1">{localize(ann.title, lang)}</h3>
                      <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-1">{localize(ann.excerpt, lang)}</p>
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: accent + '10' }}>
                      <Arrow size={16} style={{ color: accent }} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Empty state — every department has an announcements place
          <div className="card-base p-10 text-center">
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: accent + '12' }}
            >
              <Megaphone size={26} style={{ color: accent }} />
            </div>
            <p className="text-brand-ink font-semibold mb-1">
              {lang === 'ar' ? 'لا توجد إعلانات حالياً' : 'No announcements yet'}
            </p>
            <p className="text-sm text-brand-ink-muted">
              {lang === 'ar'
                ? 'تابعنا للاطلاع على آخر أخبار وأنشطة القسم'
                : 'Stay tuned for the latest news and activities from this department'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
