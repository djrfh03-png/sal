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
  const accent = department.accentColor.base;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-brand-line/50"
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${accent}, ${department.accentColor.accent})` }}
      />

      {/* Content */}
      <div className="p-6">
        {/* Logo + established date */}
        <div className="flex items-center justify-between mb-5">
          <div className="rounded-xl bg-brand-bg-alt flex items-center justify-center ring-1 ring-brand-line/50 p-1.5 w-14 h-14">
            <DepartmentLogo slug={department.slug} size="md" />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
            style={{ backgroundColor: accent + '0d', color: accent }}
          >
            {department.establishedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-brand-ink text-base leading-snug mb-2 line-clamp-2">
          {localize(department.name, lang)}
        </h3>

        {/* Description */}
        <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-2 mb-5 min-h-[2.6em]">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-line/60">
          {department.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="min-w-0 text-center">
              <div className="text-2xl font-bold font-display tabular-nums leading-none text-brand-ink">
                {stat.value.toLocaleString()}
                <span className="text-sm align-top text-brand-ink-muted">+</span>
              </div>
              <div className="text-[11px] text-brand-ink-muted leading-tight mt-1 line-clamp-1">
                {localize(stat.label, lang)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/departments/${department.slug}`}
          className="flex items-center justify-center gap-1.5 w-full mt-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:gap-2.5 border border-brand-line text-brand-ink-soft hover:text-white"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accent;
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.color = '';
          }}
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          <Arrow size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
