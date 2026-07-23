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
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500"
    >
      {/* Cover image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={department.coverImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Floating logo — overlapping the image bottom edge */}
      <div className="relative z-10 flex justify-center -mt-8 mb-3">
        <div className="rounded-2xl bg-white shadow-card flex items-center justify-center ring-1 ring-brand-line p-1.5 w-16 h-16">
          <DepartmentLogo slug={department.slug} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        {/* Established date — subtle accent dot */}
        <div className="flex items-center gap-1.5 mb-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-ink-muted">
            {department.establishedDate}
          </span>
        </div>

        <h3 className="text-center font-bold text-brand-ink text-sm leading-snug mb-2 line-clamp-2">
          {localize(department.name, lang)}
        </h3>

        <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-2 text-center mb-4">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Stats — clean, no heavy color */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-line">
          {department.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="min-w-0 text-center">
              <div className="text-xl font-bold font-display tabular-nums leading-none text-brand-ink">
                {stat.value.toLocaleString()}
                <span className="text-sm align-top text-brand-ink-muted">+</span>
              </div>
              <div className="text-[11px] text-brand-ink-muted leading-tight mt-1 line-clamp-1">
                {localize(stat.label, lang)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA — subtle accent on hover only */}
        <Link
          to={`/departments/${department.slug}`}
          className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:gap-2.5 border border-brand-line text-brand-ink-soft hover:text-white"
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
