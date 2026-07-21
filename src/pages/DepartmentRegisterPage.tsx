import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { Button } from '../components/ui/Button';
import { RegistrationForm } from '../components/RegistrationForm';
import { useAdminStoreOrNull } from '../admin/AdminStore';

export function DepartmentRegisterPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const adminStore = useAdminStoreOrNull();
  const department = adminStore?.departments.find((d) => d.slug === slug) ?? departments.find((d) => d.slug === slug);

  if (!department) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-ink-soft mb-4">{t.common.noResults}</p>
          <Button to="/departments" variant="outline">{t.common.back}</Button>
        </div>
      </div>
    );
  }

  const accent = department.accentColor.base;

  return (
    <div className="pt-16">
      {/* Cover header — themed to this department */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}e0 55%, ${department.accentColor.accent}cc 100%)` }}
      >
        <div className="absolute inset-0 pattern-bg-gold opacity-[0.12]" />
        <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: department.accentColor.accent }} />
        <div className="absolute -bottom-32 -start-16 w-80 h-80 rounded-full bg-black/15 blur-3xl" />

        <div className="absolute top-0 end-0 w-40 h-40 opacity-[0.15] pointer-events-none">
          <svg viewBox="0 0 160 160" fill="none" stroke="#ffffff" strokeWidth="0.6">
            <path d="M80 0 L160 80 L80 160 L0 80 Z" />
            <path d="M80 20 L140 80 L80 140 L20 80 Z" />
            <path d="M80 40 L120 80 L80 120 L40 80 Z" />
            <circle cx="80" cy="80" r="16" />
          </svg>
        </div>

        <div className="container-page relative z-10 py-14 md:py-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs font-medium text-white/75 mb-8 flex-wrap"
          >
            <Link to="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <Home size={13} />
              <span>{t.nav.home}</span>
            </Link>
            <ChevronRight size={13} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <Link to="/departments" className="hover:text-white transition-colors">{t.nav.departments}</Link>
            <ChevronRight size={13} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <Link to={`/departments/${department.slug}`} className="hover:text-white transition-colors truncate max-w-[200px]">
              {localize(department.name, lang)}
            </Link>
            <ChevronRight size={13} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span className="text-white font-semibold">{t.common.registration}</span>
          </motion.nav>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Logo medallion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative shrink-0"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-white/40"
                />
                <div className="absolute inset-2 rounded-full bg-white/15 blur-md" />
                <div className="absolute inset-3 rounded-full bg-white shadow-2xl ring-1 ring-black/5 flex items-center justify-center p-3">
                  <DepartmentLogo slug={department.slug} size="xl" />
                </div>
              </div>
            </motion.div>

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              className="flex-1 text-center md:text-start"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-4">
                <Sparkles size={13} className="text-white" />
                <span className="text-xs font-semibold text-white tracking-wide">{t.common.registration}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-3 drop-shadow-sm">
                {lang === 'ar' ? 'التسجيل في ' : 'Register for '}
                <span className="block md:inline">{localize(department.name, lang)}</span>
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl md:mx-0 mx-auto">
                {localize(department.shortDescription, lang)}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Requirements — this department only */}
      <section className="section-pad pattern-bg">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
          >
            <div
              className="flex items-center gap-3 px-5 py-4 border-b border-brand-line/60"
              style={{ borderTop: `3px solid ${accent}` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '14' }}>
                <CheckCircle2 size={20} style={{ color: accent }} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent }}>
                  {lang === 'ar' ? 'الشروط والأحكام' : 'Requirements'}
                </div>
                <h2 className="font-bold text-brand-ink text-sm leading-tight">
                  {lang === 'ar' ? 'شروط التسجيل في ' : 'Registration Requirements for '}
                  {localize(department.name, lang)}
                </h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-brand-ink-soft leading-relaxed whitespace-pre-line">
                {localize(department.requirements, lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration form — this department only */}
      <section className="section-pad pattern-bg pt-0">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: accent, opacity: 0.4 }} />
              <Send size={18} style={{ color: accent }} />
              <div className="h-px w-10" style={{ backgroundColor: accent, opacity: 0.4 }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2" style={{ color: accent }}>
              {t.registration.title}
            </h2>
            <p className="text-brand-ink-soft">{localize(department.shortDescription, lang)}</p>
          </motion.div>

          <RegistrationForm department={department} />

          <div className="flex justify-center mt-8">
            <Button to={`/departments/${department.slug}`} variant="outline" accentColor={department.accentColor}>
              {t.common.back}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
