import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { localize } from '../utils/localize';
import { Button } from './ui/Button';
import { RegistrationStatusBanner } from './RegistrationStatusBanner';
import { useToast } from './ui/Toast';
import type { Department, RegistrationField } from '../types';

export function RegistrationForm({ department }: { department: Department }) {
  const { lang, t } = useI18n();
  const { showToast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const fields = department.registrationFields ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(t.registration.submitSuccess, 'success');
    setFormValues({});
  };

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="mb-6">
        <RegistrationStatusBanner status={department.registrationStatus} accentColor={department.accentColor} />
      </div>

      {department.registrationStatus === 'open' ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="card-base p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <DynamicField
                key={field.name}
                field={field}
                value={formValues[field.name] ?? ''}
                onChange={(val) => handleChange(field.name, val)}
              />
            ))}
          </div>
          <Button type="submit" variant="primary" accentColor={department.accentColor} size="lg" className="w-full">
            {t.registration.submit}
          </Button>
        </motion.form>
      ) : department.registrationStatus === 'closed' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-base p-8 text-center"
        >
          <p className="text-brand-ink-soft mb-6">{t.registration.closedMessage}</p>
          <Button
            variant="outline"
            accentColor={department.accentColor}
            onClick={() => showToast(lang === 'ar' ? 'سيتم إشعارك عند فتح التسجيل' : 'You will be notified when registration opens', 'info')}
          >
            <Bell size={18} />
            {t.registration.notifyMe}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-base p-8 text-center"
        >
          <p className="text-brand-ink-soft">{t.registration.comingSoonMessage}</p>
        </motion.div>
      )}
    </>
  );
}

function DynamicField({ field, value, onChange }: { field: RegistrationField; value: string; onChange: (val: string) => void }) {
  const { lang } = useI18n();
  const label = localize(field.label, lang);
  const placeholder = field.placeholder ? localize(field.placeholder, lang) : '';

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm';

  return (
    <div className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-brand-ink mb-1.5">
        {label} {field.required && <span className="text-red-500">*</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : field.type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={inputClass}
        >
          <option value="">{lang === 'ar' ? 'اختر...' : 'Select...'}</option>
          {field.options?.map((opt, i) => (
            <option key={i} value={localize(opt, lang)}>{localize(opt, lang)}</option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          required={field.required}
          min={field.type === 'number' ? '1' : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
