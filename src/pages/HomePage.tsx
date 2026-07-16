import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Heart, Users, GraduationCap, Library } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { StatCounter } from '../components/ui/StatCounter';
import { DepartmentCard } from '../components/DepartmentCard';
import { TestimonialCarousel } from '../components/TestimonialCard';
import { departments } from '../data/departments';
import { announcements } from '../data/announcements';
import { testimonials } from '../data/misc';
import { siteSettings } from '../data/misc';
import { localize } from '../utils/localize';
import type { Department } from '../types';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': BookOpen,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

export function HomePage() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const deptMap = Object.fromEntries(departments.map((d) => [d.slug, d])) as Record<string, Department>;
  const generalAnnouncements = announcements.filter(a => a.departmentSlug === 'org');

  const impactStats = [
    { value: 642, label: t.home.students, color: '#0f4d3a' },
    { value: 18, label: t.home.graduates, color: '#123a70' },
    { value: 82, label: t.home.beneficiaries, color: '#1a56b8' },
    { value: 15, label: t.home.yearsService, color: '#c9a24b' },
  ];

  return (
    <div>
      {/* Hero — full-width Quran image with parallax + dark overlay */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%]">
          <img
            src="https://images.pexels.com/photos/15403114/pexels-photo-15403114/free-photo-of-empty-interior-of-a-mosque.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        {/* Dark gradient overlay for readability */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 bg-gradient-to-b from-brand-primary-dark/85 via-brand-primary-dark/70 to-brand-primary-dark/90" />
        {/* Gold accent glows */}
        <div className="absolute top-1/4 end-0 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 start-0 w-96 h-96 rounded-full bg-brand-secondary/5 blur-3xl" />

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
              {localize(siteSettings.heroTitle, lang)}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
              {localize(siteSettings.heroSubtitle, lang)}
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

      {/* Quran Photo Strip — layered below hero */}
      <section className="relative -mt-12 z-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-card-hover"
          >
            <div className="absolute inset-0 rounded-3xl border-2 border-brand-secondary/40 z-20 pointer-events-none" />
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-brand-primary-dark/60 to-transparent" />
              <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-brand-primary-dark/60 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand-primary-dark/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-primary-dark/40 to-transparent" />
            </div>
            <img
              src="https://images.pexels.com/photos/17753204/pexels-photo-17753204/free-photo-of-stand-with-koran-in-mosque.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-32 md:h-48 object-cover"
              loading="lazy"
            />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
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
                <StatCounter {...stat} />
              </motion.div>
            ))}
          </div>
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
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #0f4d3a, #0f4d3add)' }}>
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
          <TestimonialCarousel testimonials={testimonials} deptMap={deptMap} />
        </div>
      </section>
    </div>
  );
}

function OrgStructureChart() {
  const { lang } = useI18n();
  const accentSecondary = '#c9a24b';

  // Positions: top, right, bottom, left
  const positions = [
    { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' },
    { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },
    { top: '50%', left: '0%', transform: 'translate(0, -50%)' },
  ];

  // SVG line endpoints from center (250,250) to each department
  const lineEndpoints = [
    { x2: 250, y2: 65 },
    { x2: 435, y2: 250 },
    { x2: 250, y2: 435 },
    { x2: 65, y2: 250 },
  ];

  return (
    <div className="relative mx-auto" style={{ maxWidth: '600px', aspectRatio: '1 / 1' }}>
      {/* SVG connecting lines layer */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        fill="none"
      >
        {/* Decorative circles */}
        <circle cx="250" cy="250" r="240" stroke={accentSecondary} strokeWidth="1" opacity="0.12" />
        <circle cx="250" cy="250" r="200" stroke={accentSecondary} strokeWidth="0.5" opacity="0.08" strokeDasharray="4 6" />

        {/* Connecting lines from center to each department */}
        {lineEndpoints.map((ep, i) => (
          <g key={i}>
            <line x1="250" y1="250" x2={ep.x2} y2={ep.y2} stroke={accentSecondary} strokeWidth="1.5" opacity="0.3" />
            <circle cx={ep.x2} cy={ep.y2} r="4" fill={accentSecondary} opacity="0.4" />
            <circle cx="250" cy="250" r="3" fill={accentSecondary} opacity="0.5" />
          </g>
        ))}
      </svg>

      {/* Central organization hub */}
      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/20 scale-110" />
          <div className="absolute inset-0 rounded-full border border-brand-secondary/10 scale-125" />

          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-card-hover flex flex-col items-center justify-center text-center p-6">
            <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/30" />

            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-[0.08]" fill="none" stroke="#c9a24b" strokeWidth="0.3">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="38" />
                <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
                <Library size={20} className="text-brand-secondary" />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
              </h3>
              <p className="text-[9px] text-white/40 mt-0.5">
                {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Department nodes around the center */}
      {departments.map((dept, i) => {
        const Icon = deptIcons[dept.slug] ?? BookOpen;
        const accent = dept.accentColor.base;
        const pos = positions[i];
        return (
          <Link
            key={dept.slug}
            to={`/departments/${dept.slug}`}
            className="group absolute z-10"
            style={{ top: pos.top, left: pos.left, transform: pos.transform }}
          >
            <div className="relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-3 w-28 md:w-36">
              <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }} />

              <div className="flex flex-col items-center text-center pt-1.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: accent + '15' }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h4 className="text-[11px] md:text-xs font-bold text-brand-ink leading-snug line-clamp-2 min-h-[2.4em]">
                  {localize(dept.name, lang)}
                </h4>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-brand-ink-muted">
                  <span className="font-semibold" style={{ color: accent }}>
                    {dept.programs.length}
                  </span>
                  <span>{lang === 'ar' ? 'برنامج' : 'programs'}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
