# 🚀 Deployment Checklist - Supabase Integration

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [x] Supabase project created
- [x] Database schema executed (`supabase-schema.sql`)
- [x] Storage buckets created:
  - `profile-pictures`
  - `project-images`
  - `certificate-badges`
- [x] RLS policies enabled
- [x] Environment variables configured in `.env.local`

### 2. Code Migration
- [x] ProjectsContext migrated to Supabase
- [x] CertificatesContext migrated to Supabase
- [x] ProfileContext migrated to Supabase
- [x] AdminPanel updated for async operations
- [x] Hero component updated to use uploadProfilePicture
- [x] Error handling added to all operations
- [x] localStorage backup system in place

### 3. Local Testing

#### Test Projects
```bash
# Open admin panel and test:
- [ ] Add new project - verify it appears in Supabase dashboard
- [ ] Edit existing project - check updates in database
- [ ] Delete project - confirm removal from database
- [ ] Upload project image - verify file in Storage bucket
- [ ] Check browser console for errors
```

#### Test Certificates
```bash
# Test in certificates section:
- [ ] Add new certificate - verify in Supabase
- [ ] Edit certificate - check database updates
- [ ] Delete certificate - confirm removal
- [ ] Upload certificate badge - check Storage
```

#### Test Profile
```bash
# Test profile features:
- [ ] Update profile info - verify in database
- [ ] Upload profile picture - check Storage bucket
- [ ] Update skills - verify array storage
- [ ] Check data persists after page refresh
```

## 🌐 Vercel Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: Migrate to Supabase database with cloud storage"
git push origin main
```

### Step 2: Configure Vercel Environment Variables

Go to: `Vercel Dashboard → Your Project → Settings → Environment Variables`

Add these variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS (if using)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

**Important:** Make sure to:
- ✅ Apply to: Production, Preview, and Development
- ✅ Copy values exactly from your `.env.local`
- ✅ No quotes around values
- ✅ No spaces before/after `=`

### Step 3: Deploy
```bash
# Automatic deployment via GitHub push
# Or manual deployment:
vercel --prod
```

### Step 4: Verify Deployment

Visit your live site and check:
- [ ] Projects load from Supabase
- [ ] Certificates load from Supabase
- [ ] Profile loads from Supabase
- [ ] Admin panel works (if authenticated)
- [ ] No console errors
- [ ] Images load correctly
- [ ] Supabase dashboard shows activity

## 🔒 Security Checklist

### Supabase Security
- [ ] RLS policies enabled on all tables
- [ ] Storage buckets have proper access policies
- [ ] Anon key is used (not service role key)
- [ ] Database is not publicly writable
- [ ] Storage has file size limits

### Vercel Security
- [ ] Environment variables are set as secrets
- [ ] No sensitive data in code
- [ ] `.env.local` is in `.gitignore`
- [ ] API keys are not exposed in client code

## 📊 Post-Deployment Monitoring

### Check Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Check **Database → Tables** for data
4. Check **Storage** for uploaded files
5. Check **Logs** for any errors

### Test Production Features
```bash
# Test on live site:
- [ ] Add a test project
- [ ] Upload an image
- [ ] Edit the test project
- [ ] Delete the test project
- [ ] Check data appears in Supabase dashboard
- [ ] Verify images upload to Storage
```

## 🐛 Troubleshooting Production Issues

### Issue: "Failed to load data"
**Solutions:**
1. Check Vercel environment variables are set correctly
2. Verify Supabase URL and Anon Key are correct
3. Check Supabase project is active (not paused)
4. Look at Vercel function logs
5. Check Supabase logs for errors

### Issue: "Upload failed"
**Solutions:**
1. Verify Storage buckets exist in Supabase
2. Check RLS policies allow uploads
3. Ensure file size is under limit (50MB default)
4. Check file type is allowed
5. Verify bucket names match code: `profile-pictures`, `project-images`, `certificate-badges`

### Issue: "Data not saving"
**Solutions:**
1. Check RLS policies on tables
2. Verify database tables exist
3. Check Supabase logs for SQL errors
4. Ensure authenticated user has permissions
5. Test with Supabase SQL editor

### Issue: "CORS errors"
**Solutions:**
1. Verify Supabase URL is correct
2. Check NEXT_PUBLIC_ prefix on environment variables
3. Ensure domain is allowed in Supabase settings
4. Try clearing browser cache

## 📈 Performance Optimization

### Database
- [ ] Add indexes to frequently queried columns
- [ ] Enable database caching
- [ ] Monitor query performance in Supabase

### Storage
- [ ] Enable CDN for Storage buckets
- [ ] Set appropriate cache headers
- [ ] Compress images before upload
- [ ] Use image optimization

### Code
- [ ] Enable Next.js image optimization
- [ ] Use loading states during operations
- [ ] Implement pagination for large datasets
- [ ] Add error boundaries

## 💾 Backup Strategy

### Supabase Backups
- Automatic daily backups (Pro plan)
- Manual backup via SQL dump:
  ```sql
  pg_dump --host=db.xxx.supabase.co --port=5432 --username=postgres --dbname=postgres --schema=public > backup.sql
  ```

### Code Backups
- [ ] Code is on GitHub
- [ ] Multiple branches for stability
- [ ] Regular commits with clear messages
- [ ] Tagged releases for production

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ All data loads from Supabase
- ✅ File uploads work correctly
- ✅ CRUD operations function properly
- ✅ No console errors on production
- ✅ Data persists across sessions
- ✅ localStorage fallback works offline
- ✅ Admin features work (if authenticated)
- ✅ Performance is acceptable (<3s load time)

## 📚 Helpful Commands

### View Vercel Logs
```bash
vercel logs <deployment-url>
```

### Check Supabase Connection
```bash
# In browser console on your site:
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### Test Database Query
```sql
-- In Supabase SQL Editor:
SELECT * FROM profiles LIMIT 1;
SELECT * FROM projects LIMIT 5;
SELECT * FROM certificates LIMIT 5;
```

### Check Storage Buckets
```sql
-- In Supabase SQL Editor:
SELECT * FROM storage.buckets;
SELECT * FROM storage.objects LIMIT 10;
```

## 🎉 Deployment Complete!

Once all checkboxes are ticked:
1. Share your live portfolio URL
2. Monitor Supabase usage in dashboard
3. Check Vercel analytics
4. Celebrate! 🎊

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create an issue in your repo

**Free Tier Limits:**
- Supabase: 500MB database + 1GB storage
- Vercel: 100GB bandwidth + 100 hours build time
- Monitor usage in respective dashboards
