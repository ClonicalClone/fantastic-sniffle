import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ClonicalClone",
  description: "Welcome to my portfolio website. Explore projects, skills, and contact info.",
  icons: {
    icon: '/favicon.ico', // public folder path
  },
  openGraph: {
    title: "ClonicalClone - Portfolio",
    description: "Portfolio of ClonicalClone. Showcasing projects, skills, and contact info. Explore my work and get in touch!",
    url: "https://clonicalclone.vercel.app",
    siteName: "ClonicalClone",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${openSans.className}`}>
        {children}
        {/* Add Vercel Speed Insights */}
        <SpeedInsights />
        {/* Add Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
