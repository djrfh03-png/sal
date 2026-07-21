import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { departments as initialDepartments } from '../data/departments';
import { announcements as initialAnnouncements } from '../data/announcements';
import { posts as initialPosts } from '../data/posts';
import { registrations as initialRegistrations, siteSettings as initialSettings } from '../data/misc';
import type { Department, DepartmentProgram, Announcement, Post, Registration, SiteSettings, RegistrationStatus, LocalizedName } from '../types';

interface AdminStoreValue {
  departments: Department[];
  announcements: Announcement[];
  posts: Post[];
  registrations: Registration[];
  settings: SiteSettings;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  addPost: (p: Omit<Post, 'id'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  setRegistrationStatus: (slug: string, status: RegistrationStatus) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  updateDepartmentStat: (deptId: string, statIndex: number, value: number) => void;
  updateDepartmentRequirements: (deptId: string, lang: keyof LocalizedName, value: string) => void;
  updateDepartmentTelegram: (deptId: string, chatId: string) => void;
  addProgram: (deptSlug: string, program: Omit<DepartmentProgram, 'id'>) => void;
  updateProgram: (deptSlug: string, programIndex: number, updates: Partial<DepartmentProgram>) => void;
  deleteProgram: (deptSlug: string, programIndex: number) => void;
}

const AdminStoreContext = createContext<AdminStoreValue | undefined>(undefined);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  const updateDepartment = useCallback((id: string, updates: Partial<Department>) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  }, []);

  const addAnnouncement = useCallback((a: Omit<Announcement, 'id'>) => {
    setAnnouncements((prev) => [{ ...a, id: `ann-${Date.now()}` }, ...prev]);
  }, []);

  const updateAnnouncement = useCallback((id: string, updates: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }, []);

  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const addPost = useCallback((p: Omit<Post, 'id'>) => {
    setPosts((prev) => [{ ...p, id: `post-${Date.now()}` }, ...prev]);
  }, []);

  const updatePost = useCallback((id: string, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateRegistrationStatus = useCallback((id: string, status: Registration['status']) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const setRegistrationStatus = useCallback((slug: string, status: RegistrationStatus) => {
    setDepartments((prev) => prev.map((d) => (d.slug === slug ? { ...d, registrationStatus: status } : d)));
  }, []);

  const updateSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateDepartmentStat = useCallback((deptId: string, statIndex: number, value: number) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? { ...d, stats: d.stats.map((s, i) => (i === statIndex ? { ...s, value } : s)) }
          : d
      )
    );
  }, []);

  const updateDepartmentRequirements = useCallback((deptId: string, lang: keyof LocalizedName, value: string) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? { ...d, requirements: { ...d.requirements, [lang]: value } }
          : d
      )
    );
  }, []);

  const updateDepartmentTelegram = useCallback((deptId: string, chatId: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === deptId ? { ...d, telegramChatId: chatId } : d))
    );
  }, []);

  const addProgram = useCallback((deptSlug: string, program: Omit<DepartmentProgram, 'id'>) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.slug === deptSlug
          ? { ...d, programs: [...d.programs, program] }
          : d
      )
    );
  }, []);

  const updateProgram = useCallback((deptSlug: string, programIndex: number, updates: Partial<DepartmentProgram>) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.slug === deptSlug
          ? { ...d, programs: d.programs.map((p, i) => (i === programIndex ? { ...p, ...updates } : p)) }
          : d
      )
    );
  }, []);

  const deleteProgram = useCallback((deptSlug: string, programIndex: number) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.slug === deptSlug
          ? { ...d, programs: d.programs.filter((_, i) => i !== programIndex) }
          : d
      )
    );
  }, []);

  return (
    <AdminStoreContext.Provider
      value={{
        departments,
        announcements,
        posts,
        registrations,
        settings,
        updateDepartment,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addPost,
        updatePost,
        deletePost,
        updateRegistrationStatus,
        setRegistrationStatus,
        updateSettings,
        updateDepartmentStat,
        updateDepartmentRequirements,
        updateDepartmentTelegram,
        addProgram,
        updateProgram,
        deleteProgram,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) throw new Error('useAdminStore must be used within AdminStoreProvider');
  return ctx;
}

/**
 * Safe variant that returns null outside the provider, so public pages can
 * opt-in to inline editing only when the admin context is available.
 */
export function useAdminStoreOrNull() {
  return useContext(AdminStoreContext);
}
