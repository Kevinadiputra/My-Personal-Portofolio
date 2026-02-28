import { Sometype_Mono } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/context/ProfileContext";

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kevin Adiputra - Machine Learning & Data Science Portfolio",
  description: "Machine Learning Engineer & Data Scientist specializing in deep learning, NLP, computer vision, and data analytics. Building intelligent solutions with Python, TensorFlow, and PyTorch.",
  keywords: "Kevin Adiputra, Machine Learning, Data Scientist, Deep Learning, NLP, Computer Vision, Python, TensorFlow, PyTorch, Portfolio",
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
    title: "Kevin Adiputra - Machine Learning & Data Science Portfolio",
    description: "Machine Learning Engineer & Data Scientist building intelligent solutions with modern AI technologies.",
    url: 'https://kevin-adiputra-portfolio.vercel.app',
    siteName: 'Kevin Adiputra Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kevin Adiputra - ML & Data Science Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
      <body className={`${sometypeMono.variable} antialiased`}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
