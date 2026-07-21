import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Book, BookOpen, Scroll, Scale, Gem, PenTool, Sparkles, Brain, MapPin,
  Type, Music, Mic, Languages, MessageSquare, Utensils, Moon, Gift,
  Shirt, Backpack, Megaphone, Home, ChevronDown, type LucideIcon,
} from 'lucide-react';
import type { DepartmentProgram } from '../types';
import { localize } from '../utils/localize';
import { useI18n } from '../i18n/I18nContext';

const iconMap: Record<string, LucideIcon> = {
  book: Book,
  bookOpen: BookOpen,
  scroll: Scroll,
  scale: Scale,
  gem: Gem,
  penTool: PenTool,
  sparkles: Sparkles,
  brain: Brain,
  mapPin: MapPin,
  alphabet: Type,
  music: Music,
  mic: Mic,
  languages: Languages,
  messageSquare: MessageSquare,
  utensils: Utensils,
  moon: Moon,
  gift: Gift,
  shirt: Shirt,
  backpack: Backpack,
  megaphone: Megaphone,
  home: Home,
};

interface ProgramCardProps {
  program: DepartmentProgram;
  index: number;
  accent: string;
  gold: string;
  variant?: 'full' | 'compact';
}

const COLLAPSE_THRESHOLD = 90;

export function ProgramCard({ program, index, accent, gold, variant = 'full' }: ProgramCardProps) {
  const { lang } = useI18n();
  const Icon = iconMap[program.icon ?? 'book'] ?? Book;
  const [expanded, setExpanded] = useState(false);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        whileHover={{ y: -3 }}
        className="group relative bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
        style={{ borderInlineStart: `3px solid ${accent}` }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
            style={{ backgroundColor: accent + '15', color: accent }}
          >
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-brand-ink text-sm leading-snug mb-1">
              {localize(program.name, lang)}
            </h4>
            {program.description && (
              <p className="text-xs text-brand-ink-soft leading-relaxed line-clamp-2">
                {localize(program.description, lang)}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const description = program.description ? localize(program.description, lang) : '';
  const isLong = description.length > COLLAPSE_THRESHOLD;
  const visibleDesc = !expanded && isLong
    ? description.slice(0, COLLAPSE_THRESHOLD).trim() + '…'
    : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      {/* Top gradient bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }} />

      {/* Decorative pattern */}
      <div className="absolute top-3 end-3 w-20 h-20 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 80 80" fill="none" stroke={accent} strokeWidth="0.5">
          <path d="M40 0 L80 40 L40 80 L0 40 Z" />
          <path d="M40 10 L70 40 L40 70 L10 40 Z" />
          <circle cx="40" cy="40" r="8" />
        </svg>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-3"
            style={{ backgroundColor: accent + '15', color: accent }}
          >
            <Icon size={26} strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mb-1.5"
              style={{ backgroundColor: gold + '25', color: accent }}
            >
              {index + 1}
            </span>
            <h3 className="font-bold text-brand-ink text-base leading-snug">
              {localize(program.name, lang)}
            </h3>
          </div>
        </div>
        {program.description && (
          <div className="flex-1">
            <p className="text-sm text-brand-ink-soft leading-relaxed">
              {visibleDesc}
            </p>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-brand-ink-soft leading-relaxed overflow-hidden"
                >
                  {description.slice(COLLAPSE_THRESHOLD).trim()}
                </motion.p>
              )}
            </AnimatePresence>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1 mt-2 text-xs font-semibold transition-colors hover:gap-1.5"
                style={{ color: accent }}
              >
                {expanded
                  ? (lang === 'ar' ? 'عرض أقل' : 'See less')
                  : (lang === 'ar' ? 'عرض المزيد' : 'See more')}
                <ChevronDown
                  size={14}
                  className="transition-transform"
                  style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                />
              </button>
            )}
          </div>
        )}
        {/* Accent underline that grows on hover */}
        <div className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full" style={{ backgroundColor: accent }} />
      </div>
    </motion.div>
  );
}
