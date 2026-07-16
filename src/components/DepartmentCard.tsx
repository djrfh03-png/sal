import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Department } from '../types';
import { LogoPlaceholder } from './ui/LogoPlaceholder';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const accent = department.accentColor.base;
  const gold = department.accentColor.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      {/* Top gradient header with logo */}
      <div
        className="relative pt-8 pb-16 px-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
      >
        {/* Decorative pattern */}
        <div className="absolute top-0 end-0 w-32 h-32 opacity-[0.08] pointer-events-none">
          <svg viewBox="0 0 128 128" fill="none" stroke={gold} strokeWidth="0.5">
            <path d="M64 0 L128 64 L64 128 L0 64 Z" />
            <path d="M64 16 L112 64 L64 112 L16 64 Z" />
            <path d="M64 32 L96 64 L64 96 L32 64 Z" />
            <circle cx="64" cy="64" r="12" />
          </svg>
        </div>
        <div className="absolute bottom-0 start-0 w-24 h-24 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 96 96" fill="none" stroke="#ffffff" strokeWidth="0.5">
            <path d="M48 0 L96 48 L48 96 L0 48 Z" />
            <path d="M48 12 L84 48 L48 84 L12 48 Z" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 3px ${gold}50` }}
          />
          <LogoPlaceholder slug={department.slug} size="lg" />
        </div>
      </div>

      {/* Content — overlaps the header with a white card */}
      <div className="relative -mt-10 bg-white rounded-t-3xl px-6 pt-5 pb-6">
        {/* Gold accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }}
        />

        <h3 className="text-base font-bold text-brand-ink leading-snug mb-1.5 text-center">
          {localize(department.name, lang)}
        </h3>
        <p className="text-xs mb-3 font-semibold text-center" style={{ color: gold }}>
          {department.establishedDate}
        </p>
        <p className="text-sm text-brand-ink-soft leading-relaxed mb-5 line-clamp-2 text-center">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Stats row */}
        <div className="flex gap-3 mb-5 pt-4 border-t border-brand-line">
          {department.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-xl font-bold font-display" style={{ color: accent }}>
                {stat.value.toLocaleString()}
              </div>
              <div className="text-[10px] text-brand-ink-muted leading-tight">{localize(stat.label, lang)}</div>
            </div>
          ))}
        </div>

        {/* Explore button */}
        <Link
          to={`/departments/${department.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
          style={{
            backgroundColor: accent + '12',
            color: accent,
          }}
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          <Arrow size={16} />
        </Link>

        {/* Program count badge */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-brand-ink-muted">
          <Sparkles size={12} style={{ color: gold }} />
          <span>{department.programs.length} {lang === 'ar' ? 'برنامج' : 'programs'}</span>
        </div>
      </div>
    </motion.div>
  );
}
