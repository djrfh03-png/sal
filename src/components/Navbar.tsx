import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t, lang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/departments', label: t.nav.departments },
    { to: '/announcements', label: t.nav.announcements },
    { to: '/posts', label: t.nav.posts },
    { to: '/register', label: t.nav.register },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Institution name — no logo */}
          <Link to="/" className="shrink-0 group">
            <div className="font-bold text-sm md:text-base leading-tight text-brand-ink group-hover:text-brand-primary transition-colors">
              {lang === 'ar' ? 'دار القرآن الكريم' : 'Dar Al-Quran'}
            </div>
            <div className="text-xs leading-tight text-brand-ink-muted">
              {lang === 'ar' ? 'لخديجة بنت خويلد' : 'Khadija bint Khuwaylid'}
            </div>
          </Link>

          {/* Centered navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.to
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-brand-ink-soft hover:text-brand-primary hover:bg-brand-bg-alt'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <Link
              to="/admin/login"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-secondary border border-brand-secondary/30 hover:bg-brand-secondary/10 hover:border-brand-secondary/50 transition-all duration-300"
            >
              <Shield size={16} />
              {t.nav.admin}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-brand-bg-alt transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-brand-line overflow-hidden"
          >
            <div className="container-page py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-brand-ink-soft hover:bg-brand-bg-alt'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-brand-secondary hover:bg-brand-secondary/10 transition-colors"
              >
                <Shield size={16} />
                {t.nav.admin}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
