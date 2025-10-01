# 🚀 Quick Reference Card

## Essential Commands

```bash
# Development
npm run dev          # Start local server at localhost:3000

# Deployment
git add .
git commit -m "feat: Supabase integration"
git push origin main # Auto-deploys to Vercel

# Testing
npm run build        # Test production build
npm start            # Run production locally
```

## File Structure

```
📁 Your Portfolio
├── 📁 lib/
│   └── supabase.js              ← All Supabase services
├── 📁 hooks/
│   └── useSupabase.js           ← Custom React hooks
├── 📁 context/
│   ├── ProfileContext.jsx       ← Profile management
│   ├── ProjectsContext.jsx      ← Projects CRUD
│   └── CertificatesContext.jsx  ← Certificates CRUD
├── 📄 supabase-schema.sql       ← Run this in Supabase SQL Editor
├── 📄 .env.local                ← Your secrets (DO NOT COMMIT)
└── 📄 .env.local.example        ← Template for env vars
```

## Environment Variables

```bash
# .env.local (required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Context Providers Usage

### Projects
```javascript
import { useProjects } from '@/context/ProjectsContext';

const { projects, addProject, updateProject, deleteProject, uploadProjectImage, error } = useProjects();

// All operations are now async!
await addProject({ title: "My Project" });
const url = await uploadProjectImage(file);
```

### Certificates
```javascript
import { useCertificates } from '@/context/CertificatesContext';

const { certificates, addCertificate, uploadCertificateBadge, error } = useCertificates();

await addCertificate({ title: "My Cert" });
const url = await uploadCertificateBadge(file);
```

### Profile
```javascript
import { useProfile } from '@/context/ProfileContext';

const { profile, updateProfile, uploadProfilePicture, error } = useProfile();

await updateProfile({ name: "New Name" });
const url = await uploadProfilePicture(file);
```

## Database Schema

```sql
profiles
├── id (uuid, primary key)
├── name (text)
├── title (text)
├── bio (text)
├── profile_picture (text)
├── email (text)
├── skills (text[])
├── created_at (timestamp)
└── updated_at (timestamp)

projects
├── id (uuid, primary key)
├── title (text)
├── description (text)
├── image (text)
├── technologies (text[])
├── github (text)
├── demo (text)
├── created_at (timestamp)
└── updated_at (timestamp)

certificates
├── id (uuid, primary key)
├── title (text)
├── organization (text)
├── date_issued (date)
├── skills (text[])
├── badge_url (text)
├── verify_url (text)
├── created_at (timestamp)
└── updated_at (timestamp)
```

## Storage Buckets

```
profile-pictures/     ← Profile images
project-images/       ← Project screenshots
certificate-badges/   ← Certificate badges

All are public, max 50MB per file
```

## Common Tasks

### 1. Reset Database
```sql
-- In Supabase SQL Editor, run:
-- Use supabase-reset.sql file
```

### 2. Add Environment Variables to Vercel
```
Vercel Dashboard → Project → Settings → Environment Variables
Add: NEXT_PUBLIC_SUPABASE_URL
Add: NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 3. Test Supabase Connection
```javascript
// In browser console on localhost:3000
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// Should show your Supabase URL
```

### 4. Check Database Data
```sql
-- In Supabase SQL Editor
SELECT * FROM projects;
SELECT * FROM certificates;
SELECT * FROM profiles;
```

### 5. View Uploaded Files
```
Supabase Dashboard → Storage → project-images
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Supabase URL undefined" | Restart dev server: `npm run dev` |
| "Policy violation" | Run `supabase-schema.sql` again |
| "Upload failed" | Check bucket exists in Storage |
| "Data not saving" | Check Supabase logs for errors |
| "CORS error" | Verify NEXT_PUBLIC_ prefix on env vars |

## Important Notes

⚠️ **Always use async/await** with CRUD operations:
```javascript
// ✅ Correct
await addProject(data);

// ❌ Wrong
addProject(data);  // Won't wait for completion
```

⚠️ **Check for errors** after operations:
```javascript
const { error } = useProjects();

if (error) {
  console.error('Error:', error);
}
```

⚠️ **All operations save to localStorage as backup** automatically

## Documentation Quick Links

| Document | Purpose |
|----------|---------|
| QUICKSTART.md | 3-minute setup |
| SUPABASE_SETUP.md | Full database setup |
| DATABASE_README.md | API reference |
| MIGRATION_COMPLETE.md | Code changes guide |
| TESTING_GUIDE.md | Local testing |
| DEPLOYMENT_CHECKLIST.md | Deploy to production |
| ARCHITECTURE.md | System diagrams |
| SUMMARY.md | Complete overview |

## Supabase Dashboard Links

```
Main Dashboard:    https://supabase.com/dashboard
SQL Editor:        Dashboard → SQL Editor
Table Editor:      Dashboard → Table Editor
Storage:           Dashboard → Storage
Logs:              Dashboard → Logs
Settings:          Dashboard → Settings → API
```

## Free Tier Limits

| Resource | Limit |
|----------|-------|
| Database | 500 MB |
| Storage | 1 GB |
| Bandwidth | 2 GB/month |
| API Requests | Unlimited |
| Backups | 7 days retention |

**More than enough for your portfolio! 🎉**

## Success Checklist

Before considering done:
- [ ] Database tables created
- [ ] Storage buckets created
- [ ] Environment variables set
- [ ] Tested locally
- [ ] All CRUD operations work
- [ ] Images upload successfully
- [ ] Deployed to Vercel
- [ ] Tested in production
- [ ] No console errors

---

**Keep this card handy for quick reference! 📌**
