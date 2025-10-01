# 🧪 Local Testing Guide - Supabase Integration

This guide will help you test the Supabase integration locally before deploying.

## Prerequisites

✅ You should have:
1. ✅ Supabase project created
2. ✅ Database schema executed
3. ✅ Storage buckets created
4. ✅ `.env.local` file configured with your keys

## Testing Checklist

### 1️⃣ Test Database Connection

Open browser console and run:

```javascript
// On your localhost:3000
// Open browser DevTools (F12) → Console

// Test Supabase connection
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// If both show values, connection is configured! ✅
```

### 2️⃣ Test Projects Context

#### Add a Project
1. Open your portfolio at `http://localhost:3000`
2. Navigate to Admin Panel (if you have authentication)
3. Click "Add New Project"
4. Fill in the form:
   - Title: "Test Project"
   - Description: "Testing Supabase integration"
   - Technologies: "React, Next.js, Supabase"
   - Image URL: (any image URL or upload)
5. Click "Save"
6. **Check Browser Console** - Should see: No errors
7. **Check Supabase Dashboard**:
   - Go to Table Editor → `projects`
   - Should see your new project ✅

#### Edit a Project
1. Click "Edit" on any project
2. Change the title to "Test Project (Updated)"
3. Click "Save"
4. **Check Browser Console** - Should see: No errors
5. **Check Supabase Dashboard**:
   - Refresh the `projects` table
   - Should see updated data ✅

#### Delete a Project
1. Click "Delete" on the test project
2. Confirm deletion
3. **Check Browser Console** - Should see: No errors
4. **Check Supabase Dashboard**:
   - Refresh the `projects` table
   - Project should be gone ✅

#### Upload Project Image
1. Add or edit a project
2. Upload an image file
3. **Check Browser Console** - Should see upload progress
4. **Check Supabase Dashboard**:
   - Go to Storage → `project-images`
   - Should see your uploaded file ✅

### 3️⃣ Test Certificates Context

#### Add a Certificate
1. Navigate to Certificates management
2. Add a new certificate:
   - Title: "Test Certificate"
   - Organization: "Test Org"
   - Date: "2024-01"
   - Skills: "Testing, Supabase"
3. Click "Save"
4. **Check Browser Console** - No errors
5. **Check Supabase Dashboard**:
   - Table Editor → `certificates`
   - Should see new certificate ✅

#### Upload Certificate Badge
1. Edit or add a certificate
2. Upload a badge image
3. **Check Storage** → `certificate-badges` ✅

### 4️⃣ Test Profile Context

#### Update Profile
1. Go to your profile section
2. Click edit profile (if available)
3. Update any information
4. Save changes
5. **Check Supabase Dashboard**:
   - Table Editor → `profiles`
   - Should see updated data ✅

#### Upload Profile Picture
1. Click on profile picture
2. Upload a new image
3. **Check Storage** → `profile-pictures` ✅
4. **Check in UI** - Profile picture should update immediately

### 5️⃣ Test Error Handling

#### Test Offline Mode
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try to add/edit/delete something
4. **Expected behavior:**
   - Should show error notification
   - Should fallback to localStorage
   - Data should persist locally ✅

#### Test Invalid Data
1. Try to add a project with empty title
2. Try to upload a very large file (>50MB)
3. **Expected behavior:**
   - Should show validation errors
   - Should not crash the app ✅

### 6️⃣ Test Data Persistence

#### Test Refresh
1. Add a project
2. Refresh the page (F5)
3. **Expected:** Project should still be there ✅

#### Test Tab Close/Reopen
1. Add a project
2. Close the browser tab
3. Reopen `http://localhost:3000`
4. **Expected:** Data loads from Supabase ✅

## 🔍 Debugging Tips

### Check Browser Console

Look for these messages:

**✅ Good:**
```
Loading projects from Supabase...
Projects loaded successfully
Profile loaded from Supabase
```

