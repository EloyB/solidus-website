const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://soliduscapital.org'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/*',
      },
    ],
  },
}
