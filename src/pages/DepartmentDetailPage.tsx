import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, ListChecks, ArrowRight, ArrowLeft, Send } from 'lucide-react';
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
      {/* Cover Header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: accent }}>
        <div className="absolute inset-0 pattern-bg-gold opacity-30" />
        <div className="container-page relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shrink-0">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: accent }}>
                  {localize(department.name, lang).charAt(0)}
                </span>
              </div>
            </div>
            <div className="text-center md:text-start text-white">
              <div className="text-sm font-medium text-white/70 mb-1">{t.common.established} {department.establishedDate}</div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2">
                {localize(department.name, lang)}
              </h1>
              <p className="text-white/80 max-w-2xl leading-relaxed">
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

      {/* Programs — link to dedicated programs page */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">{t.common.programs}</h2>
              <Button to={`/departments/${department.slug}/programs`} variant="primary" accentColor={department.accentColor}>
                {lang === 'ar' ? 'استكشف البرامج' : 'Explore Programs'}
                <Arrow size={18} />
              </Button>
            </div>
            <p className="text-brand-ink-soft mb-6">
              {department.programs.length} {lang === 'ar' ? 'برنامج متاح' : 'programs available'}
            </p>
            {/* Preview of first 3 programs */}
            <div className="grid sm:grid-cols-3 gap-4">
              {department.programs.slice(0, 3).map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-base p-5 flex items-center gap-3"
                  style={{ borderInlineStart: `3px solid ${accent}` }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold" style={{ backgroundColor: accent + '15', color: accent }}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-brand-ink">{localize(program.name, lang)}</span>
                </motion.div>
              ))}
            </div>
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

      {/* Registration Status */}
      <section className="pb-16">
        <div className="container-page max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-brand-ink">{t.common.registration}</h2>
            <div className="flex gap-3 flex-wrap">
              <Button to={`/posts?dept=${department.slug}`} variant="outline" accentColor={department.accentColor}>
                {lang === 'ar' ? 'عرض المنشورات' : 'View Posts'}
                <Arrow size={18} />
              </Button>
              <Button to={`/register?dept=${department.slug}`} variant="primary" accentColor={department.accentColor}>
                {t.registration.applyNow}
                <Arrow size={18} />
              </Button>
            </div>
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
