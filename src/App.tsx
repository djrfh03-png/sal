import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { I18nProvider } from './i18n/I18nContext';
import { ToastProvider } from './components/ui/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { DepartmentProgramsPage } from './pages/DepartmentProgramsPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { AnnouncementsPage, AnnouncementDetailPage } from './pages/AnnouncementsPage';
import { PostsPage, PostDetailPage } from './pages/PostsPage';
import { RegisterPage } from './pages/RegisterPage';
import { DepartmentRegisterPage } from './pages/DepartmentRegisterPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { AdminDepartmentsPage } from './admin/AdminDepartmentsPage';
import { AdminAnnouncementsPage } from './admin/AdminAnnouncementsPage';
import { AdminPostsPage } from './admin/AdminPostsPage';
import { AdminProgramsPage } from './admin/AdminProgramsPage';
import { AdminRegistrationsPage } from './admin/AdminRegistrationsPage';
import { AdminStatisticsPage } from './admin/AdminStatisticsPage';
import { AdminSettingsPage } from './admin/AdminSettingsPage';
import { AdminDepartmentDetailPage } from './admin/AdminDepartmentDetailPage';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="departments/:slug" element={<AdminDepartmentDetailPage />} />
          <Route path="announcements" element={<AdminAnnouncementsPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="programs" element={<AdminProgramsPage />} />
          <Route path="registrations" element={<AdminRegistrationsPage />} />
          <Route path="statistics" element={<AdminStatisticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/departments" element={<PublicLayout><DepartmentsPage /></PublicLayout>} />
        <Route path="/departments/:slug" element={<PublicLayout><DepartmentDetailPage /></PublicLayout>} />
        <Route path="/programs" element={<PublicLayout><ProgramsPage /></PublicLayout>} />
        <Route path="/departments/:slug/programs" element={<PublicLayout><DepartmentProgramsPage /></PublicLayout>} />
        <Route path="/departments/:slug/register" element={<PublicLayout><DepartmentRegisterPage /></PublicLayout>} />
        <Route path="/announcements" element={<PublicLayout><AnnouncementsPage /></PublicLayout>} />
        <Route path="/announcements/:id" element={<PublicLayout><AnnouncementDetailPage /></PublicLayout>} />
        <Route path="/posts" element={<PublicLayout><PostsPage /></PublicLayout>} />
        <Route path="/posts/:id" element={<PublicLayout><PostDetailPage /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <I18nProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </ToastProvider>
    </I18nProvider>
  );
}

export default App;
