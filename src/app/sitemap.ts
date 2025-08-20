import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clonicalclone.vercel.app";
  const lastmod = new Date();

  return [
    {
      url: base,       // only your homepage
      lastModified: lastmod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
