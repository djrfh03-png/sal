export type DepartmentSlug = 'center-hifz' | 'school' | 'halqa' | 'charity';
export type RegistrationStatus = 'open' | 'closed' | 'coming_soon';
export type PostType = 'image' | 'video' | 'article';

export interface LocalizedName {
  ar: string;
  en: string;
  am: string;
  om: string;
}

export interface DepartmentStat {
  label: LocalizedName;
  value: number;
}

export interface DepartmentProgram {
  name: LocalizedName;
  description?: LocalizedName;
}

export interface RegistrationField {
  name: string;
  label: LocalizedName;
  type: 'text' | 'tel' | 'email' | 'number' | 'textarea' | 'select';
  required: boolean;
  placeholder?: LocalizedName;
  options?: LocalizedName[];
}

export interface Department {
  id: string;
  slug: DepartmentSlug;
  name: LocalizedName;
  shortDescription: LocalizedName;
  fullDescription: LocalizedName;
  mission: LocalizedName;
  vision: LocalizedName;
  values: LocalizedName[];
  objectives: LocalizedName[];
  establishedDate: string;
  logoKey: string;
  coverImageKey: string;
  accentColor: {
    base: string;
    accent: string;
    heart?: string;
  };
  stats: DepartmentStat[];
  programs: DepartmentProgram[];
  telegramLink: string;
  registrationStatus: RegistrationStatus;
  registrationFields: RegistrationField[];
}

export interface Announcement {
  id: string;
  title: LocalizedName;
  departmentSlug: DepartmentSlug;
  date: string;
  image: string;
  excerpt: LocalizedName;
  content: LocalizedName;
}

export interface Post {
  id: string;
  type: PostType;
  departmentSlug: DepartmentSlug;
  title: LocalizedName;
  media: string;
  content: LocalizedName;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: LocalizedName;
  quote: LocalizedName;
  departmentSlug: DepartmentSlug;
}

export interface Registration {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  email: string;
  address: string;
  notes: string;
  departmentSlug: DepartmentSlug;
  date: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: LocalizedName;
  description: LocalizedName;
}

export interface SiteSettings {
  heroTitle: LocalizedName;
  heroSubtitle: LocalizedName;
  contactEmail: string;
  contactLocation: LocalizedName;
  orgTelegram: string;
  developedBy: string;
}
