import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, BookOpen } from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminStoreProvider } from '../admin/AdminStore';
import { useI18n } from '../i18n/I18nContext';

export function AdminLayout() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin-authed') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authed');
    setAuthed(false);
    navigate('/admin/login');
  };

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
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
