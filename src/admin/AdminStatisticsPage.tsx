import { useState } from 'react';
import { Save, FileText } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';
import type { LocalizedName } from '../types';

export function AdminStatisticsPage() {
  const { t, lang } = useI18n();
  const { departments, updateDepartmentStat, updateDepartmentRequirements } = useAdminStore();
  const { showToast } = useToast();
  const [values, setValues] = useState<Record<string, number[]>>(
    Object.fromEntries(departments.map((d) => [d.id, d.stats.map((s) => s.value)]))
  );
  const [reqValues, setReqValues] = useState<Record<string, LocalizedName>>(
    Object.fromEntries(departments.map((d) => [d.id, d.requirements]))
  );

  const handleSave = () => {
    departments.forEach((dept) => {
      values[dept.id]?.forEach((val, i) => updateDepartmentStat(dept.id, i, val));
      const rv = reqValues[dept.id];
      if (rv) {
        (Object.keys(rv) as (keyof LocalizedName)[]).forEach((l) =>
          updateDepartmentRequirements(dept.id, l, rv[l])
        );
      }
    });
    showToast(t.admin.saved, 'success');
  };

  const langs: { key: keyof LocalizedName; label: string }[] = [
    { key: 'ar', label: 'العربية' },
    { key: 'en', label: 'English' },
    { key: 'am', label: 'አማርኛ' },
    { key: 'om', label: 'Afaan Oromoo' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-brand-secondary/60" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'إدارة الأقسام' : 'Department Settings'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.statisticsEdit}</h1>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Save size={18} />
          {t.common.save}
        </button>
      </div>

      <div className="space-y-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
            style={{ borderTop: `3px solid ${dept.accentColor.base}` }}
          >
            {/* Department header */}
            <div className="px-5 py-4 bg-brand-bg-alt/40 border-b border-brand-line/60">
              <h3 className="font-bold text-brand-ink">{localize(dept.name, lang)}</h3>
            </div>

            {/* Stats editor */}
            <div className="p-5">
              <div className="text-[10px] font-bold tracking-widest uppercase text-brand-ink-muted mb-3">
                {t.admin.statistics}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {dept.stats.map((stat, i) => (
                  <div key={i}>
                    <label className="block text-sm font-semibold text-brand-ink mb-1.5">
                      {localize(stat.label, lang)}
                    </label>
                    <input
                      type="number"
                      value={values[dept.id]?.[i] ?? 0}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [dept.id]: prev[dept.id]?.map((v, j) => (j === i ? parseInt(e.target.value) || 0 : v)) ?? [],
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Requirements editor */}
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} style={{ color: dept.accentColor.base }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: dept.accentColor.base }}>
                  {lang === 'ar' ? 'شروط التسجيل' : 'Registration Requirements'}
                </span>
              </div>
              <div className="space-y-3">
                {langs.map((l) => (
                  <div key={l.key}>
                    <label className="block text-xs font-semibold text-brand-ink-muted mb-1">
                      {l.label}
                    </label>
                    <textarea
                      value={reqValues[dept.id]?.[l.key] ?? ''}
                      onChange={(e) =>
                        setReqValues((prev) => ({
                          ...prev,
                          [dept.id]: { ...prev[dept.id], [l.key]: e.target.value },
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky save bar — mobile */}
      <div className="sticky bottom-4 flex justify-end lg:hidden mt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-sm shadow-card-hover"
        >
          <Save size={18} />
          {t.common.save}
        </button>
      </div>
    </div>
  );
}
