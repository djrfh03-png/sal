import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { LogoPlaceholder } from './ui/LogoPlaceholder';
import type { DepartmentSlug } from '../types';

interface FloatingIdentityCardProps {
  slug: DepartmentSlug;
  name: string;
  accent: string;
  gold: string;
  heroRef: React.RefObject<HTMLElement>;
}

export function FloatingIdentityCard({ slug, name, accent, gold, heroRef }: FloatingIdentityCardProps) {
  const { dir, lang } = useI18n();
  const [reducedMotion, setReducucedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reducedMotion) {
      setVisible(v > 0.85);
    }
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducucedMotion(mq.matches);
    const handler = () => setReducucedMotion(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Scroll-driven transforms (skipped when reduced motion)
  const xLtr = useTransform(scrollYProgress, [0.7, 1], [40, 0]);
  const xRtl = useTransform(scrollYProgress, [0.7, 1], [-40, 0]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowUp;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Position: right side in LTR, left side in RTL. On small screens, dock under navbar (top).
  const sideClass =
    'fixed z-40 top-20 sm:top-1/2 sm:-translate-y-1/2 ' +
    (dir === 'rtl' ? 'left-3 sm:left-5' : 'right-3 sm:right-5');

  const inner = (
    <button
      onClick={scrollToTop}
      aria-label={lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}
      className="group flex items-center gap-2.5 rounded-2xl bg-white/85 backdrop-blur-md shadow-card-hover border border-white/60 p-2 pe-4 hover:bg-white transition-colors"
      style={{ boxShadow: `0 8px 30px ${accent}30` }}
    >
      <LogoPlaceholder slug={slug} size="sm" color={accent} />
      <div className="flex flex-col items-start leading-tight max-w-[140px]">
        <span className="text-xs font-bold text-brand-ink line-clamp-1">{name}</span>
        <span
          className="flex items-center gap-1 text-[10px] font-semibold mt-0.5"
          style={{ color: accent }}
        >
          <Arrow size={11} />
          <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
        </span>
      </div>
      <span
        className="ms-1 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: gold }}
      />
    </button>
  );

  if (reducedMotion) {
    return visible ? (
      <div ref={fallbackRef} className={sideClass}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {inner}
        </motion.div>
      </div>
    ) : null;
  }

  return (
    <motion.div
      style={{
        opacity,
        scale,
        x: dir === 'rtl' ? xRtl : xLtr,
      }}
      className={sideClass}
    >
      {inner}
    </motion.div>
  );
}
