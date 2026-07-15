import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const { lang, dir } = useI18n();
  const isRtl = dir === 'rtl';

  return (
    <div className="relative max-w-3xl mx-auto">
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-brand-line"
        style={{ [isRtl ? 'right' : 'left']: '23px' }}
      />
      <div className="space-y-8">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            className="relative flex items-start gap-6"
          >
            <div className="relative z-10 shrink-0">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs shadow-card">
                {i + 1}
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="text-sm font-bold text-brand-secondary mb-1">{event.year}</div>
              <h3 className="text-lg font-bold text-brand-ink mb-1">{localize(event.title, lang)}</h3>
              <p className="text-sm text-brand-ink-soft leading-relaxed">
                {localize(event.description, lang)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
