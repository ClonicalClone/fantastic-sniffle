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
  ],
   additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/#About"),
    await config.transform(config, "/#Projects"),
    await config.transform(config, "/#Contact"),
  ],
}
