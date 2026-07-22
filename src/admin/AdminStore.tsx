import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  fetchDepartments,
  fetchAnnouncements,
  fetchPosts,
  fetchRegistrations,
  fetchSiteSettings,
} from '../services/api';
import type {
  Department,
  DepartmentProgram,
  Announcement,
  Post,
  Registration,
  SiteSettings,
  RegistrationStatus,
  LocalizedName,
} from '../types';

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

// ─── camelCase → snake_case mappers for Supabase writes ──────────────────

function deptToRow(d: Partial<Department>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (d.name !== undefined) row.name = d.name;
  if (d.shortDescription !== undefined) row.short_description = d.shortDescription;
  if (d.fullDescription !== undefined) row.full_description = d.fullDescription;
  if (d.mission !== undefined) row.mission = d.mission;
  if (d.vision !== undefined) row.vision = d.vision;
  if (d.values !== undefined) row.values = d.values;
  if (d.objectives !== undefined) row.objectives = d.objectives;
  if (d.establishedDate !== undefined) row.established_date = d.establishedDate;
  if (d.logoKey !== undefined) row.logo_key = d.logoKey;
  if (d.coverImageKey !== undefined) row.cover_image_key = d.coverImageKey;
  if (d.coverImage !== undefined) row.cover_image = d.coverImage;
  if (d.accentColor !== undefined) row.accent_color = d.accentColor;
  if (d.stats !== undefined) row.stats = d.stats;
  if (d.programs !== undefined) row.programs = d.programs;
  if (d.telegramLink !== undefined) row.telegram_link = d.telegramLink;
  if (d.telegramChatId !== undefined) row.telegram_chat_id = d.telegramChatId;
  if (d.registrationStatus !== undefined) row.registration_status = d.registrationStatus;
  if (d.registrationFields !== undefined) row.registration_fields = d.registrationFields;
  if (d.requirements !== undefined) row.requirements = d.requirements;
  return row;
}

function announcementToRow(a: Partial<Announcement>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (a.title !== undefined) row.title = a.title;
  if (a.departmentSlug !== undefined) row.department_slug = a.departmentSlug;
  if (a.date !== undefined) row.date = a.date;
  if (a.image !== undefined) row.image = a.image;
  if (a.excerpt !== undefined) row.excerpt = a.excerpt;
  if (a.content !== undefined) row.content = a.content;
  return row;
}

function postToRow(p: Partial<Post>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (p.type !== undefined) row.type = p.type;
  if (p.departmentSlug !== undefined) row.department_slug = p.departmentSlug;
  if (p.title !== undefined) row.title = p.title;
  if (p.media !== undefined) row.media = p.media;
  if (p.content !== undefined) row.content = p.content;
  if (p.date !== undefined) row.date = p.date;
  return row;
}

