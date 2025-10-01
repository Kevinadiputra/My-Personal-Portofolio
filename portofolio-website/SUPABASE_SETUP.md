# 🚀 SETUP GUIDE - Supabase Database Integration

## 📋 Prerequisites
- Account Supabase (gratis di https://supabase.com)
- Node.js installed
- Portfolio project

## 🔧 Step-by-Step Setup

### 1️⃣ Buat Supabase Project

1. Kunjungi https://supabase.com/dashboard
2. Klik **"New Project"**
3. Isi informasi:
   - **Name**: Kevin Portfolio DB
   - **Database Password**: (simpan password ini!)
   - **Region**: Singapore (terdekat dengan Indonesia)
   - **Pricing Plan**: Free (500MB database + 1GB storage)
4. Klik **"Create new project"**
5. Tunggu ~2 menit untuk project setup

### 2️⃣ Setup Database Schema

**Option A: First Time Setup (Recommended)**
1. Di Supabase Dashboard, buka **"SQL Editor"**
2. Klik **"New Query"**
3. Copy semua isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan muncul sukses message

**Option B: Reset & Rebuild (Jika ada error "already exists")**
1. Buka **"SQL Editor"**
2. Klik **"New Query"**
3. Copy isi file `supabase-reset.sql`
4. Paste dan **"Run"** (ini akan hapus semua data!)
5. Kemudian jalankan `supabase-schema.sql` seperti Option A

**Note**: Schema sudah di-update dengan `DROP IF EXISTS` jadi aman untuk di-run ulang

### 3️⃣ Setup Storage Bucket

1. Buka **"Storage"** di sidebar
2. Klik **"Create a new bucket"**
3. Isi informasi:
   - **Name**: `images`
   - **Public bucket**: ✅ CENTANG INI (penting!)
4. Klik **"Create bucket"**
5. Bucket sudah siap untuk menyimpan gambar

### 4️⃣ Get API Credentials

1. Buka **"Settings"** -> **"API"**
2. Copy dua nilai ini:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (key panjang)

### 5️⃣ Setup Environment Variables

1. Di root project, buat file `.env.local`
2. Copy isi dari `.env.local.example`
3. Replace dengan credentials Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Save file

### 6️⃣ Update Context untuk menggunakan Supabase

#### ProjectsContext.jsx
```javascript
import { projectService } from '@/lib/supabase';

// Ganti localStorage dengan Supabase
const { projects } = useCertificates();
const [loading, setLoading] = useState(true);

useEffect(() => {
    loadProjects();
}, []);

const loadProjects = async () => {
    try {
        const data = await projectService.getAllProjects();
        setProjects(data);
    } catch (error) {
        console.error('Error loading projects:', error);
    } finally {
        setLoading(false);
    }
};

const addProject = async (project) => {
    try {
        const newProject = await projectService.addProject(project);
        setProjects([...projects, newProject]);
        return newProject;
    } catch (error) {
        console.error('Error adding project:', error);
    }
};
```

#### CertificatesContext.jsx
```javascript
import { certificateService } from '@/lib/supabase';

// Similar pattern seperti ProjectsContext
```

#### ProfileContext.jsx
```javascript
import { profileService } from '@/lib/supabase';

// Similar pattern
```

### 7️⃣ Test Database Connection

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Buka browser console (F12)
3. Check for errors
4. Test CRUD operations:
   - Add new project
   - Update project
   - Delete project
   - Upload image

### 8️⃣ Deploy ke Vercel

1. Di Vercel Dashboard, buka project settings
2. Go to **"Environment Variables"**
3. Add variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy project

## 🎯 Database Structure

### Tables
- **profiles**: Profile information
- **projects**: All projects with images
- **certificates**: Certificates with badges

### Storage
- **images/profiles/**: Profile pictures
- **images/projects/**: Project screenshots
- **images/certificates/**: Certificate badges

## 📊 Features

✅ **Database Features:**
- Real-time updates
- Auto-backup
- SQL queries
- Row Level Security (RLS)
- Automatic timestamps

✅ **Storage Features:**
- 1GB free storage
- CDN delivery
- Image optimization
- Public/private buckets
- Direct upload

## 🔒 Security

- RLS (Row Level Security) enabled
- Public read access
- Write access untuk authenticated users
- Secure API keys
- HTTPS encryption

## 📱 Monitoring

Di Supabase Dashboard:
- **Database**: View tables, run queries
- **Storage**: Browse files
- **Logs**: Check errors
- **API Docs**: Generated automatically

## 🆘 Troubleshooting

### Error: "Policy already exists" or "Trigger already exists"
- Jalankan `supabase-reset.sql` terlebih dahulu
- Atau: Update schema sudah include `DROP IF EXISTS`
- Jalankan ulang `supabase-schema.sql`

### Error: "Failed to fetch"
- Check Supabase URL dan API key
- Verify RLS policies
- Check network connection

### Error: "Storage bucket not found"
- Create 'images' bucket
- Set bucket to public
- Check bucket permissions

### Images not uploading
- Verify bucket is public
- Check file size (max 50MB)
- Check file format (jpg, png, webp)

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## 🎉 Done!

Database dan storage sudah siap digunakan!
Sekarang semua data akan tersimpan di cloud, bukan localStorage.