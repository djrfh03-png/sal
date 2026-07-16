import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, BookOpen, Sparkles, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Modal';
import { localize } from '../utils/localize';
import type { DepartmentProgram, DepartmentSlug } from '../types';

// School grade groupings — must match DepartmentProgramsPage
const schoolGradeGroups = [
  { key: 'temhid-1', label: { ar: 'تمهيد الأول', en: 'Temhid Al-Awwal', am: '', om: '' }, indices: [0] },
  { key: 'temhid-2', label: { ar: 'تمهيد الأخير', en: 'Temhid Al-Akhir', am: '', om: '' }, indices: [1] },
  { key: 'grade-1', label: { ar: 'الصف الأول', en: 'Grade 1', am: '', om: '' }, indices: [2, 3, 4] },
  { key: 'grade-2', label: { ar: 'الصف الثاني', en: 'Grade 2', am: '', om: '' }, indices: [5, 6] },
  { key: 'grade-3', label: { ar: 'الصف الثالث', en: 'Grade 3', am: '', om: '' }, indices: [7, 8] },
  { key: 'grade-4', label: { ar: 'الصف الرابع', en: 'Grade 4', am: '', om: '' }, indices: [9] },
  { key: 'grade-5', label: { ar: 'الصف الخامس', en: 'Grade 5', am: '', om: '' }, indices: [10] },
];

