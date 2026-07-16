import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, ListChecks, ArrowRight, ArrowLeft, Send, BookOpen, FileText } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { RegistrationStatusBanner } from '../components/RegistrationStatusBanner';
import { StatCounter } from '../components/ui/StatCounter';

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

      {/* Programs — single explore card linking to dedicated programs page */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/departments/${department.slug}/programs`}
              className="group relative block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Top gradient bar */}
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${department.accentColor.accent})` }} />

              {/* Decorative pattern */}
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
                  <BookOpen size={28} style={{ color: accent }} />
                </div>
                <div className="flex-1 text-center md:text-start">
                  <h3 className="text-xl font-bold text-brand-ink mb-1.5">
                    {t.common.programs}
                  </h3>
                  <p className="text-sm text-brand-ink-soft leading-relaxed">
                    {department.programs.length} {lang === 'ar' ? 'برنامج متاح — استكشف جميع البرامج المتاحة في هذا القسم' : 'programs available — explore all programs offered by this department'}
                  </p>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shrink-0 transition-all group-hover:gap-3"
                  style={{ backgroundColor: accent + '12', color: accent }}
                >
                  {lang === 'ar' ? 'استكشف البرامج' : 'Explore Programs'}
                  <Arrow size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-pad">
        <div className="container-page">
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
