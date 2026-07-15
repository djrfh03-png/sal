import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Department } from '../types';
import { LogoPlaceholder } from './ui/LogoPlaceholder';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const accent = department.accentColor.base;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Top gradient bar */}
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${department.accentColor.accent})` }} />

      {/* Decorative pattern corner */}
      <div className="absolute top-2 end-2 w-20 h-20 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 80 80" fill="none" stroke={accent} strokeWidth="0.5">
          <path d="M40 0 L80 40 L40 80 L0 40 Z" />
          <path d="M40 10 L70 40 L40 70 L10 40 Z" />
          <circle cx="40" cy="40" r="8" />
        </svg>
      </div>

      <div className="p-6 relative">
        {/* Logo circle with gold ring */}
        <div className="mb-5">
          <div className="relative inline-block">
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 3px ${department.accentColor.accent}40` }}
            />
            <LogoPlaceholder slug={department.slug} size="lg" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-brand-ink leading-snug mb-1">
          {localize(department.name, lang)}
        </h3>
        <p className="text-xs mb-3 font-semibold" style={{ color: department.accentColor.accent }}>
          {department.establishedDate}
        </p>
        <p className="text-sm text-brand-ink-soft leading-relaxed mb-5 line-clamp-2">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Stats row */}
        <div className="flex gap-4 mb-5 pt-4 border-t border-brand-line">
          {department.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="flex-1">
              <div className="text-xl font-bold font-display" style={{ color: accent }}>
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs text-brand-ink-muted">{localize(stat.label, lang)}</div>
            </div>
          ))}
        </div>

        <Link
          to={`/departments/${department.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
          style={{ color: accent }}
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          <Arrow size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
