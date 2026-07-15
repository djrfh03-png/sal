import { useState } from 'react';
import { Save } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { LogoPlaceholder } from '../components/ui/LogoPlaceholder';
import { localize } from '../utils/localize';

export function AdminSettingsPage() {
  const { t, lang } = useI18n();
  const { dir } = useI18n();
  const { departments, settings, updateSettings, updateDepartment } = useAdminStore();
  const { showToast } = useToast();
  const [localSettings, setLocalSettings] = useState(settings);
  const [deptLinks, setDeptLinks] = useState(Object.fromEntries(departments.map((d) => [d.slug, d.telegramLink])));

  const handleSave = () => {
    updateSettings(localSettings);
    departments.forEach((d) => updateDepartment(d.id, { telegramLink: deptLinks[d.slug] }));
    showToast(t.admin.saved, 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-ink">{t.admin.websiteSettings}</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all">
          <Save size={18} />
          {t.common.save}
        </button>
      </div>

      <div className="space-y-6">
        {/* Logo Management */}
        <div className="card-base p-6">
          <h3 className="font-bold text-brand-ink mb-4">{t.admin.logo}</h3>
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <LogoPlaceholder slug="org-main" size="xl" />
              <p className="text-xs text-brand-ink-muted mt-2">{t.contact.organization}</p>
              <button className="mt-2 px-3 py-1.5 rounded-lg bg-brand-bg-alt text-xs font-medium text-brand-ink-soft hover:bg-brand-line transition-colors">
                {dir === 'rtl' ? 'استبدال' : 'Swap'}
              </button>
            </div>
            {departments.map((d) => (
              <div key={d.slug} className="text-center">
                <LogoPlaceholder slug={d.slug} size="xl" color={d.accentColor.base} />
                <p className="text-xs text-brand-ink-muted mt-2 line-clamp-1 max-w-[80px]">{localize(d.name, lang)}</p>
                <button className="mt-2 px-3 py-1.5 rounded-lg bg-brand-bg-alt text-xs font-medium text-brand-ink-soft hover:bg-brand-line transition-colors">
                  {dir === 'rtl' ? 'استبدال' : 'Swap'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Settings */}
        <div className="card-base p-6">
          <h3 className="font-bold text-brand-ink mb-4">{t.admin.heroTitle}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.heroTitle} ({lang})</label>
              <input
                type="text"
                value={localSettings.heroTitle[lang]}
                onChange={(e) => setLocalSettings({ ...localSettings, heroTitle: { ...localSettings.heroTitle, [lang]: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.heroSubtitle} ({lang})</label>
              <input
                type="text"
                value={localSettings.heroSubtitle[lang]}
                onChange={(e) => setLocalSettings({ ...localSettings, heroSubtitle: { ...localSettings.heroSubtitle, [lang]: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="card-base p-6">
          <h3 className="font-bold text-brand-ink mb-4">{t.contact.title}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.contactEmail}</label>
              <input
                type="email"
                value={localSettings.contactEmail}
                onChange={(e) => setLocalSettings({ ...localSettings, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.contactLocation} ({lang})</label>
              <input
                type="text"
                value={localSettings.contactLocation[lang]}
                onChange={(e) => setLocalSettings({ ...localSettings, contactLocation: { ...localSettings.contactLocation, [lang]: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.telegramLink} ({t.contact.organization})</label>
              <input
                type="text"
                value={localSettings.orgTelegram}
                onChange={(e) => setLocalSettings({ ...localSettings, orgTelegram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Department Telegram Links */}
        <div className="card-base p-6">
          <h3 className="font-bold text-brand-ink mb-4">{t.admin.telegramLink} · {t.admin.departments}</h3>
          <div className="space-y-3">
            {departments.map((d) => (
              <div key={d.slug} className="flex items-center gap-3">
                <LogoPlaceholder slug={d.slug} size="sm" color={d.accentColor.base} />
                <span className="text-sm font-medium text-brand-ink w-32 shrink-0 line-clamp-1">{localize(d.name, lang)}</span>
                <input
                  type="text"
                  value={deptLinks[d.slug]}
                  onChange={(e) => setDeptLinks({ ...deptLinks, [d.slug]: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
