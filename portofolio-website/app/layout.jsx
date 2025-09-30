import { Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kevin Adiputra - Data Science & Machine Learning Operations Portfolio",
  description: "Machine Learning Operations Engineer specializing in data processing, ETL, and modern data technologies. Explore my projects and get in touch for data engineering services.",
  keywords: "Kevin Adiputra, Machine Learning Operations Engineer, ETL, Data Processing, Data Pipeline, Portfolio",
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
    title: "Kevin Adiputra - Data Science & Machine Learning Operations Portfolio",
    description: "Machine Learning Operations Engineer specializing in data processing, ETL, and modern data technologies.",
    url: 'https://kevin-adiputra-portfolio.vercel.app',
    siteName: 'Kevin Adiputra Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kevin Adiputra - Data Science & Machine Learning Operations Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  instagram: {
    card: 'summary_large_image',
    title: "Kevin Adiputra - Data Science & Machine Learning Operations Portfolio",
    description: "Machine Learning Operations Engineer specializing in data processing, ETL, and modern data technologies.",
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
