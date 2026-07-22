import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, BookOpen, Loader2 } from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminStoreProvider } from '../admin/AdminStore';
import { AuthProvider, useAuth } from '../admin/AdminAuthContext';
import { useI18n } from '../i18n/I18nContext';
import { supabase } from '../lib/supabaseClient';

function AdminContent() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { session, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!session) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  return (
    <AdminStoreProvider>
      <div className="min-h-screen bg-brand-bg flex">
        {/* Desktop sidebar — docked, part of flex flow */}
        <div className="hidden md:flex shrink-0">
          <AdminSidebar onLogout={handleLogout} variant="desktop" />
        </div>

        {/* Mobile sidebar — fixed overlay, floats over content */}
        <AdminSidebar
          onLogout={handleLogout}
          variant="mobile"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          {/* Mobile top bar — premium emerald with gold accent */}
          <header className="md:hidden sticky top-0 z-30 bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white px-4 h-14 flex items-center justify-between shadow-md shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/40">
                <BookOpen size={16} className="text-brand-secondary" />
              </div>
              <span className="font-bold text-sm">{t.admin.dashboard}</span>
            </div>
            <div className="w-9" />
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminStoreProvider>
  );
}

export function AdminLayout() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
