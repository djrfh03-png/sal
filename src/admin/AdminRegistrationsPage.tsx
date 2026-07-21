import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { Modal } from '../components/ui/Modal';
import { localize } from '../utils/localize';
import type { DepartmentSlug, Registration, RegistrationStatus } from '../types';
import { Check, Clock, Lock, Unlock } from 'lucide-react';

export function AdminRegistrationsPage() {
  const { t, lang } = useI18n();
  const { registrations, departments, updateRegistrationStatus, setRegistrationStatus } = useAdminStore();
  const [filter, setFilter] = useState<DepartmentSlug | 'all'>('all');
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const deptMap = Object.fromEntries(departments.map((d) => [d.slug, d]));
  const filtered = filter === 'all' ? registrations : registrations.filter((r) => r.departmentSlug === filter);

  const statusColors: Record<Registration['status'], string> = {
    pending: '#925E06',
    reviewed: '#1E3A8A',
    accepted: '#22c55e',
    rejected: '#ef4444',
  };

  const regStatusConfig: Record<RegistrationStatus, { label: string; color: string; icon: typeof Check }> = {
    open: { label: t.admin.open, color: '#22c55e', icon: Unlock },
    closed: { label: t.admin.closed, color: '#ef4444', icon: Lock },
    coming_soon: { label: t.admin.comingSoon, color: '#925E06', icon: Clock },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.registrations}</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
        >
          {t.admin.registrationSettings}
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            filter === 'all' ? 'bg-brand-primary text-white' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
          }`}
        >
          {t.common.all} ({registrations.length})
        </button>
        {departments.map((d) => (
          <button
            key={d.slug}
            onClick={() => setFilter(d.slug)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === d.slug ? 'text-white' : 'bg-white text-brand-ink-soft hover:bg-brand-bg-alt'
            }`}
            style={filter === d.slug ? { backgroundColor: d.accentColor.base } : {}}
          >
            {localize(d.name, lang)} ({registrations.filter((r) => r.departmentSlug === d.slug).length})
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="card-base overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-bg-alt text-brand-ink-muted text-xs uppercase">
                <th className="text-start px-4 py-3 font-semibold">{t.registration.fullName}</th>
                <th className="text-start px-4 py-3 font-semibold">{t.admin.department}</th>
                <th className="text-start px-4 py-3 font-semibold">{t.registration.phone}</th>
                <th className="text-start px-4 py-3 font-semibold">{t.registration.age}</th>
                <th className="text-start px-4 py-3 font-semibold">{t.admin.status}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg, i) => (
                <motion.tr
                  key={reg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  onClick={() => setSelectedReg(reg)}
                  className="border-t border-brand-line cursor-pointer hover:bg-brand-bg-alt/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-brand-ink">{reg.fullName}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: deptMap[reg.departmentSlug]?.accentColor.base }}>
                      {localize(deptMap[reg.departmentSlug]?.name ?? { ar: '', en: '', am: '', om: '' }, lang)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-ink-soft">{reg.phone}</td>
                  <td className="px-4 py-3 text-brand-ink-soft">{reg.age}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: statusColors[reg.status] + '20', color: statusColors[reg.status] }}>
                      {reg.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {filtered.map((reg, i) => (
          <motion.div
            key={reg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            onClick={() => setSelectedReg(reg)}
            className="card-base p-4 cursor-pointer hover:bg-brand-bg-alt/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-brand-ink text-sm">{reg.fullName}</h3>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: statusColors[reg.status] + '20', color: statusColors[reg.status] }}>
                {reg.status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-ink-soft">
              <span className="text-white px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: deptMap[reg.departmentSlug]?.accentColor.base }}>
                {localize(deptMap[reg.departmentSlug]?.name ?? { ar: '', en: '', am: '', om: '' }, lang)}
              </span>
              <span>{reg.phone}</span>
              <span>· {reg.age}y</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Registration Detail Modal */}
      <Modal open={!!selectedReg} onClose={() => setSelectedReg(null)} title={t.admin.applicantDetail} size="md">
        {selectedReg && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailField label={t.registration.fullName} value={selectedReg.fullName} />
              <DetailField label={t.registration.phone} value={selectedReg.phone} />
              <DetailField label={t.registration.age} value={String(selectedReg.age)} />
              <DetailField label={t.registration.email} value={selectedReg.email || '-'} />
              <DetailField label={t.registration.address} value={selectedReg.address || '-'} />
              <DetailField label={t.admin.department} value={localize(deptMap[selectedReg.departmentSlug]?.name ?? { ar: '', en: '', am: '', om: '' }, lang)} />
            </div>
            {selectedReg.notes && (
              <div>
                <label className="block text-xs font-semibold text-brand-ink-muted mb-1">{t.registration.notes}</label>
                <p className="text-sm text-brand-ink-soft bg-brand-bg-alt rounded-lg p-3">{selectedReg.notes}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-2">{t.admin.status}</label>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'reviewed', 'accepted', 'rejected'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateRegistrationStatus(selectedReg.id, s);
                      setSelectedReg({ ...selectedReg, status: s });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedReg.status === s ? 'text-white' : 'bg-brand-bg-alt text-brand-ink-soft'}`}
                    style={selectedReg.status === s ? { backgroundColor: statusColors[s] } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Registration Settings Modal — per-dept status control */}
      <Modal open={showSettings} onClose={() => setShowSettings(false)} title={t.admin.registrationSettings} size="lg">
        <div className="space-y-4">
          {departments.map((dept) => {
            const StatusIcon = regStatusConfig[dept.registrationStatus].icon;
            return (
              <div
                key={dept.id}
                className="card-base p-5"
                style={{ borderTop: `3px solid ${dept.accentColor.base}` }}
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="font-bold text-brand-ink text-sm">{localize(dept.name, lang)}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: regStatusConfig[dept.registrationStatus].color }}>
                    <StatusIcon size={14} />
                    {regStatusConfig[dept.registrationStatus].label}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(['open', 'closed', 'coming_soon'] as RegistrationStatus[]).map((s) => {
                    const cfg = regStatusConfig[s];
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={s}
                        onClick={() => setRegistrationStatus(dept.slug, s)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                          dept.registrationStatus === s ? 'text-white' : 'bg-brand-bg-alt text-brand-ink-soft'
                        }`}
                        style={dept.registrationStatus === s ? { backgroundColor: cfg.color } : {}}
                      >
                        <Icon size={16} />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-ink-muted mb-1">{label}</label>
      <p className="text-sm text-brand-ink font-medium">{value}</p>
    </div>
  );
}
