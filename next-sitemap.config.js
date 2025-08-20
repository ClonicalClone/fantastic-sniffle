/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://clonicalclone.vercel.app", // main site
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // Don’t let Google crawl these
  exclude: [
    "/404",
    "/500",
    "/api/*",
    "/"
  ]
}
