/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://clonicalclone.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  
  // Exclude API routes and error pages
  exclude: [
    "/404",
    "/500",
    "/api/*"
  ],
  
  // Add your main pages
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/about"),
    await config.transform(config, "/projects"), 
    await config.transform(config, "/contact"),
  ],
  
  // Optional: Add changefreq and priority
  changefreq: 'weekly',
  priority: 0.7,
  
  // Optional: Transform function to customize URLs
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}