-- ============================================
-- KEVIN ADIPUTRA PORTFOLIO - RESET DATABASE
-- ============================================
-- Jalankan script ini jika ingin reset database dari awal
-- WARNING: Ini akan menghapus semua data yang ada!

-- Drop existing tables (CASCADE akan drop semua dependencies)
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;

-- Drop existing views
DROP VIEW IF EXISTS featured_projects;
DROP VIEW IF EXISTS featured_certificates;

-- Drop existing function
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Sekarang jalankan supabase-schema.sql untuk membuat ulang semua table