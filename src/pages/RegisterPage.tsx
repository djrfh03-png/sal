import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { departments } from '../data/departments';
import { localize } from '../utils/localize';
import { Button } from '../components/ui/Button';
import { RegistrationStatusBanner } from '../components/RegistrationStatusBanner';
import { useToast } from '../components/ui/Toast';
import { Bell } from 'lucide-react';
import type { DepartmentSlug, RegistrationField } from '../types';

export function RegisterPage() {
  const { lang, t } = useI18n();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const initialDept = (searchParams.get('dept') as DepartmentSlug) ?? departments[0].slug;
  const [selectedDept, setSelectedDept] = useState<DepartmentSlug>(initialDept);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [, setSubmitted] = useState(false);

  const department = departments.find((d) => d.slug === selectedDept)!;
  const fields = department.registrationFields ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(t.registration.submitSuccess, 'success');
    setSubmitted(true);
    setFormValues({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-20">
      <section className="section-pad pattern-bg">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mb-4">{t.registration.title}</h1>
          </motion.div>

          {/* Department Selector */}
          <div className="card-base p-6 mb-6">
            <label className="block text-sm font-semibold text-brand-ink mb-3">{t.registration.selectDepartment}</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {departments.map((dept) => (
                <button
                  key={dept.slug}
                  onClick={() => {
                    setSelectedDept(dept.slug);
                    setFormValues({});
                  }}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedDept === dept.slug
                      ? 'border-2'
                      : 'border-brand-line bg-white hover:bg-brand-bg-alt'
                  }`}
                  style={selectedDept === dept.slug ? { borderColor: dept.accentColor.base, backgroundColor: dept.accentColor.base + '10' } : {}}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: dept.accentColor.base }}
                  />
                  <span className="text-xs font-semibold text-brand-ink leading-tight block line-clamp-2">
                    {localize(dept.name, lang)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Registration Status Banner */}
          <div className="mb-6">
            <RegistrationStatusBanner
              status={department.registrationStatus}
              accentColor={department.accentColor}
            />
          </div>

          {/* Dynamic Form or Closed/Coming Soon Message */}
          {department.registrationStatus === 'open' ? (
            <motion.form
              key={selectedDept}
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
              <Button variant="outline" accentColor={department.accentColor} onClick={() => showToast(lang === 'ar' ? 'سيتم إشعارك عند فتح التسجيل' : 'You will be notified when registration opens', 'info')}>
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
        </div>
      </section>
    </div>
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
