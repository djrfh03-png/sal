import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accentColor?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentColor = '#1E5A8E',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-brand-line/40">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-bg-gold opacity-[0.025]" />

      {/* Soft radial glow */}
      <div
        className="absolute top-0 end-0 w-96 h-96 rounded-full blur-3xl opacity-50"
        style={{ backgroundColor: accentColor + '06' }}
      />

      {/* Top accent line */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(90deg, ${accentColor}, #C9A227)` }}
      />

      {/* Geometric ornament */}
      <div className="absolute top-6 end-6 w-24 h-24 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 96 96" fill="none" stroke={accentColor} strokeWidth="0.5">
          <path d="M48 0 L96 48 L48 96 L0 48 Z" />
          <path d="M48 12 L84 48 L48 84 L12 48 Z" />
          <circle cx="48" cy="48" r="10" />
        </svg>
      </div>
      <div className="absolute bottom-4 start-4 w-16 h-16 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" stroke="#C9A227" strokeWidth="0.5">
          <path d="M32 0 L64 32 L32 64 L0 32 Z" />
          <path d="M32 8 L56 32 L32 56 L8 32 Z" />
        </svg>
      </div>

      <div className="container-page relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <div className="h-px w-10 bg-brand-secondary/50" />
              <span className="text-brand-secondary text-[11px] font-semibold tracking-[0.2em] uppercase">
                {eyebrow}
              </span>
              <div className="h-px w-10 bg-brand-secondary/50" />
            </motion.div>
          )}

          {/* Icon */}
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
              style={{ backgroundColor: accentColor + '12', border: `1px solid ${accentColor}25` }}
            >
              <Icon size={26} style={{ color: accentColor }} />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-brand-ink leading-tight mb-3"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base text-brand-ink-soft leading-relaxed max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Extra content (pills, counts, etc.) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
