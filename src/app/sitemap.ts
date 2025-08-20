// app/sitemap.ts
import type { MetadataRoute } from "next";

// Force static generation so no client-side code is injected
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clonicalclone.vercel.app";
  const lastmod = new Date();

  // Only include the real, crawlable URL
  return [
    {
      url: base,
      lastModified: lastmod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
