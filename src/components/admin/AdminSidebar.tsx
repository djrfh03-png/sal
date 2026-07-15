import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Megaphone,
  FileText,
  ClipboardList,
  LogOut,
  BookOpen,
  X,
  Globe,
  Check,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { LANGUAGES } from '../../i18n/languages';

interface AdminSidebarProps {
  onLogout: () => void;
  variant: 'desktop' | 'mobile';
  open?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ onLogout, variant, open = false, onClose }: AdminSidebarProps) {
  const { t } = useI18n();
  const location = useLocation();

  const menuItems = [
    { to: '/admin/dashboard', label: t.admin.dashboard, icon: LayoutDashboard },
    { to: '/admin/departments', label: t.admin.departments, icon: Building2 },
    { to: '/admin/announcements', label: t.admin.announcements, icon: Megaphone },
    { to: '/admin/posts', label: t.admin.posts, icon: FileText },
    { to: '/admin/registrations', label: t.admin.registrations, icon: ClipboardList },
  ];

  const sidebarContent = (
    <aside className="w-64 bg-brand-ink text-white flex flex-col h-screen">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3 min-w-0" onClick={onClose}>
          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40 shrink-0">
            <BookOpen size={20} className="text-brand-secondary" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm truncate">{t.admin.dashboard}</div>
            <div className="text-xs text-white/50 truncate">Dar Al-Quran Admin</div>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-brand-primary text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Language switcher */}
      <AdminLanguageSwitcher />

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <LogOut size={18} className="shrink-0" />
          {t.admin.logout}
        </button>
      </div>
    </aside>
  );

  if (variant === 'desktop') {
    return sidebarContent;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed top-0 bottom-0 start-0 z-50"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AdminLanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className="px-4 py-3 border-t border-white/10 relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
      >
        <Globe size={18} className="shrink-0" />
        <span className="flex-1 text-start truncate">{current?.nativeLabel ?? 'Language'}</span>
        <span className="text-xs uppercase">{lang}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 start-4 end-4 bg-white rounded-xl shadow-card-hover overflow-hidden z-50"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  l.code === lang ? 'bg-brand-bg-alt font-bold text-brand-primary' : 'hover:bg-brand-bg-alt text-brand-ink'
                }`}
              >
                <span>{l.nativeLabel}</span>
                {l.code === lang && <Check size={16} className="text-brand-primary shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminStatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof LayoutDashboard; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-base p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
          <Icon size={20} className="sm:hidden" style={{ color }} />
          <Icon size={24} className="hidden sm:block" style={{ color }} />
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-bold font-display text-brand-ink">{value}</div>
      <div className="text-xs sm:text-sm text-brand-ink-muted mt-1">{label}</div>
    </motion.div>
  );
}
