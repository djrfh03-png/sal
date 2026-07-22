/*
# Create core tables for Dar Al-Quran website

1. New Tables
- `departments` — stores the 4 institution departments (center-hifz, school, halqa, charity).
  All localized fields (name, shortDescription, fullDescription, mission, vision, requirements)
  are stored as jsonb with {ar, en, am, om} keys. Nested structures (stats, programs, values,
  objectives, registrationFields, accentColor) are also jsonb. slug is a unique text column
  referenced by other tables.
- `announcements` — institution announcements. department_slug can be a real department slug
  or 'org' for org-level announcements, so it is NOT foreign-key constrained.
  Localized fields (title, excerpt, content) are jsonb.
- `posts` — media posts (image/video/article). department_slug references departments.slug.
  title and content are jsonb.
- `testimonials` — community testimonials. department_slug references departments.slug.
  role and quote are jsonb. name is plain text (can be in any language).
- `registrations` — public registration submissions. department_slug references departments.slug.
  status defaults to 'pending' (pending/reviewed/accepted/rejected).
- `timeline_events` — institution timeline milestones. title and description are jsonb.
- `site_settings` — single-row table for global site settings. heroTitle, heroSubtitle,
  contactLocation are jsonb. social is jsonb.

2. Security — Row Level Security
- RLS enabled on ALL tables.
- Public SELECT (TO anon, authenticated) on: departments, announcements, posts,
  testimonials, timeline_events, site_settings.
- Public INSERT only (no select/update/delete) on: registrations.
- No public write access on any other table.
- Admin (authenticated) policies will be added in a later migration after auth setup.

3. Important Notes
- All tables have created_at timestamps defaulting to now().
- departments.slug is unique text, used as the foreign key target by posts, testimonials,
  and registrations. announcements.department_slug is plain text (not FK) because it can
  be 'org' which doesn't exist in departments.
- registrations uses a text id (e.g. 'reg-1') for compatibility with existing data.
  Other tables also use text ids for the same reason.
- site_settings is constrained to a single row via a unique index on a boolean lock column.
*/

-- ============ departments ============
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name jsonb NOT NULL,
  short_description jsonb NOT NULL,
  full_description jsonb NOT NULL,
  mission jsonb NOT NULL,
  vision jsonb NOT NULL,
  values jsonb NOT NULL DEFAULT '[]'::jsonb,
  objectives jsonb NOT NULL DEFAULT '[]'::jsonb,
  established_date text NOT NULL,
  logo_key text NOT NULL,
  cover_image_key text NOT NULL,
  cover_image text NOT NULL,
  accent_color jsonb NOT NULL,
  stats jsonb NOT NULL DEFAULT '[]'::jsonb,
  programs jsonb NOT NULL DEFAULT '[]'::jsonb,
  telegram_link text NOT NULL,
  telegram_chat_id text NOT NULL,
  registration_status text NOT NULL DEFAULT 'open',
  registration_fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_departments" ON departments;
CREATE POLICY "public_select_departments" ON departments
  FOR SELECT TO anon, authenticated USING (true);

-- ============ announcements ============
CREATE TABLE IF NOT EXISTS announcements (
  id text PRIMARY KEY,
  title jsonb NOT NULL,
  department_slug text NOT NULL,
  date text NOT NULL,
  image text NOT NULL DEFAULT '',
  excerpt jsonb NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_announcements" ON announcements;
CREATE POLICY "public_select_announcements" ON announcements
  FOR SELECT TO anon, authenticated USING (true);

-- ============ posts ============
CREATE TABLE IF NOT EXISTS posts (
  id text PRIMARY KEY,
  type text NOT NULL,
  department_slug text NOT NULL REFERENCES departments(slug) ON DELETE CASCADE,
  title jsonb NOT NULL,
  media text NOT NULL DEFAULT '',
  content jsonb NOT NULL,
  date text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_posts" ON posts;
CREATE POLICY "public_select_posts" ON posts
  FOR SELECT TO anon, authenticated USING (true);

-- ============ testimonials ============
CREATE TABLE IF NOT EXISTS testimonials (
  id text PRIMARY KEY,
  name text NOT NULL,
  role jsonb NOT NULL,
  quote jsonb NOT NULL,
  department_slug text NOT NULL REFERENCES departments(slug) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_testimonials" ON testimonials;
CREATE POLICY "public_select_testimonials" ON testimonials
  FOR SELECT TO anon, authenticated USING (true);

-- ============ registrations ============
CREATE TABLE IF NOT EXISTS registrations (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name text NOT NULL,
  phone text NOT NULL,
  age integer,
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  department_slug text NOT NULL REFERENCES departments(slug) ON DELETE CASCADE,
  date text NOT NULL DEFAULT to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD'),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT registrations_status_check CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected'))
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Public INSERT only — no select/update/delete for anon
DROP POLICY IF EXISTS "public_insert_registrations" ON registrations;
CREATE POLICY "public_insert_registrations" ON registrations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ============ timeline_events ============
CREATE TABLE IF NOT EXISTS timeline_events (
  id text PRIMARY KEY,
  year text NOT NULL,
  title jsonb NOT NULL,
  description jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_timeline_events" ON timeline_events;
CREATE POLICY "public_select_timeline_events" ON timeline_events
  FOR SELECT TO anon, authenticated USING (true);

-- ============ site_settings ============
CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  hero_title jsonb NOT NULL,
  hero_subtitle jsonb NOT NULL,
  contact_email text NOT NULL,
  contact_location jsonb NOT NULL,
  org_telegram text NOT NULL,
  developed_by text NOT NULL,
  social jsonb NOT NULL,
  is_single_row boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_single_row CHECK (id = 1 AND is_single_row = true)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_site_settings" ON site_settings;
CREATE POLICY "public_select_site_settings" ON site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- ============ Indexes ============
CREATE INDEX IF NOT EXISTS idx_announcements_dept_slug ON announcements(department_slug);
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_dept_slug ON posts(department_slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_dept_slug ON testimonials(department_slug);
CREATE INDEX IF NOT EXISTS idx_registrations_dept_slug ON registrations(department_slug);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
