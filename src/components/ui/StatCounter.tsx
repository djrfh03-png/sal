import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useI18n } from '../../i18n/I18nContext';
import { TrendingUp, Sparkles } from 'lucide-react';

interface StatCounterProps {
  value: number;
  label: string;
  color?: string;
  suffix?: string;
  /** When provided, shows a small "see more" affordance that calls this handler. */
  onSeeMore?: () => void;
  /** Optional secondary descriptor shown below the value. */
  hint?: string;
  /** When true, renders an editable pencil affordance (admin-only context). */
  editable?: boolean;
  onEdit?: () => void;
}

export function StatCounter({
  value,
  label,
  color = '#0B6B4A',
  suffix = '+',
  onSeeMore,
  hint,
  editable = false,
  onEdit,
}: StatCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const { dir, lang } = useI18n();

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center relative group">
      {/* Decorative ring around the number */}
      <div className="relative inline-flex items-center justify-center mb-3">
        <div
          className="absolute inset-0 -m-3 rounded-full opacity-10 blur-md"
          style={{ backgroundColor: color }}
        />
        <div
          className="relative text-4xl md:text-5xl font-bold font-display tabular-nums"
          style={{ color }}
          dir={dir}
        >
          {count.toLocaleString()}
          {value > 0 && <span className="text-2xl md:text-3xl ms-0.5">{suffix}</span>}
        </div>
      </div>

      {/* Label with subtle accent bar */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="h-px w-4" style={{ backgroundColor: color, opacity: 0.4 }} />
        <Sparkles size={11} style={{ color }} />
        <span className="h-px w-4" style={{ backgroundColor: color, opacity: 0.4 }} />
      </div>
      <div className="text-sm md:text-base text-brand-ink font-semibold leading-snug max-w-[12rem] mx-auto">
        {label}
      </div>

      {hint && (
        <div className="mt-1 text-[11px] text-brand-ink-muted leading-snug max-w-[14rem] mx-auto">
          {hint}
        </div>
      )}

      {/* Footer affordances: see more + edit */}
      {(onSeeMore || editable) && (
        <div className="mt-3 flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
          {onSeeMore && (
            <button
              onClick={onSeeMore}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all hover:gap-1.5"
              style={{ backgroundColor: color + '12', color }}
            >
              <TrendingUp size={11} />
              {lang === 'ar' ? 'عرض المزيد' : 'See more'}
            </button>
          )}
          {editable && onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-line/60 text-brand-ink-soft hover:bg-brand-line transition-all"
              title={lang === 'ar' ? 'تعديل' : 'Edit'}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              {lang === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
