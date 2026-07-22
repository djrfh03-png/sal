import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lock, Mail, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { supabase } from '../lib/supabaseClient';

export function AdminLoginPage() {
  const { t, dir, lang } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(lang === 'ar' ? `فشل تسجيل الدخول: ${msg}` : `Login failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary-dark p-4 relative overflow-hidden">
      {/* Decorative background — gold glows + faint geometric marks */}
      <div className="absolute top-1/4 end-0 w-96 h-96 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-96 h-96 rounded-full bg-brand-primary/30 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-10 start-10 w-24 h-24 border border-white/30 rotate-45" />
        <div className="absolute bottom-16 end-16 w-32 h-32 border border-white/30 rotate-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-brand-secondary/20 flex items-center justify-center mx-auto mb-5 border border-brand-secondary/40 shadow-gold">
            <BookOpen size={40} className="text-brand-secondary" strokeWidth={1.2} />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-brand-secondary/50" />
            <span className="text-brand-secondary text-[11px] font-semibold tracking-widest uppercase">
              {lang === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
            </span>
            <div className="h-px w-10 bg-brand-secondary/50" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t.admin.login}</h1>
          <p className="text-sm text-white/50">Dar Al-Quran</p>
        </div>

        {/* Login card */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-card-hover p-7 space-y-5">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-brand-ink mb-1.5">{t.admin.email}</label>
            <div className="relative">
              <Mail size={18} className="absolute top-3 start-3 text-brand-ink-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-line bg-brand-bg/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Arrow size={18} />}
            {loading ? (lang === 'ar' ? 'جارٍ الدخول...' : 'Signing in...') : t.admin.signIn}
          </button>
          <Link
            to="/"
            className="block text-center text-xs text-brand-ink-muted hover:text-brand-primary transition-colors"
          >
            {lang === 'ar' ? '← العودة للموقع' : '← Back to site'}
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
