import { supabase } from '../lib/supabaseClient';
import type {
  Department,
  DepartmentSlug,
  Announcement,
  Post,
  Testimonial,
  Registration,
  TimelineEvent,
  SiteSettings,
} from '../types';

// ─── Row types (snake_case from DB) ───────────────────────────────────────

interface DepartmentRow {
  id: string;
  slug: string;
  name: Department['name'];
  short_description: Department['shortDescription'];
  full_description: Department['fullDescription'];
  mission: Department['mission'];
  vision: Department['vision'];
  values: Department['values'];
  objectives: Department['objectives'];
  established_date: string;
  logo_key: string;
  cover_image_key: string;
  cover_image: string;
  accent_color: Department['accentColor'];
  stats: Department['stats'];
  programs: Department['programs'];
  telegram_link: string;
  telegram_chat_id: string;
  registration_status: Department['registrationStatus'];
  registration_fields: Department['registrationFields'];
  requirements: Department['requirements'];
}

interface AnnouncementRow {
  id: string;
  title: Announcement['title'];
  department_slug: Announcement['departmentSlug'];
  date: string;
  image: string;
  excerpt: Announcement['excerpt'];
  content: Announcement['content'];
}

interface PostRow {
  id: string;
  type: Post['type'];
  department_slug: Post['departmentSlug'];
  title: Post['title'];
  media: string;
  content: Post['content'];
  date: string;
}

interface TestimonialRow {
  id: string;
  name: string;
  role: Testimonial['role'];
  quote: Testimonial['quote'];
  department_slug: Testimonial['departmentSlug'];
}

interface RegistrationRow {
  id: string;
  full_name: string;
  phone: string;
  age: number | null;
  email: string;
  address: string;
  notes: string;
  department_slug: DepartmentSlug;
  date: string;
  status: Registration['status'];
  custom_fields: Record<string, string>;
}

interface TimelineRow {
  id: string;
  year: string;
  title: TimelineEvent['title'];
  description: TimelineEvent['description'];
}

interface SiteSettingsRow {
  id: number;
  hero_title: SiteSettings['heroTitle'];
  hero_subtitle: SiteSettings['heroSubtitle'];
  hero_image: string;
  contact_email: string;
  contact_location: SiteSettings['contactLocation'];
  org_telegram: string;
  developed_by: string;
  social: SiteSettings['social'];
}

// ─── Mappers ──────────────────────────────────────────────────────────────

function mapDepartment(r: DepartmentRow): Department {
  return {
    id: r.id,
    slug: r.slug as DepartmentSlug,
    name: r.name,
    shortDescription: r.short_description,
    fullDescription: r.full_description,
    mission: r.mission,
    vision: r.vision,
    values: r.values ?? [],
    objectives: r.objectives ?? [],
    establishedDate: r.established_date,
    logoKey: r.logo_key,
    coverImageKey: r.cover_image_key,
    coverImage: r.cover_image,
    accentColor: r.accent_color,
    stats: r.stats ?? [],
    programs: r.programs ?? [],
    telegramLink: r.telegram_link,
    telegramChatId: r.telegram_chat_id,
    registrationStatus: r.registration_status as Department['registrationStatus'],
    registrationFields: r.registration_fields ?? [],
    requirements: r.requirements,
  };
}

function mapAnnouncement(r: AnnouncementRow): Announcement {
  return {
    id: r.id,
    title: r.title,
    departmentSlug: r.department_slug as Announcement['departmentSlug'],
    date: r.date,
    image: r.image,
    excerpt: r.excerpt,
    content: r.content,
  };
}

function mapPost(r: PostRow): Post {
  return {
    id: r.id,
    type: r.type,
    departmentSlug: r.department_slug as Post['departmentSlug'],
    title: r.title,
    media: r.media,
    content: r.content,
    date: r.date,
  };
}

function mapTestimonial(r: TestimonialRow): Testimonial {
  return {
    id: r.id,
    name: r.name,
    role: r.role,
    quote: r.quote,
    departmentSlug: r.department_slug as Testimonial['departmentSlug'],
  };
}

function mapRegistration(r: RegistrationRow): Registration {
  return {
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    age: r.age,
    email: r.email,
    address: r.address,
    notes: r.notes,
    departmentSlug: r.department_slug,
    date: r.date,
    status: r.status,
    customFields: r.custom_fields ?? {},
  };
}

function mapTimeline(r: TimelineRow): TimelineEvent {
  return {
    id: r.id,
    year: r.year,
    title: r.title,
    description: r.description,
  };
}

function mapSettings(r: SiteSettingsRow): SiteSettings {
  return {
    heroTitle: r.hero_title,
    heroSubtitle: r.hero_subtitle,
    heroImage: r.hero_image ?? '',
    contactEmail: r.contact_email,
    contactLocation: r.contact_location,
    orgTelegram: r.org_telegram,
    developedBy: r.developed_by,
    social: r.social,
  };
}

// ─── API functions ────────────────────────────────────────────────────────

export async function fetchDepartments(): Promise<Department[]> {
  const { data, error } = await supabase.from('departments').select('*');
  if (error) throw error;
  return (data as DepartmentRow[]).map(mapDepartment);
}

export async function fetchDepartmentBySlug(slug: string): Promise<Department | undefined> {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapDepartment(data as DepartmentRow) : undefined;
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as AnnouncementRow[]).map(mapAnnouncement);
}

export async function fetchAnnouncementsByDepartment(slug: DepartmentSlug): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('department_slug', slug)
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as AnnouncementRow[]).map(mapAnnouncement);
}

export async function fetchAnnouncementById(id: string): Promise<Announcement | undefined> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapAnnouncement(data as AnnouncementRow) : undefined;
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as PostRow[]).map(mapPost);
}

export async function fetchPostsByDepartment(slug: DepartmentSlug): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('department_slug', slug)
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as PostRow[]).map(mapPost);
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapPost(data as PostRow) : undefined;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) throw error;
  return (data as TestimonialRow[]).map(mapTestimonial);
}

export async function fetchRegistrations(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as RegistrationRow[]).map(mapRegistration);
}

export async function fetchRegistrationsByDepartment(slug: DepartmentSlug): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('department_slug', slug)
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as RegistrationRow[]).map(mapRegistration);
}

export async function submitRegistration(
  data: Omit<Registration, 'id' | 'date' | 'status'>,
): Promise<{ success: boolean }> {
  const row = {
    full_name: data.fullName,
    phone: data.phone,
    age: data.age,
    email: data.email,
    address: data.address,
    notes: data.notes,
    department_slug: data.departmentSlug,
    custom_fields: data.customFields ?? {},
  };
  const { error } = await supabase.from('registrations').insert(row);
  if (error) throw error;
  return { success: true };
}

export async function fetchTimelineEvents(): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .order('year', { ascending: true });
  if (error) throw error;
  return (data as TimelineRow[]).map(mapTimeline);
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Site settings not found');
  return mapSettings(data as SiteSettingsRow);
}
