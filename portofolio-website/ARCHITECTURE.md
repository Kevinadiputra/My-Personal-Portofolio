# 🎨 System Architecture Diagram

## Complete System Overview

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (Browser)                          │
│                                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  ┌─────────────┐ │
│  │   Hero      │  │  Projects    │  │ Certificates  │  │ Admin Panel │ │
│  │ Component   │  │  Component   │  │  Component    │  │  Component  │ │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  └──────┬──────┘ │
│         │                │                   │                  │        │
└─────────┼────────────────┼───────────────────┼──────────────────┼────────┘
          │                │                   │                  │
          │                │                   │                  │
┌─────────▼────────────────▼───────────────────▼──────────────────▼────────┐
│                      REACT CONTEXT LAYER                                  │
│                                                                           │
│  ┌───────────────────┐  ┌──────────────────┐  ┌────────────────────┐   │
│  │ ProfileContext    │  │ ProjectsContext  │  │CertificatesContext │   │
│  │                   │  │                  │  │                    │   │
│  │ • updateProfile   │  │ • addProject     │  │ • addCertificate   │   │
│  │ • uploadPicture   │  │ • updateProject  │  │ • updateCert       │   │
│  │ • updateSkills    │  │ • deleteProject  │  │ • deleteCert       │   │
│  │ • refresh()       │  │ • uploadImage    │  │ • uploadBadge      │   │
│  │ • error state     │  │ • refresh()      │  │ • refresh()        │   │
│  └─────────┬─────────┘  └────────┬─────────┘  └──────────┬─────────┘   │
│            │                     │                        │             │
└────────────┼─────────────────────┼────────────────────────┼─────────────┘
             │                     │                        │
             │                     │                        │
┌────────────▼─────────────────────▼────────────────────────▼─────────────┐
│                         SERVICE LAYER                                    │
│                       (lib/supabase.js)                                  │
│                                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────────────┐  │
│  │profileService  │  │projectService  │  │certificateService       │  │
│  │                │  │                │  │                         │  │
│  │• getProfile()  │  │• getAll()      │  │• getAllCertificates()   │  │
│  │• update()      │  │• add()         │  │• addCertificate()       │  │
│  │• uploadPic()   │  │• update()      │  │• updateCertificate()    │  │
│  └────────┬───────┘  │• delete()      │  │• deleteCertificate()    │  │
│           │          │• uploadImage() │  │• uploadBadge()          │  │
│           │          └────────┬───────┘  └────────┬────────────────┘  │
│           │                   │                   │                    │
└───────────┼───────────────────┼───────────────────┼────────────────────┘
            │                   │                   │
            │                   │                   │
            ├───────────────────┴───────────────────┤
            │                                       │
            ▼                                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE CLIENT                                     │
│                   (createClient instance)                                │
│                                                                          │
│  • Authentication                                                        │
│  • REST API calls                                                        │
│  • Real-time subscriptions                                              │
│  • Storage operations                                                    │
└──────────────────────────┬────────────────┬──────────────────────────────┘
                           │                │
                           │                │
        ┌──────────────────┴────┐  ┌────────┴─────────────────┐
        │                       │  │                          │
