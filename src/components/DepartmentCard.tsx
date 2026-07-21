import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Department } from '../types';
import { DepartmentLogo } from './ui/DepartmentLogo';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const deptColor = department.accentColor.base;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500"
    >
      {/* Top brand band — org emerald with a subtle gold edge */}
      <div className="relative h-2 bg-brand-primary">
        <div className="absolute inset-y-0 end-0 w-1/3 bg-brand-secondary/70" />
      </div>

      {/* Header — org emerald gradient, dept color as a thin accent ring on the logo */}
      <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark pt-8 pb-6 px-5 overflow-hidden">
        {/* Soft gold glow */}
        <div className="absolute -top-12 -end-8 w-40 h-40 rounded-full bg-brand-secondary/20 blur-3xl pointer-events-none" />
        {/* Faint geometric mark */}
        <div className="absolute bottom-2 start-3 opacity-[0.10] pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#ffffff" strokeWidth="0.8">
            <path d="M20 3 L37 20 L20 37 L3 20 Z" />
            <path d="M20 10 L30 20 L20 30 L10 20 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          {/* Logo with dept-color ring */}
          <div
            className="rounded-full p-1.5 bg-white/95 shadow-md shrink-0"
            style={{ boxShadow: `0 0 0 2px ${deptColor}55, 0 6px 18px rgba(0,0,0,0.18)` }}
          >
            <DepartmentLogo slug={department.slug} size="md" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-brand-secondary">
              {department.establishedDate}
            </p>
            <h3 className="text-white font-bold text-sm leading-snug mt-0.5 line-clamp-2">
              {localize(department.name, lang)}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-2">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Stats — minimal, dept color only on the value */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-brand-line">
          {department.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="min-w-0">
              <div className="text-xl font-bold font-display tabular-nums leading-none" style={{ color: deptColor }}>
                {stat.value.toLocaleString()}
                <span className="text-sm align-top">+</span>
              </div>
              <div className="text-[11px] text-brand-ink-muted leading-tight mt-1 line-clamp-1">
                {localize(stat.label, lang)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA — org emerald */}
        <Link
          to={`/departments/${department.slug}`}
          className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 group-hover:gap-2.5"
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          <Arrow size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
