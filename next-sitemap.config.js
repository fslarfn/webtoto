/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://totoaluminiummanufacture.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async () => [
    { loc: '/kusen-aluminium-lengkung-bekasi',   changefreq: 'monthly', priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-jakarta',  changefreq: 'monthly', priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-bandung',  changefreq: 'monthly', priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-surabaya', changefreq: 'monthly', priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-bogor',    changefreq: 'monthly', priority: 0.9 },
    { loc: '/harga',   changefreq: 'weekly', priority: 0.8 },
    { loc: '/produk',  changefreq: 'weekly', priority: 0.8 },
    { loc: '/galeri',  changefreq: 'weekly', priority: 0.7 },
    { loc: '/blog',    changefreq: 'weekly', priority: 0.7 },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/'] },
    ],
  },
}
