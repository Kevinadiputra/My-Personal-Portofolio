# Kevin Adiputra - Personal Portfolio Website

A modern, responsive, and interactive portfolio website built with Next.js 15, React 19, and Tailwind CSS. This portfolio showcases my skills, projects, and experience as a Full Stack Developer.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Components**: Dynamic typing animation, skill progress bars, project filters
- **Dark Theme**: Beautiful dark color scheme with accent colors
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Functional contact form for potential clients
- **Performance Optimized**: Fast loading with Next.js optimization
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Sometype Mono (Google Fonts)
- **Deployment**: Vercel (recommended)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the website

## 📁 Project Structure

```
portofolio-website/
├── app/
│   ├── globals.css      # Global styles with Tailwind configuration
│   ├── layout.jsx       # Root layout component
│   └── page.jsx         # Main homepage
├── components/
│   ├── Header.jsx       # Navigation header
│   ├── Hero.jsx         # Hero section with intro
│   ├── About.jsx        # About me section
│   ├── Skills.jsx       # Skills and technologies
│   ├── Projects.jsx     # Project showcase
│   ├── Contact.jsx      # Contact form
│   ├── Footer.jsx       # Website footer
│   ├── ScrollToTop.jsx  # Scroll to top button
│   └── LoadingScreen.jsx # Loading animation
├── lib/
│   └── utils.js         # Utility functions
└── public/              # Static assets
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  primary: '#0d091a',     // Dark background
  secondary: '#140e25',   // Secondary background
  accent: '#5810ff',      // Accent color (purple)
  tertiary: '#201837',    // Card backgrounds
}
```

### Personal Information
Update your personal information in these components:
- `components/Hero.jsx` - Name, title, social links
- `components/About.jsx` - Bio, stats, skills summary
- `components/Contact.jsx` - Contact information
- `components/Footer.jsx` - Footer details

### Projects
Add your projects in `components/Projects.jsx` by updating the `projects` array:
```javascript
{
  id: 1,
  title: "Your Project Name",
  description: "Project description",
  technologies: ["React", "Node.js", "MongoDB"],
  category: "fullstack",
  liveUrl: "https://yourproject.com",
  githubUrl: "https://github.com/username/project",
  featured: true,
}
```

## 📱 Responsive Design

The website is fully responsive and tested on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1536px and up)

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with one click!

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio-website/issues).

## 📧 Contact

Kevin Adiputra - [kevin.adiputra@example.com](mailto:kevin.adiputra@example.com)

Project Link: [https://github.com/yourusername/portfolio-website](https://github.com/yourusername/portfolio-website)

---

⭐️ If you like this project, please give it a star on GitHub!