┌───────▼────────┐      ┌───────▼──────────┐      ┌──────────▼──────────┐
│  SUPABASE DB   │      │ SUPABASE STORAGE │      │   BACKUP SYSTEM     │
│  (PostgreSQL)  │      │   (File Store)   │      │   (localStorage)    │
│                │      │                  │      │                     │
│ ┌────────────┐ │      │ ┌──────────────┐│      │ ┌─────────────────┐ │
│ │ profiles   │ │      │ │profile-pics  ││      │ │user_profile     │ │
│ │            │ │      │ │              ││      │ │                 │ │
│ │ • id       │ │      │ │image1.jpg    ││      │ │{name, title..} │ │
│ │ • name     │ │      │ │image2.png    ││      │ └─────────────────┘ │
│ │ • title    │ │      │ └──────────────┘│      │                     │
│ │ • bio      │ │      │                  │      │ ┌─────────────────┐ │
│ │ • profile_ │ │      │ ┌──────────────┐│      │ │portfolio-       │ │
│ │   picture  │ │      │ │project-images││      │ │projects         │ │
│ │ • email    │ │      │ │              ││      │ │                 │ │
│ │ • skills[] │ │      │ │proj1.jpg     ││      │ │[{id,title,...}]│ │
│ └────────────┘ │      │ │proj2.png     ││      │ └─────────────────┘ │
│                │      │ └──────────────┘│      │                     │
│ ┌────────────┐ │      │                  │      │ ┌─────────────────┐ │
│ │ projects   │ │      │ ┌──────────────┐│      │ │portfolio-       │ │
│ │            │ │      │ │cert-badges   ││      │ │certificates     │ │
│ │ • id       │ │      │ │              ││      │ │                 │ │
│ │ • title    │ │      │ │badge1.png    ││      │ │[{id,title,...}]│ │
│ │ • desc     │ │      │ │badge2.png    ││      │ └─────────────────┘ │
│ │ • image    │ │      │ └──────────────┘│      │                     │
│ │ • tech[]   │ │      │                  │      │ Fallback when:      │
│ │ • github   │ │      │ Storage Stats:   │      │ • Supabase fails   │
│ │ • demo     │ │      │ • 1GB free       │      │ • Network offline  │
│ └────────────┘ │      │ • Public access  │      │ • API errors       │
│                │      │ • CDN delivery   │      │                     │
│ ┌────────────┐ │      └──────────────────┘      └─────────────────────┘
│ │certificates│ │
│ │            │ │
│ │ • id       │ │      Database Stats:
│ │ • title    │ │      • 500MB free
│ │ • org      │ │      • PostgreSQL 15
│ │ • date     │ │      • Row Level Security
│ │ • skills[] │ │      • Auto backups (7 days)
│ │ • badge_url│ │      • Real-time updates
│ │ • verify   │ │
│ └────────────┘ │
│                │
│ RLS Policies:  │
│ ✅ Read: Public│
│ ✅ Write: Auth │
└────────────────┘
```

## Data Flow Examples

### 1️⃣ Adding a Project

```
User Action                 React Layer              Service Layer           Database
     │                          │                        │                      │
     ├─ Click "Add Project" ────►│                        │                      │
     │                          │                        │                      │
     ├─ Fill form data ─────────►│                        │                      │
     │                          │                        │                      │
     ├─ Click "Save" ───────────►│                        │                      │
     │                          │                        │                      │
     │                          ├─ addProject(data) ────►│                      │
     │                          │                        │                      │
     │                          │                        ├─ INSERT INTO ────────►│
     │                          │                        │   projects...        │
     │                          │                        │                      │
     │                          │                        │◄─ Returns new ───────┤
     │                          │                        │   project with ID    │
     │                          │                        │                      │
     │                          │◄─ Returns project ─────┤                      │
     │                          │                        │                      │
     │                          ├─ Update state          │                      │
     │                          │                        │                      │
     │                          ├─ Save to localStorage  │                      │
     │                          │   (backup)             │                      │
     │                          │                        │                      │
     │◄─ Show success ──────────┤                        │                      │
     │   notification           │                        │                      │
     │                          │                        │                      │
     │◄─ UI updates with ───────┤                        │                      │
     │   new project            │                        │                      │
```

### 2️⃣ Uploading an Image

```
User Action                 React Layer              Service Layer           Storage
     │                          │                        │                      │
     ├─ Select image file ──────►│                        │                      │
     │                          │                        │                      │
     │                          ├─ Validate file         │                      │
     │                          │   (size, type)         │                      │
     │                          │                        │                      │
     ├─ Click "Upload" ─────────►│                        │                      │
     │                          │                        │                      │
     │                          ├─ uploadImage(file) ───►│                      │
     │                          │                        │                      │
     │                          │                        ├─ Generate unique ────┤
     │                          │                        │   filename           │
     │                          │                        │                      │
     │                          │                        ├─ Upload to bucket ──►│
     │                          │                        │   (project-images)   │
     │                          │                        │                      │
     │                          │                        │◄─ Returns public ────┤
     │                          │                        │   URL                │
     │                          │                        │                      │
     │                          │◄─ Returns URL ─────────┤                      │
     │                          │                        │                      │
     │                          ├─ Update project with   │                      │
     │                          │   image URL            │                      │
     │                          │                        │                      │
     │◄─ Show image in UI ──────┤                        │                      │
