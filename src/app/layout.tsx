import type { Metadata } from "next";
import "./globals.css";
// app/layout.tsx or wherever your root layout is
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // customize weights
  variable: '--font-open-sans', // optional: CSS variable
  display: 'swap', // optional for performance
});

// app/layout.tsx

export const metadata: Metadata = {
  title: "ClonicalClone",
  description: "Welcome to my portfolio website. Explore projects, skills, and contact info.",
  icons: {
    icon: '../app/favicon.ico', // Relative path from 'public' directory
    // You can add more icons for different sizes or platforms here
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





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${openSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
