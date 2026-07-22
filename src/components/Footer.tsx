import { Link } from 'react-router-dom';
import { Send, Mail, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { LogoPlaceholder } from './ui/LogoPlaceholder';
import { useDepartments, useSiteSettings } from '../hooks/useApiData';
import { localize } from '../utils/localize';

export function Footer() {
  const { lang, t } = useI18n();
  const { data: departments } = useDepartments();
  const { data: siteSettings } = useSiteSettings();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/departments', label: t.nav.departments },
    { to: '/announcements', label: t.nav.announcements },
    { to: '/posts', label: t.nav.posts },
    { to: '/register', label: t.nav.register },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-ink text-white mt-20">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoPlaceholder slug="org-main" size="lg" />
              <div>
                <div className="font-bold text-sm leading-tight">
                  {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
                </div>
                <div className="text-xs text-white/60">
                  {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{t.orgDescription}</p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-secondary">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-secondary">{t.footer.departments}</h4>
            <div className="flex flex-wrap gap-3">
              {(departments ?? []).map((dept) => (
                <Link
                  key={dept.slug}
                  to={`/departments/${dept.slug}`}
                  className="group flex flex-col items-center gap-2"
                  title={localize(dept.name, lang)}
                >
                  <div className="transition-transform group-hover:-translate-y-1">
                    <LogoPlaceholder slug={dept.slug} size="md" color={dept.accentColor.base} />
                  </div>
                  <span className="text-xs text-white/50 text-center max-w-[80px] leading-tight line-clamp-2">
                    {localize(dept.name, lang)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-secondary">{t.footer.contactUs}</h4>
            <div className="space-y-3">
              <a
                href={siteSettings?.orgTelegram ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Send size={16} className="text-brand-secondary" />
                {t.contact.telegram}
              </a>
              <a
                href={`mailto:${siteSettings?.contactEmail ?? ''}`}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-brand-secondary" />
                {siteSettings?.contactEmail ?? ''}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-brand-secondary" />
                {siteSettings ? localize(siteSettings.contactLocation, lang) : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {t.orgName}. {t.footer.rights}.
          </p>
          <p className="text-xs text-white/40">
            {t.footer.developedBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
