import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, ListChecks, ArrowRight, ArrowLeft, Send, BookOpen, FileText, Megaphone, Sparkles, Home, ChevronRight, Facebook, Mail, Users, GraduationCap, HeartHandshake, BookMarked, ScrollText, HandPlatter, Building2, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useDepartment, useAnnouncementsByDepartment, useSiteSettings } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { TelegramIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import { Loader2 } from 'lucide-react';

const contactHeadingLabel: Record<string, { en: string; ar: string; am: string; om: string }> = {
  'center-hifz': { en: 'the Hifz Center', ar: 'مركز الحفظ', am: 'የሐፊዝ ማዕከል', om: 'Wiirtuu Hafizaa' },
  'school': { en: 'the Medresa', ar: 'المدرسة', am: 'ትምህርት ቤቱ', om: 'Barumsicha' },
  'charity': { en: 'Beyturahma', ar: 'بيت الرحمة', am: 'ቤተ ረሕማ', om: 'Beyturahma' },
  'halqa': { en: 'Halka Center', ar: 'الحلقة', am: 'የሐልቃ ማዕከል', om: 'Wiirtuu Halqaa' },
};

const departmentStatIcons: Record<string, LucideIcon[]> = {
  'center-hifz': [Users, GraduationCap],
  'school': [Users, BookOpen],
  'halqa': [BookMarked, ScrollText],
  'charity': [HandPlatter, HeartHandshake],
};
import { Button } from '../components/ui/Button';
import { RegistrationStatusBanner } from '../components/RegistrationStatusBanner';
import { EditableStatCard } from '../components/ui/EditableStatCard';
import { useAdminStoreOrNull } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';

type Tab = 'mission' | 'vision' | 'values' | 'objectives';

export function DepartmentDetailPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>('mission');
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const adminStore = useAdminStoreOrNull();
  const { showToast } = useToast();
  const { data: fetchedDept } = useDepartment(slug);
  const { data: deptAnnouncementsData } = useAnnouncementsByDepartment(slug as DepartmentSlug | undefined);
  const { data: siteSettings } = useSiteSettings();

  const department = adminStore?.departments.find((d) => d.slug === slug) ?? fetchedDept;

  if (!department) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        {fetchedDept === undefined ? (
          <Loader2 size={32} className="animate-spin text-brand-primary" />
        ) : (
          <div className="text-center">
            <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
            <Button to="/departments" variant="outline">{t.common.back}</Button>
          </div>
        )}
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
      {/* Cover Header — clean accent-color design, refined */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: accent }}
      >
        {/* Single soft glow */}
        <div
          className="absolute top-0 end-0 w-96 h-96 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: department.accentColor.accent }}
        />

        <div className="container-page relative z-10 py-12 md:py-16">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-8 flex-wrap"
          >
            <Link to="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <Home size={13} />
              <span>{t.nav.home}</span>
            </Link>
            <ChevronRight size={13} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <Link to="/departments" className="hover:text-white transition-colors">{t.nav.departments}</Link>
            <ChevronRight size={13} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span className="text-white font-semibold truncate max-w-[200px]">{localize(department.name, lang)}</span>
          </motion.nav>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Logo medallion — clean circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="shrink-0"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center p-2.5">
                <DepartmentLogo slug={department.slug} size="xl" />
              </div>
            </motion.div>

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              className="flex-1 text-center md:text-start"
            >
              {/* Established badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 mb-3">
                <span className="text-[11px] font-semibold text-white tracking-wide">
                  {t.common.established} {department.establishedDate}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-2">
                {localize(department.name, lang)}
              </h1>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl md:mx-0 mx-auto">
                {localize(department.shortDescription, lang)}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Accent bottom line */}
        <div className="h-1" style={{ backgroundColor: department.accentColor.accent }} />
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

      {/* Programs — single attractive card linking to the full programs list */}
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
              className="group relative block rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
            >
              {/* Decorative patterns */}
              <div className="absolute inset-0 pattern-bg-gold opacity-20" />
              <div className="absolute top-0 end-0 w-48 h-48 opacity-[0.08] pointer-events-none">
                <svg viewBox="0 0 192 192" fill="none" stroke={department.accentColor.accent} strokeWidth="0.5">
                  <path d="M96 0 L192 96 L96 192 L0 96 Z" />
                  <path d="M96 24 L168 96 L96 168 L24 96 Z" />
                  <path d="M96 48 L144 96 L96 144 L48 96 Z" />
                  <circle cx="96" cy="96" r="18" />
                </svg>
              </div>
              <div className="absolute bottom-0 start-0 w-32 h-32 opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 128 128" fill="none" stroke="#ffffff" strokeWidth="0.5">
                  <path d="M64 0 L128 64 L64 128 L0 64 Z" />
                  <path d="M64 16 L112 64 L64 112 L16 64 Z" />
                </svg>
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-3"
                  style={{ backgroundColor: department.accentColor.accent + '20', borderColor: department.accentColor.accent + '40' }}
                >
                  <BookOpen size={32} className="text-white" />
                </div>
                <div className="flex-1 text-center md:text-start">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Sparkles size={14} style={{ color: department.accentColor.accent }} />
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: department.accentColor.accent }}
                    >
                      {lang === 'ar' ? 'برامج القسم' : 'Department Programs'}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {lang === 'ar' ? 'استكشف جميع برامج القسم' : 'Explore All Department Programs'}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'برامج متكاملة تجمع بين العلم والتربية والإتقان، لكل المراحل'
                      : 'Integrated programs combining knowledge, nurturing, and mastery across all stages'}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-sm font-semibold text-white">
                    <span className="tabular-nums">{department.programs.length}</span>
                    <span>{lang === 'ar' ? 'برنامج متاح' : 'programs available'}</span>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shrink-0 transition-all group-hover:gap-3"
                  style={{ backgroundColor: department.accentColor.accent + '20', color: department.accentColor.accent }}
                >
                  {lang === 'ar' ? 'تصفح الآن' : 'Browse Now'}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {department.stats.map((stat, i) => {
              const statColor = department.slug === 'charity' && i === 0 ? department.accentColor.heart : accent;
              const statIcons = departmentStatIcons[department.slug] ?? [];
              return (
                <EditableStatCard
                  key={i}
                  value={stat.value}
                  label={localize(stat.label, lang)}
                  color={statColor}
                  suffix=""
                  icon={statIcons[i] ?? Target}
                  delay={i * 0.1}
                  editable={!!adminStore}
                  onValueChange={(val) => {
                    if (!adminStore) return;
                    adminStore.updateDepartmentStat(department.id, i, val);
                    showToast(t.admin.saved, 'success');
                  }}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* Department Announcements */}
      <DeptAnnouncements slug={department.slug} accent={accent} announcements={deptAnnouncementsData ?? []} />

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
            <Button to={`/departments/${department.slug}/register`} variant="primary" accentColor={department.accentColor}>
              {t.registration.applyNow}
              <Arrow size={18} />
            </Button>
          </div>
          <RegistrationStatusBanner status={department.registrationStatus} accentColor={department.accentColor} />
        </div>
      </section>

      {/* Contact department — center block with social icons */}
      <section className="pb-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
            style={{ background: `linear-gradient(135deg, ${accent}0f, ${accent}05)` }}
          >
            {/* Decorative concentric arcs */}
            <div className="absolute top-0 end-0 w-40 h-40 opacity-[0.08] pointer-events-none">
              <svg viewBox="0 0 160 160" fill="none" stroke={accent} strokeWidth="0.6">
                <path d="M80 0 L160 80 L80 160 L0 80 Z" />
                <path d="M80 20 L140 80 L80 140 L20 80 Z" />
                <path d="M80 40 L120 80 L80 120 L40 80 Z" />
              </svg>
            </div>
            <div className="absolute bottom-0 start-0 w-32 h-32 opacity-[0.06] pointer-events-none">
              <svg viewBox="0 0 128 128" fill="none" stroke={accent} strokeWidth="0.6">
                <path d="M64 0 L128 64 L64 128 L0 64 Z" />
                <path d="M64 16 L112 64 L64 112 L16 64 Z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-10" style={{ backgroundColor: accent, opacity: 0.4 }} />
                <Send size={18} style={{ color: accent }} />
                <div className="h-px w-10" style={{ backgroundColor: accent, opacity: 0.4 }} />
              </div>

              {/* Contact + department name */}
              <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-2">
                {lang === 'ar' ? 'تواصل مع ' : lang === 'am' ? 'ያግኙ ' : lang === 'om' ? 'Quunnamuu ' : 'Contact '}
                <span style={{ color: accent }}>
                  {(contactHeadingLabel[department.slug]?.[lang]) ?? localize(department.name, lang)}
                </span>
              </h3>
              <p className="text-sm text-brand-ink-soft max-w-xl mx-auto mb-9">
                {lang === 'ar'
                  ? 'تابعنا على المنصات أو راسلنا مباشرة لمعرفة المزيد عن برامجنا وأنشطتنا'
                  : 'Follow us on our platforms or reach out directly to learn more about our programs and activities'}
              </p>

              {/* Social icons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
                {[
                  { key: 'facebook', href: siteSettings?.social.facebook ?? '#', label: 'Facebook', Icon: Facebook },
                  { key: 'telegram', href: department.telegramLink, label: t.contact.telegram, CustomIcon: TelegramIcon },
                  { key: 'whatsapp', href: siteSettings?.social.whatsapp ?? '#', label: 'WhatsApp', CustomIcon: WhatsAppIcon },
                  { key: 'email', href: `mailto:${siteSettings?.contactEmail ?? ''}`, label: t.contact.email ?? 'Email', Icon: Mail },
                ].map(({ key, href, label, Icon, CustomIcon }, idx) => (
                  <motion.a
                    key={key}
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel={key === 'email' ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    title={label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:shadow-card"
                      style={{ backgroundColor: accent, color: '#fff' }}
                    >
                      {Icon ? <Icon size={20} /> : CustomIcon ? <CustomIcon size={20} className="text-white" /> : null}
                    </span>
                    <span className="text-[11px] font-medium text-brand-ink-muted group-hover:text-brand-ink transition-colors">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function DeptAnnouncements({ slug, accent, announcements }: { slug: string; accent: string; announcements: Announcement[] }) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const deptAnnouncements = announcements.filter(a => a.departmentSlug === slug);

  if (deptAnnouncements.length === 0) return null;

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
      </div>
    </section>
  );
}
