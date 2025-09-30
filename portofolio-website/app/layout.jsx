import { Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kevin Adiputra - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my projects and get in touch for web development services.",
  keywords: "Kevin Adiputra, Full Stack Developer, React Developer, Next.js, Node.js, Web Developer, Frontend, Backend, Portfolio",
  authors: [{ name: "Kevin Adiputra" }],
  creator: "Kevin Adiputra",
  publisher: "Kevin Adiputra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kevin-adiputra-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kevin Adiputra - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    url: 'https://kevin-adiputra-portfolio.vercel.app',
    siteName: 'Kevin Adiputra Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kevin Adiputra - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kevin Adiputra - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sometypeMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
