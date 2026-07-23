import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Megaphone, FileText, BookOpen, ChevronRight,
  Layers, Users, GraduationCap, Heart, FileCheck, Settings2,
  Image as ImageIcon, Upload, X,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAdminStore } from '../admin/AdminStore';
import { useToast } from '../components/ui/Toast';
import { localize } from '../utils/localize';
import { DepartmentLogo } from '../components/ui/DepartmentLogo';
import type { RegistrationStatus } from '../types';

const deptIcons: Record<string, typeof BookOpen> = {
  'center-hifz': Layers,
  'school': GraduationCap,
  'halqa': Users,
  'charity': Heart,
};

const statusMeta: Record<RegistrationStatus, { color: string; labelKey: 'open' | 'closed' | 'comingSoon' }> = {
  open: { color: '#22c55e', labelKey: 'open' },
  closed: { color: '#ef4444', labelKey: 'closed' },
  coming_soon: { color: '#C9A227', labelKey: 'comingSoon' },
};

export function AdminDashboardPage() {
  const { t, lang, dir } = useI18n();
  const { departments, announcements, posts, registrations, settings, updateDepartment, updateSettings } = useAdminStore();
  const { showToast } = useToast();
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const orgFileInputRef = useRef<HTMLInputElement>(null);
  const Arrow = dir === 'rtl' ? 'rotate-180' : '';

  const generalAnnCount = announcements.filter((a) => a.departmentSlug === 'org').length;
  const totalPending = registrations.filter((r) => r.status === 'pending').length;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, deptId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateDepartment(deptId, { coverImage: reader.result as string });
      showToast(t.admin.saved, 'success');
      setUploadingFor(null);
    };
    reader.readAsDataURL(file);
  };

  const handleOrgPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSettings({ heroImage: reader.result as string });
      showToast(t.admin.saved, 'success');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadingFor && handlePhotoUpload(e, uploadingFor)} />
      <input ref={orgFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleOrgPhotoUpload} />

      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-px w-8 bg-brand-secondary/60" />
          <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
            {lang === 'ar' ? 'لوحة التحكم' : 'Control Panel'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-ink">{t.admin.dashboard}</h1>
      </motion.div>

      <div className="space-y-8">
        {/* ── Main Organization Section ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-primary/60" />
            <span className="text-brand-primary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'المؤسسة الرئيسية' : 'Main Organization'}
            </span>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
          >
            {/* Org header with photo */}
            <div className="relative h-28 overflow-hidden">
              <img
                src={settings.heroImage || 'https://images.pexels.com/photos/15403114/pexels-photo-15403114/free-photo-of-empty-interior-of-a-mosque.jpeg?auto=compress&cs=tinysrgb&w=1600'}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => orgFileInputRef.current?.click()}
                className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                title={lang === 'ar' ? 'تغيير الصورة' : 'Change Photo'}
              >
                <ImageIcon size={14} />
              </button>
              <div className="absolute bottom-3 start-4 z-10 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shrink-0 shadow-card">
                  <Building2 size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm leading-snug drop-shadow">
                    {lang === 'ar' ? 'المؤسسة الرئيسية' : 'Main Institution'}
                  </h2>
                  <p className="text-[11px] text-white/80 mt-0.5 drop-shadow">
                    {lang === 'ar' ? 'إعدادات وإعلانات عامة' : 'General settings & announcements'}
                  </p>
                </div>
              </div>
            </div>

            {/* Org tiles */}
            <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: lang === 'ar' ? 'إعلانات عامة' : 'General Announcements', count: generalAnnCount, icon: Megaphone, to: '/admin/announcements' },
                { label: lang === 'ar' ? 'بانتظار المراجعة' : 'Pending Review', count: totalPending, icon: FileCheck, to: '/admin/registrations', badge: totalPending },
                { label: t.admin.departments, count: departments.length, icon: Building2, to: '/admin/departments' },
                { label: t.admin.websiteSettings, count: 0, icon: Settings2, to: '/admin/settings', isSettings: true },
              ].map((tile, ti) => (
                <Link key={ti} to={tile.to} className="group bg-brand-bg-alt/50 rounded-xl p-3 hover:bg-brand-bg-alt transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <tile.icon size={16} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                    {!!tile.badge && tile.badge > 0 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary leading-none">
                        {tile.badge} new
                      </span>
                    )}
                  </div>
                  {tile.isSettings ? (
                    <div className="text-[11px] font-semibold text-brand-primary">{tile.label}</div>
                  ) : (
                    <>
                      <div className="text-lg font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                      <div className="text-[10px] text-brand-ink-muted mt-1">{tile.label}</div>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ── Departments Section ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-secondary/60" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'الأقسام' : 'Departments'}
            </span>
          </div>

          <div className="space-y-6">
            {departments.map((dept, i) => {
              const Icon = deptIcons[dept.slug] ?? BookOpen;
              const accent = dept.accentColor.base;
              const meta = statusMeta[dept.registrationStatus];
              const deptLink = `/admin/departments/${dept.slug}`;

              const annCount = announcements.filter((a) => a.departmentSlug === dept.slug).length;
              const postCount = posts.filter((p) => p.departmentSlug === dept.slug).length;
              const regCount = registrations.filter((r) => r.departmentSlug === dept.slug).length;
              const pending = registrations.filter((r) => r.departmentSlug === dept.slug && r.status === 'pending').length;

              return (
                <motion.section
                  key={dept.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                >
                  {/* Department header with cover photo */}
                  <div className="relative h-24 overflow-hidden">
                    <img
                      src={dept.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <button
                      onClick={() => { setUploadingFor(dept.id); fileInputRef.current?.click(); }}
                      className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                      title={lang === 'ar' ? 'تغيير الصورة' : 'Change Photo'}
                    >
                      <ImageIcon size={14} />
                    </button>
                    <Link to={deptLink} className="absolute bottom-3 start-4 z-10 flex items-center gap-2.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shrink-0 shadow-card">
                        <DepartmentLogo slug={dept.slug} size="sm" />
                      </div>
                      <div>
                        <h2 className="font-bold text-white text-sm leading-snug drop-shadow group-hover:text-brand-secondary transition-colors">
                          {localize(dept.name, lang)}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                          <span className="text-[11px] text-white/80 drop-shadow">{t.admin[meta.labelKey]}</span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Department content tiles */}
                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { label: t.common.programs, count: dept.programs.length, icon: BookOpen },
                        { label: t.admin.announcements, count: annCount, icon: Megaphone },
                        { label: t.admin.posts, count: postCount, icon: FileText },
                        { label: t.admin.registrations, count: regCount, icon: FileCheck, badge: pending },
                      ].map((tile, ti) => (
                        <Link key={ti} to={deptLink} className="group bg-brand-bg-alt/40 rounded-xl p-3 hover:bg-brand-bg-alt transition-colors text-center">
                          <div className="flex items-center justify-center mb-1.5 relative">
                            <tile.icon size={15} className="text-brand-ink-muted group-hover:text-brand-primary transition-colors" />
                            {!!tile.badge && tile.badge > 0 && (
                              <span className="absolute -top-1 -end-1 text-[8px] font-bold px-1 py-0.5 rounded-full bg-brand-secondary/20 text-brand-secondary leading-none">
                                {tile.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-base font-bold font-display text-brand-ink leading-none tabular-nums">{tile.count}</div>
                          <div className="text-[9px] text-brand-ink-muted mt-1 truncate">{tile.label}</div>
                        </Link>
                      ))}
                    </div>

                    {/* Stats inline */}
                    <div className="mt-4 pt-4 border-t border-brand-line/60 flex flex-wrap gap-4">
                      {dept.stats.map((stat, si) => (
                        <div key={si} className="flex items-center gap-2">
                          <span className="text-lg font-bold font-display tabular-nums text-brand-ink">
                            {stat.value.toLocaleString()}+
                          </span>
                          <span className="text-[11px] text-brand-ink-muted leading-tight">
                            {localize(stat.label, lang)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Manage link */}
                    <Link
                      to={deptLink}
                      className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-primary hover:gap-2.5 transition-all"
                    >
                      {lang === 'ar' ? 'إدارة القسم' : 'Manage Department'}
                      <ChevronRight size={14} className={Arrow} />
                    </Link>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
