import { useState } from 'react';
import { Save } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';
import type { RegistrationStatus } from '../types';

export function AdminStatisticsPage() {
  const { t, lang } = useI18n();
  const { departments, updateDepartmentStat } = useAdminStore();
  const { showToast } = useToast();
  const [values, setValues] = useState<Record<string, number[]>>(
    Object.fromEntries(departments.map((d) => [d.id, d.stats.map((s) => s.value)]))
  );

  const handleSave = () => {
    departments.forEach((dept) => {
      values[dept.id]?.forEach((val, i) => updateDepartmentStat(dept.id, i, val));
    });
    showToast(t.admin.saved, 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-ink">{t.admin.statisticsEdit}</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all">
          <Save size={18} />
          {t.common.save}
        </button>
      </div>

      <div className="space-y-6">
        {departments.map((dept) => (
          <div key={dept.id} className="card-base p-6" style={{ borderTop: `3px solid ${dept.accentColor.base}` }}>
            <h3 className="font-bold text-brand-ink mb-4">{localize(dept.name, lang)}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dept.stats.map((stat, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold text-brand-ink mb-1.5">{localize(stat.label, lang)}</label>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminRegistrationSettingsPage() {
  const { t, lang } = useI18n();
  const { departments, setRegistrationStatus } = useAdminStore();
  const { showToast } = useToast();

  const statuses: RegistrationStatus[] = ['open', 'closed', 'coming_soon'];
  const statusColors: Record<RegistrationStatus, string> = {
    open: '#22c55e',
    closed: '#ef4444',
    coming_soon: '#C9A227',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink mb-6">{t.admin.registrationSettings}</h1>
      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.id} className="card-base p-5" style={{ borderTop: `3px solid ${dept.accentColor.base}` }}>
            <h3 className="font-bold text-brand-ink mb-3">{localize(dept.name, lang)}</h3>
            <div className="flex gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setRegistrationStatus(dept.slug, s);
                    showToast(t.admin.saved, 'success');
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${dept.registrationStatus === s ? 'text-white' : 'bg-brand-bg-alt text-brand-ink-soft'}`}
                  style={dept.registrationStatus === s ? { backgroundColor: statusColors[s] } : {}}
                >
                  {s === 'open' ? t.admin.open : s === 'closed' ? t.admin.closed : t.admin.comingSoon}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
