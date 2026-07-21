import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Pencil, Check, X, type LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

interface EditableStatCardProps {
  value: number;
  label: string;
  color: string;
  suffix?: string;
  /** Optional icon shown in a soft-tinted medallion above the number. */
  icon?: LucideIcon;
  /** When provided, the card becomes editable (admin context). */
  editable?: boolean;
  onValueChange?: (value: number) => void;
  onLabelChange?: (label: string) => void;
  hint?: string;
  delay?: number;
}

export function EditableStatCard({
  value,
  label,
  color,
  suffix = '+',
  icon: Icon,
  editable = false,
  onValueChange,
  onLabelChange,
  hint,
  delay = 0,
}: EditableStatCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [draftLabel, setDraftLabel] = useState(label);
  const { lang, dir } = useI18n();

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

  useEffect(() => {
    setDraftValue(value);
    setDraftLabel(label);
  }, [value, label]);

  const handleSave = () => {
    onValueChange?.(draftValue);
    onLabelChange?.(draftLabel);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftValue(value);
    setDraftLabel(label);
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={editable ? undefined : { y: -4 }}
      className="group relative card-base p-4 md:p-5 overflow-hidden"
      style={{ borderTop: `3px solid ${color}` }}
    >
      {/* Decorative corner pattern */}
      <div className="absolute top-3 end-3 w-20 h-20 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="0.5">
          <path d="M40 0 L80 40 L40 80 L0 40 Z" />
          <path d="M40 10 L70 40 L40 70 L10 40 Z" />
          <circle cx="40" cy="40" r="8" />
        </svg>
      </div>

      {/* Edit toggle button (admin only) */}
      {editable && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-brand-line/60 text-brand-ink-soft flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-line"
          title={lang === 'ar' ? 'تعديل' : 'Edit'}
        >
          <Pencil size={13} />
        </button>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-brand-ink-muted mb-1">
              {lang === 'ar' ? 'القيمة' : 'Value'}
            </label>
            <input
              type="number"
              value={draftValue}
              onChange={(e) => setDraftValue(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 text-2xl font-bold focus:outline-none focus:border-brand-primary transition-colors"
              style={{ color }}
              dir={dir}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-brand-ink-muted mb-1">
              {lang === 'ar' ? 'الوصف' : 'Label'}
            </label>
            <input
              type="text"
              value={draftLabel}
              onChange={(e) => setDraftLabel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-md"
              style={{ backgroundColor: color }}
            >
              <Check size={13} />
              {lang === 'ar' ? 'حفظ' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-line/60 text-brand-ink-soft hover:bg-brand-line transition-all"
            >
              <X size={13} />
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3.5">
          {/* Icon medallion */}
          <div
            className="relative shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            style={{ backgroundColor: color + '15', color }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-25 blur-md"
              style={{ backgroundColor: color }}
            />
            <Icon size={22} className="relative" strokeWidth={2} />
          </div>

          {/* Number + label, inline */}
          <div className="min-w-0 flex-1 text-start">
            <div
              className="text-2xl md:text-3xl font-bold font-display tabular-nums leading-none"
              style={{ color }}
              dir={dir}
            >
              {count.toLocaleString()}
              {value > 0 && <span className="text-lg md:text-xl ms-0.5">{suffix}</span>}
            </div>
            <div className="mt-1.5 text-xs md:text-sm text-brand-ink-soft font-medium leading-snug line-clamp-2">
              {label}
            </div>
            {hint && (
              <div className="mt-0.5 text-[11px] text-brand-ink-muted leading-snug line-clamp-1">
                {hint}
              </div>
            )}
          </div>

        </div>
      )}
    </motion.div>
  );
}
