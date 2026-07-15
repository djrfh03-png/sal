import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { siteSettings } from '../data/misc';
import { localize } from '../utils/localize';
import { LogoPlaceholder } from '../components/ui/LogoPlaceholder';

export function ContactPage() {
  const { lang, t } = useI18n();

  return (
    <div className="pt-20">
      <section className="section-pad pattern-bg">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.contact.title}</h1>
            <p className="text-lg text-brand-ink-soft">{t.contact.subtitle}</p>
          </motion.div>

          {/* Organization Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-8 mb-6 max-w-2xl mx-auto"
            style={{ borderTop: '3px solid #0B6B4A' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <LogoPlaceholder slug="org-main" size="lg" />
              <div>
                <h3 className="text-lg font-bold text-brand-ink">{t.contact.organization}</h3>
                <p className="text-sm text-brand-ink-muted">{t.orgShortName}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={siteSettings.orgTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Send size={18} />
                {t.contact.telegram}
              </a>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-secondary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Mail size={18} />
                {t.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-brand-ink-soft">
              <MapPin size={16} className="text-brand-secondary" />
              {localize(siteSettings.contactLocation, lang)}
            </div>
          </motion.div>

          {/* Department Contacts */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base p-6"
                style={{ borderTop: `3px solid ${dept.accentColor.base}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <LogoPlaceholder slug={dept.slug} size="md" color={dept.accentColor.base} />
                  <h3 className="font-bold text-brand-ink text-sm leading-snug">{localize(dept.name, lang)}</h3>
                </div>
                <a
                  href={dept.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: dept.accentColor.base }}
                >
                  <Send size={16} />
                  {t.contact.telegram}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
