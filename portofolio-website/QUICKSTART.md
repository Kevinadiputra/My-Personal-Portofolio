# 🎯 Quick Start - Supabase Integration

## ⚡ 3 Menit Setup

### 1. Daftar Supabase (2 menit)
```
1. Buka https://supabase.com
2. Sign up dengan GitHub/Email
3. Buat project baru (pilih region Singapore)
4. Tunggu setup selesai
```

### 2. Setup Database (30 detik)
```
1. Dashboard -> SQL Editor
2. Copy paste isi file: supabase-schema.sql
3. Klik "Run"
4. Done! ✅
```

### 3. Setup Storage (30 detik)
```
1. Dashboard -> Storage
2. Create bucket: "images"
3. ✅ Centang "Public bucket"
4. Create
```

### 4. Get Credentials (30 detik)
```
1. Settings -> API
2. Copy "Project URL"
3. Copy "anon public" key
```

### 5. Setup Local (30 detik)
```bash
# Create .env.local file
NEXT_PUBLIC_SUPABASE_URL=paste_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_key_here
```

### 6. Test Connection (30 detik)
```bash
npm run dev
```

Buka browser, check console - no errors = success! 🎉

## 🚀 Ready to Use!

Database sudah include sample data:
- ✅ 3 sample projects
- ✅ 3 sample certificates  
- ✅ Default profile

Tinggal edit langsung dari admin panel!

## 📖 Full Documentation

Lihat `SUPABASE_SETUP.md` untuk detail lengkap.

## 🆘 Need Help?

1. Check console untuk errors
2. Verify URL dan key di .env.local
3. Pastikan bucket "images" is public
4. Check RLS policies di Supabase Dashboard

## 🎁 Benefits

✨ **Gratis Forever**
- 500MB database
- 1GB file storage
- Unlimited API requests (fair use)

✨ **Features**
- Auto backup
- Real-time sync
- CDN for images
- SQL queries
- Easy scaling

## 🔄 Migration from localStorage

Existing data will be kept in localStorage.
New data will be saved to Supabase.
Easy migration tool coming soon!

---

**Total setup time: ~5 minutes** ⏱️