import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // block your API endpoints
    },
    sitemap: "https://clonicalclone.vercel.app/sitemap.xml",
  };
}
