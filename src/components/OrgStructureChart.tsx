import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Heart, Library, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': BookOpen,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

export function OrgStructureChart() {
  const { lang } = useI18n();
  const gold = '#925E06';

  return (
    <div className="relative mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative bg-white rounded-[2rem] overflow-hidden shadow-card-hover border border-brand-line"
      >
        {/* Decorative top gradient strip */}
        <div
          className="absolute top-0 inset-x-0 h-1.5 z-30"
          style={{ background: `linear-gradient(90deg, ${gold}, #BF8414, ${gold})` }}
        />

        {/* Background pattern */}
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.04] pointer-events-none" />
        {/* Soft radial glow behind the hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-brand-primary/[0.04] blur-3xl pointer-events-none" />

        {/* ============ Mobile: vertical layout ============ */}
        <div className="lg:hidden relative z-10 p-6 sm:p-8">
          {/* Center hub */}
          <div className="flex flex-col items-center">
            <CenterHub compact />
            <div className="my-6 flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-brand-secondary/30" />
              <div className="w-2 h-2 rotate-45 bg-brand-secondary/50" />
              <div className="w-px h-6 bg-brand-secondary/30" />
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-secondary mb-4">
              {lang === 'ar' ? 'الأقسام' : 'Departments'}
            </span>
          </div>

          {/* Departments 2-col grid */}
          <div className="grid grid-cols-2 gap-3">
            {departments.map((dept, i) => (
              <DeptNode key={dept.slug} dept={dept} index={i} compact />
            ))}
          </div>
        </div>

        {/* ============ Desktop: radial layout ============ */}
        <div className="hidden lg:block relative z-10 p-10 xl:p-14">
          <div className="relative mx-auto" style={{ maxWidth: '780px', aspectRatio: '1 / 1' }}>
            {/* SVG connecting lines */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle cx="250" cy="250" r="245" stroke={gold} strokeWidth="1" opacity="0.10" />
              <circle cx="250" cy="250" r="210" stroke={gold} strokeWidth="0.5" opacity="0.08" strokeDasharray="3 6" />
              <circle cx="250" cy="250" r="160" stroke={gold} strokeWidth="0.5" opacity="0.06" />
              {[
                { x2: 250, y2: 70 },
                { x2: 430, y2: 250 },
                { x2: 250, y2: 430 },
                { x2: 70, y2: 250 },
              ].map((ep, i) => (
                <g key={i}>
                  <line x1="250" y1="250" x2={ep.x2} y2={ep.y2} stroke={gold} strokeWidth="1.5" opacity="0.28" />
                  <circle cx={ep.x2} cy={ep.y2} r="4" fill={gold} opacity="0.45" />
                  <circle cx="250" cy="250" r="3" fill={gold} opacity="0.5" />
                </g>
              ))}
            </svg>

            {/* Center hub */}
            <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CenterHub />
            </div>

            {/* Department nodes */}
            {departments.map((dept, i) => {
              const positions = [
                { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
                { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' },
                { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },
                { top: '50%', left: '0%', transform: 'translate(0, -50%)' },
              ];
              const pos = positions[i];
              return (
                <div
                  key={dept.slug}
                  className="absolute z-10"
                  style={{ top: pos.top, left: pos.left, transform: pos.transform }}
                >
                  <DeptNode dept={dept} index={i} />
                </div>
              );
            })}
          </div>

          {/* Footer hint inside the card */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-brand-ink-muted">
            <Library size={14} className="text-brand-secondary" />
            <span>
              {lang === 'ar'
                ? 'أربعة أقسام متكاملة في خدمة كتاب الله تعالى'
                : 'Four integrated departments serving the Book of Allah'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Center hub ---------- */
function CenterHub({ compact = false }: { compact?: boolean }) {
  const { lang } = useI18n();
  const gold = '#925E06';
  const size = compact ? 'w-28 h-28' : 'w-40 h-40';
  const iconWrap = compact ? 'w-9 h-9' : 'w-12 h-12';
  const iconSize = compact ? 18 : 24;
  const titleSize = compact ? 'text-[10px]' : 'text-sm';
  const subSize = compact ? 'text-[7px]' : 'text-[9px]';

  return (
    <Link to="/about" className="group block">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/15 scale-110 transition-transform group-hover:scale-125" />
        <div className="absolute inset-0 rounded-full border border-brand-secondary/10 scale-125" />
        <div
          className={`relative ${size} rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-card-hover flex flex-col items-center justify-center text-center p-4 transition-transform group-hover:scale-105`}
        >
          <div className="absolute inset-0 rounded-full border-2 border-brand-secondary/30" />
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-[0.08]" fill="none" stroke={gold} strokeWidth="0.3">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="38" />
              <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className={`${iconWrap} mx-auto mb-2 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40`}>
              <Library size={iconSize} className="text-brand-secondary" />
            </div>
            <h3 className={`${titleSize} font-bold text-white leading-snug`}>
              {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
            </h3>
            <p className={`${subSize} text-white/50 mt-0.5`}>
              {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Department node ---------- */
function DeptNode({ dept, index, compact = false }: { dept: typeof departments[number]; index: number; compact?: boolean }) {
  const { lang, dir } = useI18n();
  const Icon = deptIcons[dept.slug] ?? BookOpen;
  const accent = dept.accentColor.base;
  const gold = dept.accentColor.accent;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowUpRight;

  const cardW = compact ? 'w-full' : 'w-44';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/departments/${dept.slug}`}
        className={`group relative block ${cardW} bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden`}
      >
        {/* Top gradient bar */}
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }}
        />
        {/* Decorative corner */}
        <div className="absolute top-2 end-2 w-12 h-12 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 64 64" fill="none" stroke={accent} strokeWidth="0.5">
            <path d="M32 0 L64 32 L32 64 L0 32 Z" />
            <path d="M32 8 L56 32 L32 56 L8 32 Z" />
            <circle cx="32" cy="32" r="6" />
          </svg>
        </div>

        <div className="p-4 pt-5">
          {/* Logo circle */}
          <div className="flex justify-center mb-3">
            <div
              className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${accent}18, ${accent}30)`,
                border: `2px solid ${accent}40`,
                boxShadow: `0 4px 14px ${accent}25`,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: '70%', height: '70%', backgroundColor: accent }}
              >
                <Icon size={20} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Name */}
          <h4 className="text-xs font-bold text-brand-ink leading-snug text-center line-clamp-2 min-h-[2.4em]">
            {localize(dept.name, lang)}
          </h4>

          {/* Quantity pill — programs count */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px]">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: accent + '12', color: accent }}
            >
              <span className="font-bold">{dept.programs.length}</span>
              <span className="text-brand-ink-muted">{lang === 'ar' ? 'برنامج' : 'programs'}</span>
            </span>
          </div>

          {/* See more */}
          <div
            className="mt-3 flex items-center justify-center gap-1 text-[11px] font-semibold transition-all group-hover:gap-2"
            style={{ color: accent }}
          >
            <span>{lang === 'ar' ? 'عرض التفاصيل' : 'See more'}</span>
            <Arrow size={13} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
