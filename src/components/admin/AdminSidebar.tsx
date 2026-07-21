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
  BarChart3,
  Settings,
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
    { to: '/admin/programs', label: t.common.programs, icon: BookOpen },
    { to: '/admin/registrations', label: t.admin.registrations, icon: ClipboardList },
    { to: '/admin/statistics', label: t.admin.statisticsEdit, icon: BarChart3 },
    { to: '/admin/settings', label: t.admin.websiteSettings, icon: Settings },
  ];

  const sidebarContent = (
    <aside className="w-64 bg-brand-primary-dark text-white flex flex-col h-screen relative overflow-hidden">
      {/* Decorative gold glow */}
      <div className="absolute -top-16 -end-12 w-48 h-48 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -start-10 w-40 h-40 rounded-full bg-brand-primary/30 blur-3xl pointer-events-none" />

      {/* Brand header */}
      <div className="relative p-5 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3 min-w-0" onClick={onClose}>
          <div className="w-11 h-11 rounded-xl bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40 shrink-0">
            <BookOpen size={22} className="text-brand-secondary" strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm truncate leading-tight">{t.admin.dashboard}</div>
            <div className="text-[11px] text-brand-secondary/80 truncate mt-0.5">Dar Al-Quran</div>
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

      {/* Nav */}
      <nav className="relative flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-2 text-[10px] font-bold tracking-widest uppercase text-white/40">
          Menu
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-brand-secondary text-white shadow-gold'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-active-dot"
                  className="absolute -start-3 top-1/2 -translate-y-1/2 w-1.5 h-7 rounded-full bg-brand-secondary"
                />
              )}
              <item.icon size={18} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Language switcher */}
      <AdminLanguageSwitcher />

      {/* Footer */}
      <div className="relative p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all"
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
    <div ref={ref} className="relative px-3 py-2 border-t border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
      >
        <Globe size={18} className="shrink-0" />
        <span className="flex-1 text-start truncate">{current?.nativeLabel ?? 'Language'}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary/80">{lang}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 start-3 end-3 bg-white rounded-xl shadow-card-hover overflow-hidden z-50"
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

