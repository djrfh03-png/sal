/*
# Add custom_fields to registrations + DELETE policy for admins

1. Purpose
- Registration forms capture dynamic fields per department (gradeLevel,
  studyTopic, aidType, hifzLevel, guardianName, etc.) but only 6 hardcoded
  fields were persisted. Add a jsonb custom_fields column to store all
  submitted field values.
- Admins need DELETE on registrations to remove spam/test entries.

2. Changes
- ALTER TABLE registrations ADD COLUMN custom_fields jsonb DEFAULT '{}'
- Add admin_delete_registrations policy for authenticated
- Update RegistrationRow type and submitRegistration in api.ts to follow
*/

ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS custom_fields jsonb NOT NULL DEFAULT '{}'::jsonb;

DROP POLICY IF EXISTS "admin_delete_registrations" ON registrations;
CREATE POLICY "admin_delete_registrations" ON registrations
  FOR DELETE TO authenticated USING (true);
