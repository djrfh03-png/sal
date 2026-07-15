import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useI18n } from '../../i18n/I18nContext';

interface StatCounterProps {
  value: number;
  label: string;
  color?: string;
  suffix?: string;
}

export function StatCounter({ value, label, color = '#0B6B4A', suffix = '+' }: StatCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const { dir } = useI18n();

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
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-bold font-display"
        style={{ color }}
        dir={dir}
      >
        {count.toLocaleString()}
        {value > 0 && suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-brand-ink-soft font-medium">{label}</div>
    </div>
  );
}
