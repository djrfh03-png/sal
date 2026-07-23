import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  ArrowRight, ArrowLeft, Send, Loader2,
  Facebook as FacebookIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { StatCounter } from '../components/ui/StatCounter';
import { DepartmentCard } from '../components/DepartmentCard';
import { TestimonialCarousel } from '../components/TestimonialCard';
import { OrgStructureChart } from '../components/OrgStructureChart';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { TikTokIcon, TelegramIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import {
  useDepartments,
  useAnnouncements,
  useTestimonials,
  useSiteSettings,
} from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { QuranVersesSlider } from '../components/QuranVersesSlider';
import type { Department } from '../types';

export function HomePage() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [statsExpanded, setStatsExpanded] = useState(false);

  const { data: departments, loading: deptLoading } = useDepartments();
  const { data: announcements } = useAnnouncements();
  const { data: testimonials } = useTestimonials();
  const { data: siteSettings } = useSiteSettings();

  const deptMap = departments
    ? (Object.fromEntries(departments.map((d) => [d.slug, d])) as Record<string, Department>)
    : {};
  const generalAnnouncements = announcements
    ? announcements.filter((a) => a.departmentSlug === 'org')
    : [];

  const impactStats = [
    { value: 642, label: t.home.students, color: '#15803d', hint: lang === 'ar' ? 'طالب وطالبة سنوياً' : 'students yearly' },
    { value: 18, label: t.home.graduates, color: '#1E3A8A', hint: lang === 'ar' ? 'حافظات متقنات' : 'female Hafizat' },
    { value: 82, label: t.home.beneficiaries, color: '#0369A1', hint: lang === 'ar' ? 'طفل يُطعم يومياً' : 'children fed daily' },
    { value: 15, label: t.home.yearsService, color: '#925E06', hint: lang === 'ar' ? 'من الخدمة المستمرة' : 'of continuous service' },
  ];

  return (
    <div>
      {/* Hero — premium, no photo, elegant gradient background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-brand-primary-dark">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.06]" />

        {/* Soft radial glows — no photos, just light */}
        <div className="absolute top-1/4 end-0 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 start-0 w-96 h-96 rounded-full bg-brand-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-primary-light/5 blur-3xl" />

        {/* Decorative geometric corner ornaments */}
        <div className="absolute top-8 end-8 w-40 h-40 opacity-[0.08] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="#C9A227" strokeWidth="0.5">
            <path d="M100 0 L200 100 L100 200 L0 100 Z" />
            <path d="M100 25 L175 100 L100 175 L25 100 Z" />
            <path d="M100 50 L150 100 L100 150 L50 100 Z" />
            <circle cx="100" cy="100" r="20" />
          </svg>
        </div>
        <div className="absolute bottom-8 start-8 w-32 h-32 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 160 160" fill="none" stroke="#ffffff" strokeWidth="0.5">
            <path d="M80 0 L160 80 L80 160 L0 80 Z" />
            <path d="M80 20 L140 80 L80 140 L20 80 Z" />
            <circle cx="80" cy="80" r="16" />
          </svg>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-page relative z-10 pt-24 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-brand-secondary/60" />
              <span className="text-brand-secondary text-sm font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'بسم الله الرحمن الرحيم' : 'In the name of Allah'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/60" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {siteSettings ? localize(siteSettings.heroTitle, lang) : ''}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
              {siteSettings ? localize(siteSettings.heroSubtitle, lang) : ''}
            </p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="h-px w-16 bg-brand-secondary/40" />
              <div className="w-2 h-2 rotate-45 bg-brand-secondary/60" />
              <div className="h-px w-16 bg-brand-secondary/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quran Verses Strip — auto-sliding verses over a Quran backdrop, layered below hero */}
      <section className="relative -mt-12 z-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-card-hover"
          >
            <div className="absolute inset-0 rounded-3xl border-2 border-brand-secondary/40 z-30 pointer-events-none" />
            {/* Background Quran image */}
            <img
              src="https://images.pexels.com/photos/17753204/pexels-photo-17753204/free-photo-of-stand-with-koran-in-mosque.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-40 md:h-60 object-cover"
              loading="lazy"
            />
            {/* Dark overlay for verse readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-primary-dark/80 via-brand-primary-dark/75 to-brand-primary-dark/85" />
            {/* Auto-sliding verses */}
            <div className="absolute inset-0 z-20 py-6">
              <QuranVersesSlider />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Structure — static circular hub with 4 departments linked around it */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.02]" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/3 blur-3xl" />

        <div className="container-page relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-secondary/40" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'هيكلة المؤسسة' : 'Organization Structure'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-3">{t.home.aboutPreviewTitle}</h2>
            <p className="text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">{t.home.aboutPreviewText}</p>
          </div>

          {/* Static org chart — center hub with 4 departments at top/right/bottom/left */}
          <OrgStructureChart />

          {/* About CTA */}
          <div className="flex justify-center mt-16">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {lang === 'ar' ? 'اقرأ المزيد عن المؤسسة' : 'Learn More About Us'}
              <Arrow size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.home.departmentsTitle}</h2>
            <p className="text-brand-ink-soft">{t.home.departmentsSubtitle}</p>
          </motion.div>
          {deptLoading || !departments ? (
            <div className="flex justify-center py-12">
              <Loader2 size={32} className="animate-spin text-brand-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <DepartmentCard key={dept.slug} department={dept} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.home.impactTitle}</h2>
            <p className="text-brand-ink-soft">{t.home.impactSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-base p-6"
              >
                <StatCounter
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                  hint={stat.hint}
                  onSeeMore={i === 0 ? () => setStatsExpanded((v) => !v) : undefined}
                />
              </motion.div>
            ))}
          </div>

          {/* See more panel — additional context about the institution's impact */}
          <motion.div
            initial={false}
            animate={{ height: statsExpanded ? 'auto' : 0, opacity: statsExpanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-8 rounded-2xl p-6 bg-brand-bg-alt/60 border border-brand-line">
              <p className="text-sm text-brand-ink-soft leading-relaxed text-center max-w-2xl mx-auto">
                {lang === 'ar'
                  ? 'تعمل المؤسسة منذ عام 2009 على تخريج الحافظات وتعليم القرآن والعلوم الشرعية، وكفالة الأيتام وإطعام الفقراء، بفضل الله ثم دعم المحسنين.'
                  : 'Since 2009, the institution has graduated Hafizat, taught the Quran and Islamic sciences, sponsored orphans, and fed the poor — by Allah\'s grace and the support of benefactors.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* General Announcements — org-level only, simple list board */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-secondary/40" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {t.common.latestAnnouncements}
              </span>
              <div className="h-px w-12 bg-brand-secondary/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.nav.announcements}</h2>
            <p className="text-brand-ink-soft">{lang === 'ar' ? 'إعلانات المؤسسة العامة' : 'General institution announcements'}</p>
          </motion.div>

          {generalAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {generalAnnouncements.slice(0, 4).map((ann, i) => {
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
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #047857, #047857dd)' }}>
                        <span className="text-lg font-bold leading-none">{day}</span>
                        <span className="text-[10px] font-semibold uppercase mt-0.5">{month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brand-ink leading-snug mb-1 line-clamp-1">{localize(ann.title, lang)}</h3>
                        <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-1">{localize(ann.excerpt, lang)}</p>
                      </div>
                      <div className="shrink-0 w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center transition-all group-hover:bg-brand-primary group-hover:scale-110">
                        <Arrow size={16} className="text-brand-primary transition-colors group-hover:text-white" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-brand-ink-muted py-12">{t.common.noResults}</p>
          )}
          <div className="text-center mt-8">
            <Link
              to="/announcements"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line hover:-translate-y-0.5 transition-all duration-300"
            >
              {t.common.viewAll}
              <Arrow size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-secondary/50" />
              <Send size={18} className="text-brand-secondary" />
              <div className="h-px w-10 bg-brand-secondary/50" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.home.socialTitle}</h2>
            <p className="text-brand-ink-soft max-w-2xl mx-auto">{t.home.socialSubtitle}</p>
          </motion.div>

          {/* Single row of compact brand-coloured icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {siteSettings && [
              { key: 'telegram', href: siteSettings.social.telegram, label: t.contact.telegram, Icon: TelegramIcon },
              { key: 'whatsapp', href: siteSettings.social.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon },
              { key: 'facebook', href: siteSettings.social.facebook, label: 'Facebook', Icon: FacebookIcon },
              { key: 'tiktok', href: siteSettings.social.tiktok, label: 'TikTok', Icon: TikTokIcon },
            ].map(({ key, href, label, Icon }, idx) => (
              <motion.a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-2"
              >
                <span className="w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-soft transition-colors duration-300 group-hover:bg-brand-secondary">
                  <Icon size={18} />
                </span>
                <span className="text-[11px] font-medium text-brand-ink-muted group-hover:text-brand-ink transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">{t.common.testimonials}</h2>
          </motion.div>
          {testimonials && testimonials.length > 0 && (
            <TestimonialCarousel testimonials={testimonials} deptMap={deptMap} />
          )}
        </div>
      </section>
    </div>
  );
}
