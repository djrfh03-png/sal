import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Heart, Users, GraduationCap, Library, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { StatCounter } from '../components/ui/StatCounter';
import { DepartmentCard } from '../components/DepartmentCard';
import { AnnouncementBoardCard } from '../components/AnnouncementCard';
import { TestimonialCarousel } from '../components/TestimonialCard';
import { departments } from '../data/departments';
import { announcements } from '../data/announcements';
import { testimonials } from '../data/misc';
import { siteSettings } from '../data/misc';
import { localize } from '../utils/localize';
import type { Department } from '../types';

export function HomePage() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const deptMap = Object.fromEntries(departments.map((d) => [d.slug, d])) as Record<string, Department>;
  const latestAnnouncements = announcements.slice(0, 3);

  const impactStats = [
    { value: 642, label: t.home.students, color: '#0f4d3a' },
    { value: 18, label: t.home.graduates, color: '#123a70' },
    { value: 82, label: t.home.beneficiaries, color: '#1a56b8' },
    { value: 15, label: t.home.yearsService, color: '#c9a24b' },
  ];

  const deptIcons: Record<string, typeof BookOpen> = {
    'center-hifz': BookOpen,
    'school': GraduationCap,
    'halqa': Users,
    'charity': Heart,
  };

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

      {/* Organization Structure — central org hub with departments */}
      <section className="section-pad relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.02]" />
        <div className="absolute top-1/3 start-0 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 end-0 w-72 h-72 rounded-full bg-brand-secondary/5 blur-3xl" />

        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-secondary/40" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'هيكلة المؤسسة' : 'Organization Structure'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-3">{t.home.aboutPreviewTitle}</h2>
            <p className="text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">{t.home.aboutPreviewText}</p>
          </motion.div>

          {/* Org chart */}
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            {/* Central organization hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-20"
            >
              <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-3xl px-10 py-8 shadow-card-hover text-center min-w-[300px] md:min-w-[400px]">
                {/* Gold border ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-brand-secondary/30 pointer-events-none" />
                {/* Decorative corner patterns */}
                <div className="absolute top-2 end-2 w-16 h-16 opacity-[0.08] pointer-events-none">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#c9a24b" strokeWidth="0.5">
                    <path d="M32 0 L64 32 L32 64 L0 32 Z" />
                    <path d="M32 8 L56 32 L32 56 L8 32 Z" />
                    <circle cx="32" cy="32" r="6" />
                  </svg>
                </div>
                <div className="absolute bottom-2 start-2 w-16 h-16 opacity-[0.08] pointer-events-none">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#c9a24b" strokeWidth="0.5">
                    <path d="M32 0 L64 32 L32 64 L0 32 Z" />
                    <path d="M32 8 L56 32 L32 56 L8 32 Z" />
                    <circle cx="32" cy="32" r="6" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
                    <Library size={32} className="text-brand-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-1">
                    {lang === 'ar' ? 'دار القرآن الكريم لخديجة بنت خويلد' : 'Dar Al-Quran Al-Kareem for Khadija bint Khuwaylid'}
                  </h3>
                  <p className="text-xs text-white/60">{t.orgTagline}</p>
                  {/* Stats inline */}
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
                    {impactStats.slice(0, 3).map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg font-bold text-brand-secondary">{stat.value.toLocaleString()}+</div>
                        <div className="text-[10px] text-white/50">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vertical connector from hub to horizontal line */}
            <div className="w-px h-10 bg-gradient-to-b from-brand-secondary/40 to-brand-secondary/20" />

            {/* Horizontal connector line + vertical drops */}
            <div className="relative w-full max-w-4xl">
              {/* Horizontal line spanning the 4 cards */}
              <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-brand-secondary/20" />

              {/* Cards grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
                {departments.map((dept, i) => {
                  const Icon = deptIcons[dept.slug] ?? BookOpen;
                  const accent = dept.accentColor.base;
                  return (
                    <motion.div
                      key={dept.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Vertical connector above each card */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-brand-secondary/20" />
                      {/* Connector dot */}
                      <div
                        className="absolute -top-9 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: accent, boxShadow: `0 0 0 3px ${accent}20` }}
                      />

                      <Link to={`/departments/${dept.slug}`} className="block group">
                        <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 h-full relative overflow-hidden">
                          {/* Top gradient bar */}
                          <div
                            className="absolute top-0 inset-x-0 h-1"
                            style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }}
                          />
                          {/* Decorative corner */}
                          <div className="absolute top-2 end-2 w-12 h-12 opacity-[0.04] pointer-events-none">
                            <svg viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="0.5">
                              <path d="M24 0 L48 24 L24 48 L0 24 Z" />
                              <path d="M24 6 L42 24 L24 42 L6 24 Z" />
                              <circle cx="24" cy="24" r="5" />
                            </svg>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                              style={{ backgroundColor: accent + '15' }}
                            >
                              <Icon size={22} style={{ color: accent }} />
                            </div>
                            <div
                              className="h-1.5 w-8 rounded-full"
                              style={{ background: `linear-gradient(90deg, ${accent}, ${dept.accentColor.accent})` }}
                            />
                          </div>
                          <h4 className="text-sm font-bold text-brand-ink leading-snug mb-1.5 line-clamp-2">
                            {localize(dept.name, lang)}
                          </h4>
                          <p className="text-xs text-brand-ink-soft leading-relaxed line-clamp-2 mb-3">
                            {localize(dept.shortDescription, lang)}
                          </p>
                          {/* Program count badge */}
                          <div className="flex items-center gap-1.5 text-xs text-brand-ink-muted">
                            <Sparkles size={12} style={{ color: dept.accentColor.accent }} />
                            <span>{dept.programs.length} {lang === 'ar' ? 'برنامج' : 'programs'}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* About CTA */}
          <div className="flex justify-center mt-12">
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

      {/* Latest Announcements — newest few + See More card */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">{t.common.latestAnnouncements}</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestAnnouncements.map((ann) => (
              <AnnouncementBoardCard key={ann.id} announcement={ann} department={deptMap[ann.departmentSlug]} />
            ))}
          </div>

          {/* See More button */}
          <div className="flex justify-center mt-8">
            <Link
              to="/announcements"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {lang === 'ar' ? 'عرض كل الإعلانات' : 'See All Announcements'}
              <Arrow size={18} className="transition-transform group-hover:translate-x-0.5" />
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
