import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Department } from '../types';
import { LogoPlaceholder } from './ui/LogoPlaceholder';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Plus, Minus } from 'lucide-react';
import { useAdminStore } from '../admin/AdminStore';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const { lang, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const accent = department.accentColor.base;
  const gold = department.accentColor.accent;
  const { addProgram, deleteProgram } = useAdminStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProgram(department.slug, {
      name: {
        ar: 'برنامج جديد',
        en: 'New Program',
        am: 'አዲስ ፕሮግራም',
        om: 'Piroogiraamii haaraa',
      },
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (department.programs.length === 0) return;
    deleteProgram(department.slug, department.programs.length - 1);
  };

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
        className="relative pt-10 pb-8 px-6 overflow-hidden"
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

        {/* Logo — on top, centered */}
        <div className="relative z-10 flex justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 3px ${gold}50` }}
          />
          <LogoPlaceholder slug={department.slug} size="lg" color={accent} />
        </div>

        {/* Established date pill */}
        <div className="relative z-10 flex justify-center mt-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: gold }}
          >
            <span className="w-1 h-1 rounded-full bg-current" />
            {department.establishedDate}
          </span>
        </div>
      </div>

      {/* Content — overlaps the header with a white card */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-6 pt-6 pb-6">
        {/* Gold accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }}
        />

        {/* Name */}
        <h3 className="text-base font-bold text-brand-ink leading-snug mb-2 text-center min-h-[2.6em]">
          {localize(department.name, lang)}
        </h3>

        {/* Description */}
        <p className="text-sm text-brand-ink-soft leading-relaxed mb-5 line-clamp-2 text-center">
          {localize(department.shortDescription, lang)}
        </p>

        {/* Editable quantity — programs count */}
        <div className="flex items-center justify-between gap-2 mb-5 pt-4 border-t border-brand-line">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: accent + '12' }}
            >
              <Sparkles size={16} style={{ color: accent }} />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-bold font-display" style={{ color: accent }}>
                {department.programs.length}
              </div>
              <div className="text-[10px] text-brand-ink-muted">
                {lang === 'ar' ? 'برنامج متاح' : 'programs available'}
              </div>
            </div>
          </div>

          {/* +/- controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRemove}
              aria-label={lang === 'ar' ? 'إزالة برنامج' : 'Remove program'}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-ink-muted hover:text-white transition-colors border border-brand-line hover:border-transparent"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accent;
                e.currentTarget.style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.borderColor = '';
              }}
            >
              <Minus size={14} />
            </button>
            <button
              onClick={handleAdd}
              aria-label={lang === 'ar' ? 'إضافة برنامج' : 'Add program'}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-transform hover:scale-110"
              style={{ backgroundColor: accent }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* See more button */}
        <Link
          to={`/departments/${department.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
          style={{
            backgroundColor: accent + '12',
            color: accent,
          }}
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'See more'}
          <Arrow size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