function settingsToRow(s: Partial<SiteSettings>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (s.heroTitle !== undefined) row.hero_title = s.heroTitle;
  if (s.heroSubtitle !== undefined) row.hero_subtitle = s.heroSubtitle;
  if (s.contactEmail !== undefined) row.contact_email = s.contactEmail;
  if (s.contactLocation !== undefined) row.contact_location = s.contactLocation;
  if (s.orgTelegram !== undefined) row.org_telegram = s.orgTelegram;
  if (s.developedBy !== undefined) row.developed_by = s.developedBy;
  if (s.social !== undefined) row.social = s.social;
  return row;
}

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ─── Initial load from Supabase ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [depts, anns, psts, regs, stgs] = await Promise.all([
          fetchDepartments(),
          fetchAnnouncements(),
          fetchPosts(),
          fetchRegistrations(),
          fetchSiteSettings(),
        ]);
        if (cancelled) return;
        setDepartments(depts);
        setAnnouncements(anns);
        setPosts(psts);
        setRegistrations(regs);
        setSettings(stgs);
      } catch (err) {
        console.error('AdminStore: failed to load data from Supabase', err);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ─── Departments ──────────────────────────────────────────────────────────
  const updateDepartment = useCallback(async (id: string, updates: Partial<Department>) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    const row = deptToRow(updates);
    if (Object.keys(row).length === 0) return;
    const { error } = await supabase.from('departments').update(row).eq('id', id);
    if (error) console.error('updateDepartment failed:', error.message);
  }, []);

  const updateDepartmentStat = useCallback(async (deptId: string, statIndex: number, value: number) => {
    let dept: Department | undefined;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          dept = { ...d, stats: d.stats.map((s, i) => (i === statIndex ? { ...s, value } : s)) };
          return dept;
        }
        return d;
      }),
    );
    if (dept) {
      const { error } = await supabase.from('departments').update({ stats: dept.stats }).eq('id', deptId);
      if (error) console.error('updateDepartmentStat failed:', error.message);
    }
  }, []);

  const updateDepartmentRequirements = useCallback(async (deptId: string, lang: keyof LocalizedName, value: string) => {
    let dept: Department | undefined;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          dept = { ...d, requirements: { ...d.requirements, [lang]: value } };
          return dept;
        }
        return d;
      }),
    );
    if (dept) {
      const { error } = await supabase.from('departments').update({ requirements: dept.requirements }).eq('id', deptId);
      if (error) console.error('updateDepartmentRequirements failed:', error.message);
    }
  }, []);

  const updateDepartmentTelegram = useCallback(async (deptId: string, chatId: string) => {
    setDepartments((prev) => prev.map((d) => (d.id === deptId ? { ...d, telegramChatId: chatId } : d)));
    const { error } = await supabase.from('departments').update({ telegram_chat_id: chatId }).eq('id', deptId);
    if (error) console.error('updateDepartmentTelegram failed:', error.message);
  }, []);

  const setRegistrationStatus = useCallback(async (slug: string, status: RegistrationStatus) => {
    setDepartments((prev) => prev.map((d) => (d.slug === slug ? { ...d, registrationStatus: status } : d)));
    const { error } = await supabase.from('departments').update({ registration_status: status }).eq('slug', slug);
    if (error) console.error('setRegistrationStatus failed:', error.message);
  }, []);

  // ─── Programs (nested in departments.programs jsonb) ───────────────────────
  const addProgram = useCallback(async (deptSlug: string, program: Omit<DepartmentProgram, 'id'>) => {
    let updatedPrograms: DepartmentProgram[] | null = null;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.slug === deptSlug) {
          updatedPrograms = [...d.programs, program];
          return { ...d, programs: updatedPrograms };
        }
        return d;
      }),
    );
    if (updatedPrograms) {
      const { error } = await supabase.from('departments').update({ programs: updatedPrograms }).eq('slug', deptSlug);
      if (error) console.error('addProgram failed:', error.message);
    }
  }, []);

  const updateProgram = useCallback(async (deptSlug: string, programIndex: number, updates: Partial<DepartmentProgram>) => {
    let updatedPrograms: DepartmentProgram[] | null = null;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.slug === deptSlug) {
          updatedPrograms = d.programs.map((p, i) => (i === programIndex ? { ...p, ...updates } : p));
          return { ...d, programs: updatedPrograms };
        }
        return d;
      }),
    );
    if (updatedPrograms) {
      const { error } = await supabase.from('departments').update({ programs: updatedPrograms }).eq('slug', deptSlug);
      if (error) console.error('updateProgram failed:', error.message);
    }
  }, []);

  const deleteProgram = useCallback(async (deptSlug: string, programIndex: number) => {
    let updatedPrograms: DepartmentProgram[] | null = null;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.slug === deptSlug) {
          updatedPrograms = d.programs.filter((_, i) => i !== programIndex);
          return { ...d, programs: updatedPrograms };
        }
        return d;
      }),
    );
    if (updatedPrograms) {
      const { error } = await supabase.from('departments').update({ programs: updatedPrograms }).eq('slug', deptSlug);
      if (error) console.error('deleteProgram failed:', error.message);
    }
  }, []);

  // ─── Announcements ─────────────────────────────────────────────────────────
  const addAnnouncement = useCallback(async (a: Omit<Announcement, 'id'>) => {
    const id = `ann-${Date.now()}`;
    const newAnn = { ...a, id };
    setAnnouncements((prev) => [newAnn, ...prev]);
    const row = { id, ...announcementToRow(a) };
    const { error } = await supabase.from('announcements').insert(row);
    if (error) console.error('addAnnouncement failed:', error.message);
  }, []);

  const updateAnnouncement = useCallback(async (id: string, updates: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    const row = announcementToRow(updates);
    if (Object.keys(row).length === 0) return;
    const { error } = await supabase.from('announcements').update(row).eq('id', id);
    if (error) console.error('updateAnnouncement failed:', error.message);
  }, []);

  const deleteAnnouncement = useCallback(async (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) console.error('deleteAnnouncement failed:', error.message);
  }, []);

  // ─── Posts ──────────────────────────────────────────────────────────────────
  const addPost = useCallback(async (p: Omit<Post, 'id'>) => {
    const id = `post-${Date.now()}`;
    const newPost = { ...p, id };
    setPosts((prev) => [newPost, ...prev]);
    const row = { id, ...postToRow(p) };
    const { error } = await supabase.from('posts').insert(row);
    if (error) console.error('addPost failed:', error.message);
  }, []);

  const updatePost = useCallback(async (id: string, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    const row = postToRow(updates);
    if (Object.keys(row).length === 0) return;
    const { error } = await supabase.from('posts').update(row).eq('id', id);
    if (error) console.error('updatePost failed:', error.message);
  }, []);

  const deletePost = useCallback(async (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) console.error('deletePost failed:', error.message);
  }, []);

  // ─── Registrations ──────────────────────────────────────────────────────────
  const updateRegistrationStatus = useCallback(async (id: string, status: Registration['status']) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (error) console.error('updateRegistrationStatus failed:', error.message);
  }, []);

  // ─── Site Settings ──────────────────────────────────────────────────────────
  const updateSettings = useCallback(async (updates: Partial<SiteSettings>) => {
    setSettings((prev) => (prev ? { ...prev, ...updates } : prev));
    const row = settingsToRow(updates);
    if (Object.keys(row).length === 0) return;
    const { error } = await supabase.from('site_settings').update(row).eq('id', 1);
    if (error) console.error('updateSettings failed:', error.message);
  }, []);

  // Provide a safe default for settings while loading
  const safeSettings: SiteSettings = settings ?? {
    heroTitle: { ar: '', en: '', am: '', om: '' },
    heroSubtitle: { ar: '', en: '', am: '', om: '' },
    contactEmail: '',
    contactLocation: { ar: '', en: '', am: '', om: '' },
    orgTelegram: '',
    developedBy: '',
    social: { telegram: '', whatsapp: '', facebook: '', tiktok: '' },
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
      </div>
    );
  }

  return (
    <AdminStoreContext.Provider
      value={{
        departments,
        announcements,
        posts,
        registrations,
        settings: safeSettings,
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
