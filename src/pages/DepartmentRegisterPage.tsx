import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useDepartment } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { Button } from '../components/ui/Button';
import { RegistrationForm } from '../components/RegistrationForm';
import { useAdminStoreOrNull } from '../admin/AdminStore';
import { Loader2 } from 'lucide-react';

export function DepartmentRegisterPage() {
  const { slug } = useParams();
  const { lang, dir, t } = useI18n();
  const adminStore = useAdminStoreOrNull();
  const { data: fetchedDept, loading } = useDepartment(slug);
  const department = adminStore?.departments.find((d) => d.slug === slug) ?? fetchedDept;

  if (loading || !department) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  const accent = department.accentColor.base;

  return (
    <div className="pt-16">
      {/* Compact breadcrumb bar */}
      <div className="bg-brand-bg-alt/40 border-b border-brand-line/50">
        <div className="container-page py-3">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-ink-muted flex-wrap"
          >
            <Link to="/" className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors">
              <Home size={12} />
              <span>{t.nav.home}</span>
            </Link>
            <ChevronRight size={12} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <Link to="/departments" className="hover:text-brand-primary transition-colors">{t.nav.departments}</Link>
            <ChevronRight size={12} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span className="text-brand-ink font-semibold truncate">{t.common.registration}</span>
          </motion.nav>
        </div>
      </div>

      {/* Minimal hero — small, premium, professional */}
      <section className="section-pad-sm">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ backgroundColor: accent + '12' }}
            >
              <DepartmentLogo slug={department.slug} size="md" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-brand-ink leading-tight">
                {localize(department.name, lang)}
              </h1>
              <p className="text-sm text-brand-ink-muted mt-0.5 line-clamp-1">
                {localize(department.shortDescription, lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="pb-8">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
          >
            <div
              className="flex items-center gap-3 px-5 py-3.5 border-b border-brand-line/60"
              style={{ borderTop: `3px solid ${accent}` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '14' }}>
                <CheckCircle2 size={18} style={{ color: accent }} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent }}>
                  {lang === 'ar' ? 'الشروط والأحكام' : 'Requirements'}
                </div>
                <h2 className="font-bold text-brand-ink text-sm leading-tight">
                  {lang === 'ar' ? 'شروط التسجيل' : 'Registration Requirements'}
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

      {/* Registration form */}
      <section className="pb-16">
        <div className="container-page max-w-3xl">
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
