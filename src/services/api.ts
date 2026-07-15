import { departments as mockDepartments } from '../data/departments';
import { announcements as mockAnnouncements } from '../data/announcements';
import { posts as mockPosts } from '../data/posts';
import { testimonials as mockTestimonials, registrations as mockRegistrations, timelineEvents as mockTimeline, siteSettings as mockSettings } from '../data/misc';
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

// Simulate async API delay
const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

// Departments
export async function fetchDepartments(): Promise<Department[]> {
  await delay();
  return mockDepartments;
}

export async function fetchDepartmentBySlug(slug: string): Promise<Department | undefined> {
  await delay();
  return mockDepartments.find((d) => d.slug === slug);
}

// Announcements
export async function fetchAnnouncements(): Promise<Announcement[]> {
  await delay();
  return mockAnnouncements;
}

export async function fetchAnnouncementsByDepartment(slug: DepartmentSlug): Promise<Announcement[]> {
  await delay();
  return mockAnnouncements.filter((a) => a.departmentSlug === slug);
}

export async function fetchAnnouncementById(id: string): Promise<Announcement | undefined> {
  await delay();
  return mockAnnouncements.find((a) => a.id === id);
}

// Posts
export async function fetchPosts(): Promise<Post[]> {
  await delay();
  return mockPosts;
}

export async function fetchPostsByDepartment(slug: DepartmentSlug): Promise<Post[]> {
  await delay();
  return mockPosts.filter((p) => p.departmentSlug === slug);
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  await delay();
  return mockPosts.find((p) => p.id === id);
}

// Testimonials
export async function fetchTestimonials(): Promise<Testimonial[]> {
  await delay();
  return mockTestimonials;
}

// Registrations
export async function fetchRegistrations(): Promise<Registration[]> {
  await delay();
  return mockRegistrations;
}

export async function fetchRegistrationsByDepartment(slug: DepartmentSlug): Promise<Registration[]> {
  await delay();
  return mockRegistrations.filter((r) => r.departmentSlug === slug);
}

export async function submitRegistration(_data: Omit<Registration, 'id' | 'date' | 'status'>): Promise<{ success: boolean }> {
  await delay(300);
  return { success: true };
}

// Timeline
export async function fetchTimelineEvents(): Promise<TimelineEvent[]> {
  await delay();
  return mockTimeline;
}

// Settings
export async function fetchSiteSettings(): Promise<SiteSettings> {
  await delay();
  return mockSettings;
}
