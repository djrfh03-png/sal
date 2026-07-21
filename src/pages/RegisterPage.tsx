import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';

const statusDot: Record<string, string> = {
  open: '#22c55e',
  closed: '#ef4444',
  coming_soon: '#f59e0b',
};

export function RegisterPage() {
  const { lang, t, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg-alt/60 to-transparent">
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.05]" />
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full bg-brand-secondary/8 blur-3xl" />
        <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full bg-brand-primary/6 blur-3xl" />

        <div className="container-page relative z-10 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-brand-secondary/60" />
              <span className="text-brand-secondary text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'سجّل الآن' : 'Apply Now'}
              </span>
              <div className="h-px w-12 bg-brand-secondary/60" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.registration.title}</h1>
            <p className="text-base md:text-lg text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'اختر القسم الذي ترغب بالتسجيل فيه. لكل قسم صفحة تسجيل خاصة به.'
                : 'Choose the department you want to register for. Each department has its own registration page.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Department chooser — each card links to that department's own registration page */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 gap-6">
            {departments.map((dept, i) => {
              const accent = dept.accentColor.base;
              const gold = dept.accentColor.accent;
              const statusLabel =
                dept.registrationStatus === 'open'
                  ? t.registration.statusOpen
                  : dept.registrationStatus === 'closed'
                    ? t.registration.statusClosed
                    : t.registration.statusComingSoon;
              return (
                <motion.div
                  key={dept.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <Link
                    to={`/departments/${dept.slug}/register`}
                    className="group relative block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 h-full"
                  >
                    {/* Top gradient banner */}
                    <div className="relative h-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
                      <div className="absolute top-0 end-0 w-24 h-24 opacity-[0.1] pointer-events-none">
                        <svg viewBox="0 0 128 128" fill="none" stroke={gold} strokeWidth="0.5">
                          <path d="M64 0 L128 64 L64 128 L0 64 Z" />
                          <path d="M64 16 L112 64 L64 112 L16 64 Z" />
                          <circle cx="64" cy="64" r="12" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-7 start-6 z-10">
                        <div className="rounded-2xl bg-white shadow-card flex items-center justify-center ring-1 ring-brand-line p-1.5" style={{ width: '4.25rem', height: '4.25rem' }}>
                          <DepartmentLogo slug={dept.slug} size="md" />
                        </div>
                      </div>
                      {/* Status pill */}
                      <div className="absolute top-3 end-3 z-10">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusDot[dept.registrationStatus] }} />
                          {statusLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pt-10 pb-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Send size={13} style={{ color: accent }} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                          {t.common.registration}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-brand-ink leading-snug mb-1.5 line-clamp-2 min-h-[2.6em]">
                        {localize(dept.name, lang)}
                      </h3>
                      <p className="text-xs text-brand-ink-muted leading-relaxed line-clamp-2 mb-4 min-h-[2.6em]">
                        {localize(dept.shortDescription, lang)}
                      </p>

                      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-300 group-hover:gap-3" style={{ backgroundColor: accent + '0d' }}>
                        <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
                          {t.registration.applyNow}
                        </span>
                        <div className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{ backgroundColor: accent, color: '#fff' }}>
                          <Arrow size={14} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-2 text-brand-ink-muted"
          >
            <Sparkles size={14} className="text-brand-secondary" />
            <span className="text-xs">{lang === 'ar' ? 'لكل قسم نموذج تسجيل مخصص' : 'Each department has its own registration form'}</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
