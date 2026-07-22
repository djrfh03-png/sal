/*
# Add admin RLS policies for authenticated users

1. Purpose
- The public site already has read-only SELECT policies (anon + authenticated)
  on departments, announcements, posts, testimonials, timeline_events,
  site_settings, and INSERT-only on registrations.
- Now that Supabase Auth is wired up for the admin panel, authenticated
  admins need INSERT, UPDATE, and DELETE access on all content tables,
  plus SELECT and UPDATE on registrations (to review submissions).

2. Tables affected
- departments: add INSERT, UPDATE, DELETE for authenticated
- announcements: add INSERT, UPDATE, DELETE for authenticated
- posts: add INSERT, UPDATE, DELETE for authenticated
- testimonials: add INSERT, UPDATE, DELETE for authenticated
- timeline_events: add INSERT, UPDATE, DELETE for authenticated
- site_settings: add INSERT, UPDATE, DELETE for authenticated
- registrations: add SELECT, UPDATE for authenticated (anon keeps INSERT-only)

3. Security
- All new policies are scoped TO authenticated (admins who signed in).
- Public/anon policies from the initial migration remain unchanged.
- No ownership column needed — this is a single-admin app where any
  authenticated user is trusted to manage all content.
*/

-- ============ departments ============
DROP POLICY IF EXISTS "admin_insert_departments" ON departments;
CREATE POLICY "admin_insert_departments" ON departments
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_departments" ON departments;
CREATE POLICY "admin_update_departments" ON departments
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_departments" ON departments;
CREATE POLICY "admin_delete_departments" ON departments
  FOR DELETE TO authenticated USING (true);

-- ============ announcements ============
DROP POLICY IF EXISTS "admin_insert_announcements" ON announcements;
CREATE POLICY "admin_insert_announcements" ON announcements
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_announcements" ON announcements;
CREATE POLICY "admin_update_announcements" ON announcements
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_announcements" ON announcements;
CREATE POLICY "admin_delete_announcements" ON announcements
  FOR DELETE TO authenticated USING (true);

-- ============ posts ============
DROP POLICY IF EXISTS "admin_insert_posts" ON posts;
CREATE POLICY "admin_insert_posts" ON posts
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_posts" ON posts;
CREATE POLICY "admin_update_posts" ON posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_posts" ON posts;
CREATE POLICY "admin_delete_posts" ON posts
  FOR DELETE TO authenticated USING (true);

-- ============ testimonials ============
DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials
  FOR DELETE TO authenticated USING (true);

-- ============ registrations ============
DROP POLICY IF EXISTS "admin_select_registrations" ON registrations;
CREATE POLICY "admin_select_registrations" ON registrations
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_registrations" ON registrations;
CREATE POLICY "admin_update_registrations" ON registrations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- ============ timeline_events ============
DROP POLICY IF EXISTS "admin_insert_timeline_events" ON timeline_events;
CREATE POLICY "admin_insert_timeline_events" ON timeline_events
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_timeline_events" ON timeline_events;
CREATE POLICY "admin_update_timeline_events" ON timeline_events
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_timeline_events" ON timeline_events;
CREATE POLICY "admin_delete_timeline_events" ON timeline_events
  FOR DELETE TO authenticated USING (true);

-- ============ site_settings ============
DROP POLICY IF EXISTS "admin_insert_site_settings" ON site_settings;
CREATE POLICY "admin_insert_site_settings" ON site_settings
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_site_settings" ON site_settings;
CREATE POLICY "admin_update_site_settings" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_site_settings" ON site_settings;
CREATE POLICY "admin_delete_site_settings" ON site_settings
  FOR DELETE TO authenticated USING (true);
