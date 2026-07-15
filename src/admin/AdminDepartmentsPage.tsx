import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Building2, BarChart3 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';

export function AdminDepartmentsPage() {
  const { t, lang } = useI18n();
  const { departments, updateDepartment } = useAdminStore();
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = departments.find((d) => d.id === editingId);

  const handleSave = () => {
    showToast(t.admin.saved, 'success');
    setEditingId(null);
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.editDepartment}</h1>
          <button
            onClick={() => setEditingId(null)}
            className="text-sm text-brand-ink-muted hover:text-brand-ink transition-colors"
          >
            {t.common.cancel}
          </button>
        </div>

        <div className="card-base p-6 space-y-8">
          {/* Programs List Editor */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={18} className="text-brand-primary" />
              <label className="text-sm font-semibold text-brand-ink">{t.admin.programs}</label>
            </div>
            <div className="space-y-2">
              {editing.programs.map((program, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: editing.accentColor.base + '15', color: editing.accentColor.base }}
                  >
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={localize(program.name, lang)}
                    onChange={(e) =>
                      updateDepartment(editing.id, {
                        programs: editing.programs.map((p, j) =>
                          j === i ? { ...p, name: { ...p.name, [lang]: e.target.value } } : p
                        ),
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <button
                    onClick={() =>
                      updateDepartment(editing.id, {
                        programs: editing.programs.filter((_, j) => j !== i),
                      })
                    }
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                updateDepartment(editing.id, {
                  programs: [...editing.programs, { name: { ar: 'برنامج جديد', en: 'New Program', am: '', om: '' } }],
                })
              }
              className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline mt-3"
            >
              <Plus size={14} />
              {t.admin.addProgram}
            </button>
          </div>

          {/* Stats Editor — supports values like +250, +1500 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={18} className="text-brand-primary" />
              <label className="text-sm font-semibold text-brand-ink">{t.admin.stats}</label>
            </div>
            <div className="space-y-2">
              {editing.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={localize(stat.label, lang)}
                    onChange={(e) =>
                      updateDepartment(editing.id, {
                        stats: editing.stats.map((s, j) =>
                          j === i ? { ...s, label: { ...s.label, [lang]: e.target.value } } : s
                        ),
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      // Allow values like "+250", "1500", "+40" — store as string-compatible number
                      const raw = e.target.value;
                      const numMatch = raw.match(/^[+]?\d+$/);
                      if (numMatch) {
                        updateDepartment(editing.id, {
                          stats: editing.stats.map((s, j) =>
                            j === i ? { ...s, value: raw as unknown as number } : s
                          ),
                        });
                      } else if (raw === '' || raw === '+') {
                        updateDepartment(editing.id, {
                          stats: editing.stats.map((s, j) =>
                            j === i ? { ...s, value: 0 } : s
                          ),
                        });
                      }
                    }}
                    className="w-28 px-3 py-2 rounded-lg border border-brand-line bg-brand-bg/50 text-sm focus:outline-none focus:border-brand-primary transition-colors text-center font-mono"
                    placeholder="+250"
                  />
                  <button
                    onClick={() =>
                      updateDepartment(editing.id, {
                        stats: editing.stats.filter((_, j) => j !== i),
                      })
                    }
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                updateDepartment(editing.id, {
                  stats: [...editing.stats, { label: { ar: 'إحصائية', en: 'Stat', am: '', om: '' }, value: 0 }],
                })
              }
              className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline mt-3"
            >
              <Plus size={14} />
              {t.admin.addStat}
            </button>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
          >
            <Save size={18} />
            {t.common.save}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-brand-ink mb-6">{t.admin.departments}</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {departments.map((dept, i) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="card-base p-5"
            style={{ borderTop: `3px solid ${dept.accentColor.base}` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: dept.accentColor.base + '15' }}
              >
                <Building2 size={20} style={{ color: dept.accentColor.base }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-ink text-sm leading-snug mb-1">{localize(dept.name, lang)}</h3>
                <p className="text-xs text-brand-ink-muted mb-3">{dept.establishedDate}</p>
                <div className="flex gap-3 text-xs text-brand-ink-soft">
                  <span className="flex items-center gap-1">
                    <Building2 size={12} /> {dept.programs.length} {t.admin.programs}
                  </span>
                  <span>·</span>
                  <span>{dept.stats.length} {t.admin.stats}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setEditingId(dept.id)}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-brand-bg-alt text-sm font-semibold text-brand-ink-soft hover:bg-brand-line transition-colors"
            >
              {t.common.edit}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