**❌ Bad:**
```
Error loading from Supabase: [error message]
Falling back to localStorage
```

If you see errors, check:
1. `.env.local` has correct values
2. Supabase project is active
3. Tables exist in database
4. RLS policies are set correctly

### Check Network Tab

1. Open DevTools → Network tab
2. Filter by "supabase"
3. Try adding a project
4. **You should see:**
   - POST request to Supabase
   - Status code: 201 (Created)
   - Response with created data

### Check Supabase Logs

1. Go to Supabase Dashboard
2. Click "Logs" in sidebar
3. Select "Database"
4. **Look for:**
   - SQL queries being executed
   - Any error messages
   - Successful INSERT/UPDATE/DELETE operations

### Check Local Storage (Backup)

1. DevTools → Application tab → Local Storage
2. Look for keys:
   - `portfolio-projects`
   - `portfolio-certificates`
   - `user_profile`
3. **Should contain:** Backup copies of your data

## 🎯 Success Criteria

Your local integration is working if:

- ✅ Projects can be added, edited, deleted
- ✅ Certificates can be managed
- ✅ Profile can be updated
- ✅ Images upload successfully
- ✅ Data appears in Supabase dashboard
- ✅ No console errors (except fallback warnings)
- ✅ Data persists after refresh
- ✅ Offline mode falls back to localStorage

## 🐛 Common Issues & Solutions

### Issue: "Supabase URL is undefined"
**Solution:**
```bash
# Make sure .env.local exists with:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Restart the dev server:
npm run dev
```

### Issue: "Failed to fetch"
**Solution:**
- Check Supabase project status
- Verify URL is correct (no trailing slash)
- Check internet connection
- Try refreshing Supabase API keys

### Issue: "Row Level Security policy violation"
**Solution:**
```sql
-- Run in Supabase SQL Editor:
-- Make sure these policies exist:

SELECT * FROM pg_policies 
WHERE tablename IN ('projects', 'certificates', 'profiles');

-- If missing, run supabase-schema.sql again
```

### Issue: "Upload failed"
**Solution:**
- Check Storage buckets exist
- Verify bucket names: `profile-pictures`, `project-images`, `certificate-badges`
- Check file size (<50MB)
- Ensure bucket policies allow uploads

### Issue: "Data not showing in dashboard"
**Solution:**
```sql
-- Check tables exist:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check data:
SELECT * FROM projects;
SELECT * FROM certificates;
SELECT * FROM profiles;
```

## 📊 Testing Metrics

Track these during testing:

| Feature | Test Cases | Passed | Failed | Notes |
|---------|-----------|--------|--------|-------|
| Projects CRUD | 4 | | | Add, Edit, Delete, Upload |
| Certificates CRUD | 4 | | | Add, Edit, Delete, Upload |
| Profile Update | 3 | | | Info, Picture, Skills |
| Error Handling | 3 | | | Offline, Validation, Fallback |
| Data Persistence | 2 | | | Refresh, Tab Close |

## ✅ Final Checklist

Before moving to deployment:

- [ ] All CRUD operations work
- [ ] Images upload successfully
- [ ] Data appears in Supabase dashboard
- [ ] Error handling works correctly
- [ ] localStorage fallback works
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] UI shows loading states
- [ ] Notifications display correctly

## 🎉 Ready to Deploy?

If all tests pass:
1. Commit your changes: `git add . && git commit -m "test: Verify Supabase integration"`
2. Follow the `DEPLOYMENT_CHECKLIST.md`
3. Deploy to Vercel
4. Test again on production

---

**Pro Tips:**
- Test each feature thoroughly before deploying
- Keep DevTools open while testing
- Check Supabase dashboard frequently
- Take notes of any issues for debugging
- Clear cache if you see stale data

**Need Help?**
- Check `SUPABASE_SETUP.md` for setup issues
- Check `DATABASE_README.md` for API reference
- Check `MIGRATION_COMPLETE.md` for code examples