```

### 3️⃣ Error Handling with Fallback

```
User Action                 React Layer              Service Layer           Database
     │                          │                        │                      │
     ├─ Perform action ─────────►│                        │                      │
     │                          │                        │                      │
     │                          ├─ Call service ────────►│                      │
     │                          │                        │                      │
     │                          │                        ├─ API call ───────────►│
     │                          │                        │                      │
     │                          │                        │                      │
     │                          │                        │    ❌ Network Error   │
     │                          │                        │                      │
     │                          │◄─ Throws error ────────┤                      │
     │                          │                        │                      │
     │                          ├─ Catch error           │                      │
     │                          │                        │                      │
     │                          ├─ Fallback to           │                      │
     │                          │   localStorage         │                      │
     │                          │                        │                      │
     │                          ├─ Update state          │                      │
     │                          │                        │                      │
     │◄─ Show warning ──────────┤                        │                      │
     │   "Using offline mode"   │                        │                      │
     │                          │                        │                      │
     │◄─ Continue working ──────┤                        │                      │
     │   with local data        │                        │                      │
```

## Technology Stack

```
┌──────────────────────────────────────────────────────────┐
│                      Frontend                            │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │
│  │  Next.js   │  │   React    │  │  Tailwind CSS   │   │
│  │    15      │  │     19     │  │                 │   │
│  └────────────┘  └────────────┘  └─────────────────┘   │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │
│  │   Framer   │  │  React     │  │    EmailJS      │   │
│  │   Motion   │  │   Bits     │  │                 │   │
│  └────────────┘  └────────────┘  └─────────────────┘   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                      Backend                             │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │
│  │ Supabase   │  │PostgreSQL  │  │  Supabase       │   │
│  │   Client   │  │     15     │  │  Storage        │   │
│  └────────────┘  └────────────┘  └─────────────────┘   │
│                                                          │
│  ┌────────────┐  ┌────────────┐                         │
│  │    RLS     │  │  REST API  │                         │
│  │  Policies  │  │            │                         │
│  └────────────┘  └────────────┘                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    Deployment                            │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │
│  │   Vercel   │  │   GitHub   │  │    Vercel       │   │
│  │  Hosting   │  │   Repo     │  │    Edge CDN     │   │
│  └────────────┘  └────────────┘  └─────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## Environment Variables Flow

```
.env.local (Local)           Vercel Dashboard (Production)
      │                                │
      │                                │
      ├─ NEXT_PUBLIC_                 ├─ NEXT_PUBLIC_
      │  SUPABASE_URL                 │  SUPABASE_URL
      │                                │
      ├─ NEXT_PUBLIC_                 ├─ NEXT_PUBLIC_
      │  SUPABASE_ANON_KEY            │  SUPABASE_ANON_KEY
      │                                │
      ├─ NEXT_PUBLIC_                 ├─ NEXT_PUBLIC_
      │  EMAILJS_PUBLIC_KEY           │  EMAILJS_PUBLIC_KEY
      │                                │
      └────────────┬──────────────────┘
                   │
                   ▼
            Application Runtime
                   │
                   ├─ Available in browser
                   │  (NEXT_PUBLIC_ prefix)
                   │
                   └─ Used by Supabase client
                      and EmailJS
```

---

**This architecture provides:**
- ✅ Scalability
- ✅ Reliability
- ✅ Performance
- ✅ Security
- ✅ Offline support
- ✅ Easy maintenance
- ✅ Professional infrastructure
