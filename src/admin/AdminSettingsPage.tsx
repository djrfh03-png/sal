import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Save, Image, Type, Mail, MapPin, Send, Globe, Settings2,
  Sparkles, MessageCircle, Facebook, Upload,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { LogoPlaceholder } from '../components/ui/LogoPlaceholder';
import type { SiteSettings, SocialLinks } from '../types';

export function AdminSettingsPage() {
  const { t, lang, dir } = useI18n();
  const { settings, updateSettings } = useAdminStore();
  const { showToast } = useToast();
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateSettings(localSettings);
    showToast(t.admin.saved, 'success');
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalSettings((prev) => ({ ...prev, heroImage: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm';
  const labelClass = 'block text-sm font-semibold text-brand-ink mb-1.5';

  const socialFields: { key: keyof SocialLinks; label: string; icon: typeof Send; placeholder: string }[] = [
    { key: 'telegram', label: 'Telegram', icon: Send, placeholder: 'https://t.me/...' },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: 'https://wa.me/...' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/...' },
    { key: 'tiktok', label: 'TikTok', icon: Sparkles, placeholder: 'https://tiktok.com/@...' },
  ];

  return (
    <div>
      {/* Page header — premium eyebrow + sticky save */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6 flex-wrap gap-3"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-brand-secondary/60" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'الإعدادات' : 'Settings'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.websiteSettings}</h1>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Save size={18} />
          {t.common.save}
        </button>
      </motion.div>

      <div className="space-y-5">
        {/* Logo Management — org identity */}
        <SettingsSection icon={Image} title={t.admin.logo} eyebrow={lang === 'ar' ? 'الهوية' : 'Identity'}>
          <div className="flex justify-center">
            <LogoTile slug="org-main" label={t.contact.organization} color="#047857" />
          </div>
        </SettingsSection>

        {/* Hero Image + Settings */}
        <SettingsSection icon={Type} title={t.admin.heroTitle} eyebrow={lang === 'ar' ? 'الواجهة' : 'Homepage'}>
          <div className="space-y-4">
            {/* Hero photo upload */}
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">
                {lang === 'ar' ? 'صورة الواجهة' : 'Hero Image'}
              </label>
              <div className="relative h-32 rounded-xl overflow-hidden border border-brand-line mb-2">
                {localSettings.heroImage ? (
                  <>
                    <img src={localSettings.heroImage} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setLocalSettings((prev) => ({ ...prev, heroImage: '' }))}
                      className="absolute top-2 end-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-bg-alt text-brand-ink-muted text-xs">
                    {lang === 'ar' ? 'لا توجد صورة' : 'No image'}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => heroInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-brand-line hover:border-brand-primary transition-colors text-sm font-medium text-brand-ink-soft"
                >
                  <Upload size={15} />
                  {lang === 'ar' ? 'رفع صورة' : 'Upload'}
                </button>
                <input ref={heroInputRef} type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" />
                <input
                  type="text"
                  value={localSettings.heroImage.startsWith('data:') ? '' : localSettings.heroImage}
                  onChange={(e) => setLocalSettings((prev) => ({ ...prev, heroImage: e.target.value }))}
                  placeholder={lang === 'ar' ? 'أو رابط صورة' : 'Or image URL'}
                  className="flex-1 px-3 py-2 rounded-lg border border-brand-line bg-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
              </div>
            </div>

            <Field label={`${t.admin.heroTitle} (${lang})`}>
              <input
                type="text"
                value={localSettings.heroTitle[lang]}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    heroTitle: { ...localSettings.heroTitle, [lang]: e.target.value },
                  })
                }
                className={inputClass}
              />
            </Field>
            <Field label={`${t.admin.heroSubtitle} (${lang})`}>
              <input
                type="text"
                value={localSettings.heroSubtitle[lang]}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    heroSubtitle: { ...localSettings.heroSubtitle, [lang]: e.target.value },
                  })
                }
                className={inputClass}
              />
            </Field>
          </div>
        </SettingsSection>

        {/* Contact Info */}
        <SettingsSection icon={Mail} title={t.contact.title} eyebrow={lang === 'ar' ? 'التواصل' : 'Contact'}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t.admin.contactEmail} icon={Mail}>
              <input
                type="email"
                value={localSettings.contactEmail}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, contactEmail: e.target.value })
                }
                className={inputClass}
              />
            </Field>
            <Field label={`${t.admin.contactLocation} (${lang})`} icon={MapPin}>
              <input
                type="text"
                value={localSettings.contactLocation[lang]}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    contactLocation: { ...localSettings.contactLocation, [lang]: e.target.value },
                  })
                }
                className={inputClass}
              />
            </Field>
            <Field label={`${t.admin.telegramLink} · ${t.contact.organization}`} icon={Send}>
              <input
                type="text"
                value={localSettings.orgTelegram}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, orgTelegram: e.target.value })
                }
                className={inputClass}
              />
            </Field>
            <Field label={t.admin.developedBy ?? 'Developed by'} icon={Settings2}>
              <input
                type="text"
                value={localSettings.developedBy}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, developedBy: e.target.value })
                }
                className={inputClass}
              />
            </Field>
          </div>
        </SettingsSection>

        {/* Social Links */}
        <SettingsSection icon={Globe} title={lang === 'ar' ? 'روابط التواصل' : 'Social Links'} eyebrow={lang === 'ar' ? 'السوشيال' : 'Social'}>
          <div className="grid sm:grid-cols-2 gap-4">
            {socialFields.map((sf) => (
              <Field key={sf.key} label={sf.label} icon={sf.icon}>
                <input
                  type="text"
                  value={localSettings.social[sf.key]}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      social: { ...localSettings.social, [sf.key]: e.target.value },
                    })
                  }
                  placeholder={sf.placeholder}
                  className={inputClass}
                />
              </Field>
            ))}
          </div>
        </SettingsSection>

        {/* Sticky save bar — mobile */}
        <div className="sticky bottom-4 flex justify-end lg:hidden">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-sm shadow-card-hover"
          >
            <Save size={18} />
            {t.common.save}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper components ---------- */

function SettingsSection({
  icon: Icon,
  title,
  eyebrow,
  children,
}: {
  icon: typeof Save;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      {/* Section header — emerald tint with gold icon */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-brand-bg-alt/80 to-transparent border-b border-brand-line/60">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-brand-primary" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-brand-secondary">{eyebrow}</div>
          <h3 className="font-bold text-brand-ink text-sm leading-tight">{title}</h3>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-ink mb-1.5">
        {Icon && <Icon size={13} className="inline-block me-1 -mt-0.5 text-brand-ink-muted" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function LogoTile({ slug, label, color }: { slug: string; label: string; color: string }) {
  const { dir } = useI18n();
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative">
        <LogoPlaceholder slug={slug as never} size="xl" color={color} />
        <div className="absolute inset-0 rounded-full bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors" />
      </div>
      <p className="text-xs text-brand-ink-muted mt-2 line-clamp-1 max-w-[90px]">{label}</p>
      <button className="mt-2 px-3 py-1.5 rounded-lg bg-brand-bg-alt text-xs font-medium text-brand-ink-soft hover:bg-brand-primary hover:text-white transition-all">
        {dir === 'rtl' ? 'استبدال' : 'Swap'}
      </button>
    </div>
  );
}
