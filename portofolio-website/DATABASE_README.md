# 📦 Database Structure & API Reference

## 🗄️ Database Tables

### 1. **profiles** Table
Menyimpan informasi profile developer

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | VARCHAR(255) | Full name |
| title | VARCHAR(255) | Job title/role |
| bio | TEXT | Biography/description |
| email | VARCHAR(255) | Email address |
| phone | VARCHAR(50) | Phone number |
| location | VARCHAR(255) | City, Country |
| profile_picture | TEXT | URL to profile image |
| github_url | TEXT | GitHub profile URL |
| linkedin_url | TEXT | LinkedIn profile URL |
| instagram_url | TEXT | Instagram profile URL |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### 2. **projects** Table
Menyimpan semua project portfolio

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | VARCHAR(255) | Project name |
| description | TEXT | Project description |
| image | TEXT | URL to project screenshot |
| technologies | TEXT[] | Array of tech stack |
| category | VARCHAR(100) | 'web', 'mobile', 'api', etc |
| live_url | TEXT | Demo/live site URL |
| github_url | TEXT | GitHub repository URL |
| featured | BOOLEAN | Show in featured section |
| order_index | INTEGER | Display order |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### 3. **certificates** Table
Menyimpan semua sertifikat

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | VARCHAR(255) | Certificate name |
| issuer | VARCHAR(255) | Issuing organization |
| platform | VARCHAR(255) | Learning platform |
| date_issued | DATE | Issue date |
| verify_url | TEXT | Verification link |
| level | VARCHAR(50) | 'beginner', 'intermediate', 'advanced', 'expert', 'professional' |
| skills | TEXT[] | Array of skills learned |
| featured | BOOLEAN | Show in featured section |
| badge | TEXT | URL to certificate badge image |
| description | TEXT | Certificate description |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

## 📁 Storage Structure

```
images/
├── profiles/
│   └── profile-{timestamp}.{ext}
├── projects/
│   └── project-{timestamp}.{ext}
└── certificates/
    └── certificate-{timestamp}.{ext}
```

## 🔌 API Usage Examples

### Using Hooks (Recommended)

```javascript
import { useSupabaseProjects, useSupabaseCertificates, useSupabaseProfile } from '@/hooks/useSupabase';

function MyComponent() {
    const { projects, loading, addProject } = useSupabaseProjects();
    const { certificates, addCertificate } = useSupabaseCertificates();
    const { profile, updateProfile } = useSupabaseProfile();
    
    // Use data...
}
```

### Direct Service Calls

```javascript
import { projectService, certificateService, profileService } from '@/lib/supabase';

// Get all projects
const projects = await projectService.getAllProjects();

// Add new project
const newProject = await projectService.addProject({
    title: "My Project",
    description: "Description here",
    technologies: ["React", "Node.js"],
    category: "web",
    featured: true
});

// Upload image
const imageUrl = await projectService.uploadProjectImage(file);

// Update project
await projectService.updateProject(projectId, {
    title: "Updated Title"
});

// Delete project
await projectService.deleteProject(projectId);
```

## 🔒 Security (RLS Policies)

### Public Read Access
- ✅ Anyone can **read** all data
- Perfect untuk portfolio yang public

### Admin Write Access
- ✅ Authenticated users can **write**
- Anda bisa custom authentication
- Default: semua write operations allowed

### Custom Policies
Edit di Supabase Dashboard -> Authentication -> Policies

## 🎨 Image Upload Best Practices

```javascript
// Validate file before upload
const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }
    
    if (file.size > maxSize) {
        throw new Error('File too large');
    }
    
    return true;
};

// Upload with progress
const { uploadFile, uploading, progress } = useFileUpload();

const handleUpload = async (file) => {
    try {
        validateImage(file);
        const url = await uploadFile(file, projectService.uploadProjectImage);
        console.log('Uploaded:', url);
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
```

## 🔄 Data Migration

### From localStorage to Supabase

```javascript
// Migration helper
const migrateLocalStorageToSupabase = async () => {
    // Get data from localStorage
    const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Upload to Supabase
    for (const project of localProjects) {
        await projectService.addProject(project);
    }
    
    console.log('Migration complete!');
};
```

## 📊 Useful Queries

### Get featured items only
```javascript
const featuredProjects = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order_index');
```

### Search projects by technology
```javascript
const reactProjects = await supabase
    .from('projects')
    .select('*')
    .contains('technologies', ['React']);
```

### Get recent certificates
```javascript
const recentCerts = await supabase
    .from('certificates')
    .select('*')
    .order('date_issued', { ascending: false })
    .limit(5);
```

## 🎯 Performance Tips

1. **Use indexes** - Already created for common queries
2. **Limit results** - Use `.limit()` for pagination
3. **Select specific columns** - Don't always use `*`
4. **Cache images** - Use CDN caching (auto-enabled)
5. **Optimize images** - Compress before upload

## 🐛 Debugging

### Enable detailed logging
```javascript
import { supabase } from '@/lib/supabase';

// Check connection
const { data, error } = await supabase.from('projects').select('count');
console.log('Connected:', !error);
```

### Common errors
- `JWT expired` - Refresh session
- `Policy violation` - Check RLS policies
- `Bucket not found` - Create 'images' bucket
- `File too large` - Check file size limit

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

---

Need help? Check `SUPABASE_SETUP.md` for setup instructions!