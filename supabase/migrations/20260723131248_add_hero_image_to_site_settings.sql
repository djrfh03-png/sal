-- Add hero_image column to site_settings for org-level photo management
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_image text NOT NULL DEFAULT '';
