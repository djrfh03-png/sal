import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import type { Announcement, Department } from '../types';

interface AnnouncementBoardCardProps {
  announcement: Announcement;
  department?: Department;
}

export function AnnouncementBoardCard({ announcement, department }: AnnouncementBoardCardProps) {
  const { lang } = useI18n();
  const accent = department?.accentColor.base ?? '#0f4d3a';
  const gold = department?.accentColor.accent ?? '#c9a24b';
  const date = new Date(announcement.date);
  const day = date.getDate();
  const month = date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en', { month: 'short' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Top accent strip */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }} />

      {/* Pin icon — notice board aesthetic */}
      <div className="absolute top-4 end-4 z-10">
        <Pin size={14} style={{ color: gold }} className="rotate-12" />
      </div>

      {/* Decorative corner pattern */}
      <div className="absolute bottom-0 start-0 w-16 h-16 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" stroke={accent} strokeWidth="0.5">
          <path d="M32 0 L64 32 L32 64 L0 32 Z" />
          <path d="M32 8 L56 32 L32 56 L8 32 Z" />
          <circle cx="32" cy="32" r="6" />
        </svg>
      </div>

      <Link to={`/announcements/${announcement.id}`} className="block p-5 relative">
        {/* Date badge */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 text-white"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
          >
            <span className="text-lg font-bold leading-none">{day}</span>
            <span className="text-[10px] font-semibold uppercase mt-0.5">{month}</span>
          </div>
          {department && (
            <span
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1"
              style={{ backgroundColor: gold + '20', color: accent }}
            >
              {localize(department.name, lang)}
            </span>
          )}
        </div>

        <h3 className="font-bold text-brand-ink leading-snug mb-2 line-clamp-2">
          {localize(announcement.title, lang)}
        </h3>
        <p className="text-sm text-brand-ink-soft leading-relaxed line-clamp-3 mb-3">
          {localize(announcement.excerpt, lang)}
        </p>

        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: accent }}>
          {lang === 'ar' ? 'اقرأ المزيد' : 'Read more'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
