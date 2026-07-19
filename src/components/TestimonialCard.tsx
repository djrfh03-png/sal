import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Testimonial, Department } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  deptMap: Record<string, Department>;
}

export function TestimonialCarousel({ testimonials, deptMap }: TestimonialCarouselProps) {
  const { lang, dir } = useI18n();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const Prev = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[index];
  const department = deptMap[testimonial.departmentSlug];
  const accent = department?.accentColor.base ?? '#365004';
  const gold = department?.accentColor.accent ?? '#925E06';
  const initials = testimonial.name.charAt(0);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Main quote card */}
      <div className="relative bg-white rounded-3xl shadow-card p-8 md:p-12 overflow-hidden">
        {/* Decorative quote mark */}
        <div className="absolute top-6 start-6 opacity-10">
          <Quote size={64} style={{ color: gold }} />
        </div>
        {/* Decorative corner pattern */}
        <div className="absolute bottom-0 end-0 w-32 h-32 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 128 128" fill="none" stroke={accent} strokeWidth="0.5">
            <path d="M64 0 L128 64 L64 128 L0 64 Z" />
            <path d="M64 16 L112 64 L64 112 L16 64 Z" />
            <circle cx="64" cy="64" r="12" />
          </svg>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10"
          >
            <p className="text-lg md:text-xl text-brand-ink-soft leading-relaxed italic mb-8 text-center">
              "{localize(testimonial.quote, lang)}"
            </p>
            <div className="flex items-center justify-center gap-4">
              {/* Avatar with initials */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                style={{ background: `linear-gradient(135deg, ${accent}, ${gold})` }}
              >
                {initials}
              </div>
              <div className="text-center">
                <div className="font-bold text-brand-ink">{testimonial.name}</div>
                <div className="text-sm text-brand-ink-muted">{localize(testimonial.role, lang)}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-brand-ink-soft hover:text-brand-primary hover:shadow-card transition-all"
          aria-label="Previous"
        >
          <Prev size={18} />
        </button>
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-line'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-brand-ink-soft hover:text-brand-primary hover:shadow-card transition-all"
          aria-label="Next"
        >
          <Next size={18} />
        </button>
      </div>
    </div>
  );
}

// Keep old export for backward compat
export function TestimonialCard({ testimonial, department }: { testimonial: Testimonial; department?: Department }) {
  const { lang } = useI18n();
  const accent = department?.accentColor.base ?? '#365004';
  const gold = department?.accentColor.accent ?? '#925E06';

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 h-full flex flex-col">
      <Quote size={32} className="mb-4 shrink-0" style={{ color: gold, opacity: 0.3 }} />
      <p className="text-brand-ink-soft leading-relaxed flex-1 italic">
        {localize(testimonial.quote, lang)}
      </p>
      <div className="mt-4 pt-4 border-t border-brand-line flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${gold})` }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-brand-ink text-sm">{testimonial.name}</div>
          <div className="text-xs text-brand-ink-muted">{localize(testimonial.role, lang)}</div>
        </div>
      </div>
    </div>
  );
}
