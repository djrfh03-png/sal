import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageCircle, Facebook } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useDepartments, useSiteSettings } from '../hooks/useApiData';
import { localize } from '../utils/localize';
import { LogoPlaceholder } from '../components/ui/LogoPlaceholder';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import { TelegramIcon, WhatsAppIcon, TikTokIcon } from '../components/ui/SocialIcons';

const socialConfig = [
  { key: 'telegram', label: 'Telegram', icon: TelegramIcon, color: '#229ED9', bg: '#229ED9' },
  { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, color: '#25D366', bg: '#25D366' },
  { key: 'facebook', label: 'Facebook', icon: Facebook, color: '#1877F2', bg: '#1877F2' },
  { key: 'tiktok', label: 'TikTok', icon: TikTokIcon, color: '#000000', bg: '#000000' },
] as const;

export function ContactPage() {
  const { lang, t } = useI18n();
  const { data: departments } = useDepartments();
  const { data: siteSettings } = useSiteSettings();

  if (!siteSettings) return null;

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

          {/* Organization Contact — with all social media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-6 sm:p-8 mb-6 max-w-2xl mx-auto"
            style={{ borderTop: '3px solid #0B6B4A' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <LogoPlaceholder slug="org-main" size="lg" />
              <div>
                <h3 className="text-lg font-bold text-brand-ink">{t.contact.organization}</h3>
                <p className="text-sm text-brand-ink-muted">{t.orgShortName}</p>
              </div>
            </div>

            {/* Social media grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {socialConfig.map((social) => {
                const href = siteSettings.social[social.key];
                const Icon = social.icon;
                return (
                  <a
                    key={social.key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-brand-line bg-brand-bg/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: social.bg }}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-brand-ink">{social.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Email + Location */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-line/60">
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-secondary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Mail size={18} />
                {t.contact.email}
              </a>
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm">
                <MapPin size={18} className="text-brand-secondary" />
                {localize(siteSettings.contactLocation, lang)}
              </div>
            </div>
          </motion.div>

          {/* Department Contacts */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(departments ?? []).map((dept, i) => (
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: dept.accentColor.base + '14' }}>
                    <DepartmentLogo slug={dept.slug} size="md" />
                  </div>
                  <h3 className="font-bold text-brand-ink text-sm leading-snug">{localize(dept.name, lang)}</h3>
                </div>

                {/* Department social links */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Telegram */}
                  <a
                    href={dept.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white font-semibold text-xs hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: '#229ED9' }}
                  >
                    <TelegramIcon size={16} />
                    Telegram
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={siteSettings.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white font-semibold text-xs hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>

                  {/* Facebook */}
                  <a
                    href={siteSettings.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white font-semibold text-xs hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: '#1877F2' }}
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>

                  {/* TikTok */}
                  <a
                    href={siteSettings.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white font-semibold text-xs hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: '#000000' }}
                  >
                    <TikTokIcon size={16} />
                    TikTok
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
