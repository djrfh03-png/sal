import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export function AdminLoginPage() {
  const { t, dir, lang } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth — any input navigates to dashboard
    sessionStorage.setItem('admin-authed', 'true');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ink pattern-bg-gold p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto mb-4 border-2 border-brand-primary/30">
            <BookOpen size={40} className="text-brand-secondary" strokeWidth={1.2} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t.admin.login}</h1>
          <p className="text-sm text-white/50">Dar Al-Quran Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-card-hover p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.email}</label>
            <div className="relative">
              <Mail size={18} className="absolute top-3 start-3 text-brand-ink-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                placeholder="admin@daralquran.org"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.password}</label>
            <div className="relative">
              <Lock size={18} className="absolute top-3 start-3 text-brand-ink-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {t.admin.signIn}
            <Arrow size={18} />
          </button>
          <Link to="/" className="block text-center text-xs text-brand-ink-muted hover:text-brand-primary transition-colors">
            ← {lang === 'ar' ? 'العودة للموقع' : 'Back to site'}
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
