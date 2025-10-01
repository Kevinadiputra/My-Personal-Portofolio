# 🚀 Kevin Adiputra - Personal Portfolio

Modern, interactive portfolio website built with Next.js 15, React 19, and Supabase.

## ✨ Features

### 🎨 UI/UX
- ✅ Modern glassmorphism design
- ✅ Smooth animations with Framer Motion
- ✅ Interactive click spark effects (React Bits)
- ✅ Responsive design (mobile-first)
- ✅ Dark theme optimized
- ✅ Scroll position restoration

### 🛠️ Functionality
- ✅ **Admin Panel** - CRUD operations for projects & certificates
- ✅ **Profile Management** - Update profile picture & info
- ✅ **Contact Form** - Email integration with EmailJS
- ✅ **Database Integration** - Supabase (PostgreSQL + Storage)
- ✅ **File Upload** - Drag & drop image upload
- ✅ **Certificate Showcase** - Animated logo loop carousel
- ✅ **Project Gallery** - Filterable & searchable
- ✅ **Real-time Updates** - No page refresh needed

### 🗄️ Database & Storage
- ✅ **Supabase PostgreSQL** - Free cloud database
- ✅ **Supabase Storage** - Image & file storage with CDN
- ✅ **Auto Backup** - Built-in backup system
- ✅ **Row Level Security** - Secure data access
- ✅ **Real-time Sync** - Instant updates across devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone repository
git clone https://github.com/Kevinadiputra/My-Personal-Portofolio.git
cd My-Personal-Portofolio/portofolio-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Database Setup (Optional but Recommended)

**3 menit setup!** Lihat `QUICKSTART.md` untuk panduan cepat.

Atau lihat `SUPABASE_SETUP.md` untuk dokumentasi lengkap.

## 📁 Project Structure

```
portofolio-website/
├── app/                    # Next.js app directory
│   ├── page.jsx           # Home page
│   ├── projects/          # Projects page
│   ├── certificates/      # Certificates page
│   └── layout.jsx         # Root layout
├── components/            # React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── AdminPanel.jsx
│   ├── Contact.jsx
│   ├── LogoLoop.jsx       # Certificate carousel
│   └── ...
├── context/              # React Context providers
│   ├── ProjectsContext.jsx
│   ├── CertificatesContext.jsx
│   ├── ProfileContext.jsx
│   └── AuthContext.jsx
├── hooks/                # Custom React hooks
│   └── useSupabase.js    # Supabase data hooks
├── lib/                  # Utility libraries
│   ├── supabase.js       # Supabase client & services
│   ├── emailConfig.js    # EmailJS configuration
│   └── utils.js          # Helper functions
├── public/               # Static assets
├── supabase-schema.sql   # Database schema
├── QUICKSTART.md         # 3-minute setup guide
├── SUPABASE_SETUP.md     # Full database documentation
└── DATABASE_README.md    # API reference
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file (see `.env.local.example`):

```env
# Supabase (Required for database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS (Optional for contact form)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### Admin Access

Default admin credentials (change in `context/AuthContext.jsx`):
- **Username**: admin
- **Password**: admin123

## 🎯 Usage

### Admin Panel
1. Click **"Admin"** button in header
2. Login with credentials
3. Manage projects, certificates, and profile
4. Upload images via drag & drop
5. Changes are saved to database automatically

### Contact Form
1. Setup EmailJS account (optional)
2. Configure credentials in `.env.local`
3. Form will use mailto fallback if not configured

### Database
1. Follow `QUICKSTART.md` for 3-minute setup
2. Or use localStorage (default, data not persistent)
3. Migrate localStorage to Supabase anytime

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Don't forget to add environment variables in Vercel dashboard!

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.x
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui, React Bits
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: EmailJS
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📚 Documentation

- **Quick Start**: `QUICKSTART.md` - 3-minute setup
- **Database Setup**: `SUPABASE_SETUP.md` - Full guide
- **API Reference**: `DATABASE_README.md` - Database structure
- **Email Setup**: `lib/emailConfig.js` - EmailJS config

## 🎨 Features Highlight

### ClickSpark Effect
Global click effects using React Bits canvas-based implementation.

### LogoLoop Carousel
Smooth, continuous certificate logo showcase with hover effects.

### Scroll Restoration
Maintains scroll position when navigating between pages.

### Image Upload
Drag & drop upload with:
- Real-time preview
- Progress tracking
- Auto optimization
- CDN delivery

## 🐛 Troubleshooting

### Database not working?
- Check `.env.local` configuration
- Verify Supabase project is active
- Run `supabase-schema.sql` in SQL Editor

### Images not uploading?
- Create 'images' bucket in Supabase Storage
- Set bucket to public
- Check file size (<5MB)

### Contact form not sending?
- Configure EmailJS credentials
- Or use mailto fallback (automatic)

## 📝 License

MIT License - free to use for personal and commercial projects.

## 👤 Author

**Kevin Adiputra**
- Email: kevinadiputra66@gmail.com
- GitHub: [@Kevinadiputra](https://github.com/Kevinadiputra)
- LinkedIn: [Kevin Adiputra Mahesa](https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/)
- Location: Palembang, Indonesia

## 🙏 Acknowledgments

- Next.js Team
- Vercel
- Supabase
- React Bits
- shadcn/ui
- All open source contributors

---

Made with ❤️ using Next.js