export function AdminProgramsPage() {
  const { t, lang } = useI18n();
  const { departments, addProgram, updateProgram, deleteProgram } = useAdminStore();
  const { showToast } = useToast();
  const [selectedDept, setSelectedDept] = useState<DepartmentSlug | null>(null);
  const [editing, setEditing] = useState<{ deptSlug: string; index: number; program: Partial<DepartmentProgram> } | null>(null);
  const [deleteState, setDeleteState] = useState<{ deptSlug: string; index: number } | null>(null);
  const [openGrades, setOpenGrades] = useState<Set<string>>(new Set(schoolGradeGroups.map(g => g.key)));

  const selectedDepartment = departments.find(d => d.slug === selectedDept);
  const isSchool = selectedDepartment?.slug === 'school';

  const startNew = (deptSlug: string) => {
    setEditing({
      deptSlug,
      index: -1,
      program: {
        name: { ar: '', en: '', am: '', om: '' },
        description: { ar: '', en: '', am: '', om: '' },
      },
    });
  };

  const handleSave = () => {
    if (!editing) return;
    const { deptSlug, index, program } = editing;
    if (!program.name || !program.name[lang]) {
      showToast(lang === 'ar' ? 'الاسم مطلوب' : 'Name is required', 'error');
      return;
    }
    if (index >= 0) {
      updateProgram(deptSlug, index, program);
    } else {
      addProgram(deptSlug, program as Omit<DepartmentProgram, 'id'>);
    }
    showToast(t.admin.saved, 'success');
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleteState) {
      deleteProgram(deleteState.deptSlug, deleteState.index);
      showToast(t.admin.deleted, 'success');
      setDeleteState(null);
    }
  };

  const toggleGrade = (key: string) => {
    setOpenGrades(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary transition-colors text-sm';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.common.programs}</h1>
      </div>

      {/* Department selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {departments.map((dept) => {
          const isActive = selectedDept === dept.slug;
          const accent = dept.accentColor.base;
          return (
            <button
              key={dept.slug}
              onClick={() => setSelectedDept(dept.slug)}
              className={`relative p-4 rounded-2xl text-start transition-all duration-300 ${
                isActive ? 'shadow-card-hover -translate-y-0.5' : 'shadow-card hover:shadow-card-hover hover:-translate-y-0.5'
              }`}
              style={{
                backgroundColor: isActive ? accent + '10' : '#ffffff',
                borderInlineStart: `3px solid ${accent}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} style={{ color: accent }} />
                <span className="text-xs font-bold text-brand-ink line-clamp-1">{localize(dept.name, lang)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-ink-muted">
                <Sparkles size={12} style={{ color: dept.accentColor.accent }} />
                <span>{dept.programs.length} {lang === 'ar' ? 'برنامج' : 'programs'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {!selectedDepartment && (
        <div className="text-center py-20 text-brand-ink-muted">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p>{lang === 'ar' ? 'اختر قسماً لإدارة برامجه' : 'Select a department to manage its programs'}</p>
        </div>
      )}

      {selectedDepartment && (
        <>
          {/* Add button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brand-ink">{localize(selectedDepartment.name, lang)}</h2>
            <button
              onClick={() => startNew(selectedDepartment.slug)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              {lang === 'ar' ? 'إضافة برنامج' : 'Add Program'}
            </button>
          </div>

          {/* Programs list */}
          {isSchool ? (
            <div className="space-y-3">
              {schoolGradeGroups.map((group) => {
                const isOpen = openGrades.has(group.key);
                const programs = group.indices
                  .map(i => ({ program: selectedDepartment.programs[i], index: i }))
                  .filter(p => p.program);

                return (
                  <div key={group.key} className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-line">
                    <button
                      onClick={() => toggleGrade(group.key)}
                      className="w-full flex items-center justify-between p-4 hover:bg-brand-bg-alt/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ backgroundColor: selectedDepartment.accentColor.base + '15', color: selectedDepartment.accentColor.base }}
                        >
                          {group.key.startsWith('grade') ? group.key.split('-')[1] : 'T'}
                        </div>
                        <span className="font-bold text-brand-ink text-sm">{localize(group.label, lang)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: selectedDepartment.accentColor.accent + '20', color: selectedDepartment.accentColor.base }}>
                          {programs.length}
                        </span>
                        <ChevronDown size={18} className="text-brand-ink-muted transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 space-y-2">
                        {programs.length === 0 && (
                          <p className="text-xs text-brand-ink-muted text-center py-4">
                            {lang === 'ar' ? 'لا توجد برامج في هذا الصف' : 'No programs in this grade'}
                          </p>
                        )}
                        {programs.map(({ program, index }) => (
                          <ProgramRow
                            key={index}
                            program={program}
                            accent={selectedDepartment.accentColor.base}
                            onEdit={() => setEditing({ deptSlug: selectedDepartment.slug, index, program: { ...program } })}
                            onDelete={() => setDeleteState({ deptSlug: selectedDepartment.slug, index })}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {/* Programs beyond grade groups */}
              {selectedDepartment.programs.length > 11 && (
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-line p-4 space-y-2">
                  <p className="text-xs font-semibold text-brand-ink-muted mb-2">
                    {lang === 'ar' ? 'برامج إضافية' : 'Additional Programs'}
                  </p>
                  {selectedDepartment.programs.slice(11).map((program, i) => (
                    <ProgramRow
                      key={i + 11}
                      program={program}
                      accent={selectedDepartment.accentColor.base}
                      onEdit={() => setEditing({ deptSlug: selectedDepartment.slug, index: i + 11, program: { ...program } })}
                      onDelete={() => setDeleteState({ deptSlug: selectedDepartment.slug, index: i + 11 })}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDepartment.programs.map((program, i) => (
                <ProgramRow
                  key={i}
                  program={program}
                  accent={selectedDepartment.accentColor.base}
                  onEdit={() => setEditing({ deptSlug: selectedDepartment.slug, index: i, program: { ...program } })}
                  onDelete={() => setDeleteState({ deptSlug: selectedDepartment.slug, index: i })}
                />
              ))}
              {selectedDepartment.programs.length === 0 && (
                <div className="text-center py-12 text-brand-ink-muted">
                  <p>{lang === 'ar' ? 'لا توجد برامج بعد' : 'No programs yet'}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Edit/Add Modal */}
      {editing && (
        <Modal
          open={!!editing}
          onClose={() => setEditing(null)}
          title={editing.index >= 0 ? (lang === 'ar' ? 'تعديل برنامج' : 'Edit Program') : (lang === 'ar' ? 'إضافة برنامج' : 'Add Program')}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{lang === 'ar' ? 'اسم البرنامج' : 'Program Name'} ({lang})</label>
              <input
                type="text"
                value={editing.program.name?.[lang] ?? ''}
                onChange={(e) => setEditing(prev => prev ? { ...prev, program: { ...prev.program, name: { ...prev.program.name!, [lang]: e.target.value } } } : prev)}
                className={inputClass}
                placeholder={lang === 'ar' ? 'أدخل اسم البرنامج' : 'Enter program name'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-ink mb-1.5">{lang === 'ar' ? 'الوصف' : 'Description'} ({lang})</label>
              <textarea
                rows={3}
                value={editing.program.description?.[lang] ?? ''}
                onChange={(e) => setEditing(prev => prev ? { ...prev, program: { ...prev.program, description: { ...prev.program.description!, [lang]: e.target.value } } } : prev)}
                className={`${inputClass} resize-none`}
                placeholder={lang === 'ar' ? 'وصف اختياري' : 'Optional description'}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                <Save size={18} />
                {t.common.save}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all"
              >
                <X size={18} />
                {t.common.cancel}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      <Modal open={!!deleteState} onClose={() => setDeleteState(null)} title={t.admin.confirmDelete} size="sm">
        <div>
          <p className="text-brand-ink-soft mb-6">{t.admin.confirmDeleteMessage}</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:shadow-lg transition-all">
              {t.common.delete}
            </button>
            <button onClick={() => setDeleteState(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-brand-bg-alt text-brand-ink-soft font-semibold text-sm hover:bg-brand-line transition-all">
              {t.common.cancel}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ProgramRow({
  program,
  accent,
  onEdit,
  onDelete,
}: {
  program: DepartmentProgram;
  accent: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { lang } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg-alt/50"
      style={{ borderInlineStart: `3px solid ${accent}` }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
        style={{ backgroundColor: accent + '15', color: accent }}
      >
        <BookOpen size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-brand-ink line-clamp-1">{localize(program.name, lang)}</h4>
        {program.description && program.description[lang] && (
          <p className="text-xs text-brand-ink-muted line-clamp-1">{localize(program.description, lang)}</p>
        )}
      </div>
      <div className="flex gap-1 shrink-0">
        <button onClick={onEdit} className="p-2 rounded-lg text-brand-primary hover:bg-brand-primary/10 transition-colors">
          <Edit size={16} />
        </button>
        <button onClick={onDelete} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
