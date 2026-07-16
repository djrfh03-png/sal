import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Gem, Award, Library, Layers, GraduationCap, Users, Heart } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Timeline } from '../components/Timeline';
import { timelineEvents } from '../data/misc';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import type { DepartmentSlug } from '../types';

export function AboutPage() {
  const { lang, t } = useI18n();

  const coreValues = [
    { icon: Target, label: t.common.mission, color: '#0B6B4A' },
    { icon: Eye, label: t.common.vision, color: '#1E4C9A' },
    { icon: Gem, label: t.common.values, color: '#C9A227' },
    { icon: Award, label: t.common.objectives, color: '#1E5AA8' },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-pad pattern-bg">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.about.title}</h1>
            <p className="text-lg text-brand-ink-soft leading-relaxed">{t.orgDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="section-pad">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-6 text-center">{t.about.historyTitle}</h2>
            <p className="text-brand-ink-soft leading-relaxed text-lg">{t.about.historyText}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values / Objectives Grid */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base p-6 text-center"
                style={{ borderTop: `3px solid ${item.color}` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.color + '15' }}
                >
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-brand-ink mb-2">{item.label}</h3>
                <p className="text-sm text-brand-ink-soft leading-relaxed">
                  {i === 0 && lang === 'ar'
                    ? 'تعليم كتاب الله والعلوم الشرعية لأبناء وبنات المسلمين على منهج متدرج ومتكامل'
                    : i === 0
                      ? 'Teaching the Book of Allah and Islamic sciences to Muslim children through a progressive and integrated curriculum'
                      : i === 1 && lang === 'ar'
                        ? 'جيل قُرآني متشبّع بالقيم والأخلاق، حافظ لكتاب الله، عالم بدينه'
                        : i === 1
                          ? 'A Quranic generation imbued with values and morals, preserving the Book of Allah, knowledgeable of their religion'
                          : i === 2 && lang === 'ar'
                            ? 'الإخلاص، الإتقان، الرحمة، الأخوّة في الله، التدريج في التعليم'
                            : i === 2
                              ? 'Sincerity, Mastery, Mercy, Sisterhood in Allah, Progressive teaching'
                              : i === 3 && lang === 'ar'
                                ? 'تعليم قراءة القرآن بالتجويد، تأسيس طلاب في العلوم الشرعية، إعداد جيل حافظ لكتاب الله'
                                : 'Teach Quran reading with Tajwid, establish students in Islamic sciences, prepare a generation preserving the Book of Allah'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">{t.common.timeline}</h2>
          </motion.div>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Achievements */}
      <section className="section-pad bg-brand-bg-alt/50">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-8 text-center">{t.about.achievementsTitle}</h2>
            <div className="space-y-4">
              {t.about.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 card-base p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-secondary/15 flex items-center justify-center shrink-0">
                    <Award size={18} className="text-brand-secondary" />
                  </div>
                  <p className="text-brand-ink-soft leading-relaxed">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Structure — static org chart with center + 4 departments */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.02]" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/3 blur-3xl" />

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
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-3">
              {lang === 'ar' ? 'مخطط الأقسام' : 'Departments Chart'}
            </h2>
            <p className="text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar' ? 'تتكون المؤسسة من أربعة أقسام رئيسية تعمل تحت مظلة دار القرآن الكريم' : 'The institution consists of four main departments operating under the umbrella of Dar Al-Quran Al-Kareem'}
            </p>
          </motion.div>

          {/* Static Org Chart — center hub with 4 departments around it */}
          <OrgStructureChart />
        </div>
      </section>
    </div>
  );
}

const deptIcons: Record<DepartmentSlug, typeof Library> = {
  'center-hifz': Layers,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

function OrgStructureChart() {
  const { lang } = useI18n();
  const accentSecondary = '#c9a24b';

  // Positions: center hub + 4 departments at top, right, bottom, left
  // Using a fixed-size SVG-like layout with CSS positioning
  const positions = [
    { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },        // top
    { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' },   // right
    { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },   // bottom
    { top: '50%', left: '0%', transform: 'translate(0, -50%)' },         // left
  ];

  // SVG line coordinates from center (250,250) to each department
  const lineEndpoints = [
    { x2: 250, y2: 65 },   // top
    { x2: 435, y2: 250 },  // right
    { x2: 250, y2: 435 },  // bottom
    { x2: 65, y2: 250 },   // left
  ];

  return (
    <div className="relative mx-auto" style={{ maxWidth: '600px', aspectRatio: '1 / 1' }}>
      {/* SVG connecting lines layer */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        fill="none"
      >
        {/* Outer decorative circle */}
        <circle cx="250" cy="250" r="240" stroke={accentSecondary} strokeWidth="1" opacity="0.12" />
        <circle cx="250" cy="250" r="200" stroke={accentSecondary} strokeWidth="0.5" opacity="0.08" strokeDasharray="4 6" />

        {/* Connecting lines from center to each department */}
        {lineEndpoints.map((ep, i) => (
          <g key={i}>
            {/* Solid line */}
            <line
              x1="250" y1="250"
              x2={ep.x2} y2={ep.y2}
              stroke={accentSecondary}
              strokeWidth="1.5"
              opacity="0.3"
            />
            {/* Dot at department end */}
            <circle cx={ep.x2} cy={ep.y2} r="4" fill={accentSecondary} opacity="0.4" />
            {/* Dot at center end */}
            <circle cx="250" cy="250" r="3" fill={accentSecondary} opacity="0.5" />
          </g>
        ))}
      </svg>

      {/* Central organization hub */}
      <div
        className="absolute z-20"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          {/* Outer gold rings */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/20 scale-110" />
          <div className="absolute inset-0 rounded-full border border-brand-secondary/10 scale-125" />

          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-card-hover flex flex-col items-center justify-center text-center p-6">
            <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/30" />

            {/* Decorative SVG pattern */}
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
        const Icon = deptIcons[dept.slug] ?? Library;
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
              {/* Top accent bar */}
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
