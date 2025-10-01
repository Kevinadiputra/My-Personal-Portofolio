-- ============================================
-- KEVIN ADIPUTRA PORTFOLIO DATABASE SCHEMA
-- ============================================
-- Copy dan jalankan SQL ini di Supabase SQL Editor
-- Dashboard -> SQL Editor -> New Query

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============= PROFILES TABLE =============
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    bio TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    profile_picture TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default profile
INSERT INTO profiles (name, title, bio, email, phone, location)
VALUES (
    'Kevin Adiputra',
    'Full Stack Developer',
    'Full Stack Developer passionate about creating innovative web solutions and bringing ideas to life through clean, efficient code.',
    'kevinadiputra66@gmail.com',
    '+62 821 8185 7340',
    'Palembang, Indonesia'
) ON CONFLICT DO NOTHING;

-- ============= PROJECTS TABLE =============
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    technologies TEXT[] DEFAULT '{}',
    category VARCHAR(100) DEFAULT 'web',
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Insert sample projects
INSERT INTO projects (title, description, image, technologies, category, featured)
VALUES 
(
    'E-Commerce Platform',
    'Full-featured online shopping platform with payment integration',
    '/api/placeholder/400/300',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
    'web',
    true
),
(
    'Task Management App',
    'Collaborative task management tool with real-time updates',
    '/api/placeholder/400/300',
    ARRAY['Next.js', 'Firebase', 'Tailwind CSS'],
    'web',
    true
),
(
    'Weather Dashboard',
    'Real-time weather tracking application with beautiful UI',
    '/api/placeholder/400/300',
    ARRAY['React', 'OpenWeather API', 'Chart.js'],
    'web',
    false
) ON CONFLICT DO NOTHING;

-- ============= CERTIFICATES TABLE =============
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    platform VARCHAR(255) NOT NULL,
    date_issued DATE NOT NULL,
    verify_url TEXT,
    level VARCHAR(50) DEFAULT 'beginner',
    skills TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    badge TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_certificates_level ON certificates(level);
CREATE INDEX IF NOT EXISTS idx_certificates_featured ON certificates(featured);
CREATE INDEX IF NOT EXISTS idx_certificates_date_issued ON certificates(date_issued DESC);

-- Insert sample certificates
INSERT INTO certificates (title, issuer, platform, date_issued, level, skills, featured)
VALUES 
(
    'React Developer Certificate',
    'Meta',
    'Coursera',
    '2024-06-15',
    'professional',
    ARRAY['React', 'JavaScript', 'Web Development'],
    true
),
(
    'AWS Cloud Practitioner',
    'Amazon Web Services',
    'AWS Training',
    '2024-05-20',
    'intermediate',
    ARRAY['AWS', 'Cloud Computing', 'DevOps'],
    true
),
(
    'Python for Data Science',
    'IBM',
    'Coursera',
    '2024-04-10',
    'advanced',
    ARRAY['Python', 'Data Science', 'Machine Learning'],
    false
) ON CONFLICT DO NOTHING;

-- ============= STORAGE BUCKETS =============
-- Note: Buckets harus dibuat di Supabase Dashboard -> Storage
-- Buat bucket bernama 'images' dengan public access

-- ============= ROW LEVEL SECURITY (RLS) =============
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Public certificates are viewable by everyone" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can update profiles" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can delete profiles" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON certificates;

-- Public read access policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Public projects are viewable by everyone"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Public certificates are viewable by everyone"
    ON certificates FOR SELECT
    USING (true);

-- Admin write access policies (authenticated users only)
-- Note: Ganti dengan authentication yang sesuai jika diperlukan
CREATE POLICY "Authenticated users can insert profiles"
    ON profiles FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update profiles"
    ON profiles FOR UPDATE
    USING (true);

CREATE POLICY "Authenticated users can delete profiles"
    ON profiles FOR DELETE
    USING (true);

CREATE POLICY "Authenticated users can insert projects"
    ON projects FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
    ON projects FOR UPDATE
    USING (true);

CREATE POLICY "Authenticated users can delete projects"
    ON projects FOR DELETE
    USING (true);

CREATE POLICY "Authenticated users can insert certificates"
    ON certificates FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
    ON certificates FOR UPDATE
    USING (true);

CREATE POLICY "Authenticated users can delete certificates"
    ON certificates FOR DELETE
    USING (true);

-- ============= FUNCTIONS =============
-- Auto update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============= VIEWS =============
-- Featured items view
CREATE OR REPLACE VIEW featured_projects AS
SELECT * FROM projects WHERE featured = true ORDER BY order_index, created_at DESC;

CREATE OR REPLACE VIEW featured_certificates AS
SELECT * FROM certificates WHERE featured = true ORDER BY date_issued DESC;

-- ============================================
-- COMPLETE! Database schema siap digunakan
-- ============================================
-- Next steps:
-- 1. Buat storage bucket 'images' di Supabase Dashboard
-- 2. Set bucket menjadi public
-- 3. Update .env.local dengan Supabase credentials