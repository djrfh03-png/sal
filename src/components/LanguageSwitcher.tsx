import { Globe, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { LANGUAGES } from '../i18n/languages';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-lg hover:bg-brand-bg-alt transition-colors text-sm font-semibold text-brand-ink min-h-[40px]"
        aria-label="Change language"
      >
        <Globe size={18} className="text-brand-primary shrink-0" />
        <span className="uppercase">{current?.code}</span>
        <ChevronDown size={14} className={`transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 end-0 w-48 bg-white rounded-xl shadow-card-hover border border-brand-line overflow-hidden z-50"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors min-h-[44px] ${
                  l.code === lang ? 'bg-brand-bg-alt font-bold text-brand-primary' : 'hover:bg-brand-bg-alt text-brand-ink'
                }`}
              >
                <span>{l.nativeLabel}</span>
                {l.code === lang && <Check size={16} className="text-brand-primary shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
