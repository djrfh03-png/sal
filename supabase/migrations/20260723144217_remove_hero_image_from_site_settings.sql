-- Remove hero_image column since we no longer use photos in heroes
ALTER TABLE site_settings DROP COLUMN IF EXISTS hero_image;
