/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://totoalumuniummanufacture.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/produk', changefreq: 'weekly', priority: 0.9 },
    { loc: '/harga', changefreq: 'weekly', priority: 0.9 },
    { loc: '/galeri', changefreq: 'weekly', priority: 0.8 },
    { loc: '/tentang-kami', changefreq: 'monthly', priority: 0.7 },
    { loc: '/kontak', changefreq: 'monthly', priority: 0.7 },
    { loc: '/kusen-aluminium-lengkung-bekasi', changefreq: 'monthly', priority: 0.8 },
    { loc: '/kusen-aluminium-lengkung-jakarta', changefreq: 'monthly', priority: 0.8 },
    { loc: '/kusen-aluminium-lengkung-bandung', changefreq: 'monthly', priority: 0.8 },
    { loc: '/kusen-aluminium-lengkung-surabaya', changefreq: 'monthly', priority: 0.8 },
    { loc: '/kusen-aluminium-lengkung-bogor', changefreq: 'monthly', priority: 0.8 },
    { loc: '/blog', changefreq: 'weekly', priority: 0.7 },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/'] },
    ],
    additionalSitemaps: ['https://totoalumuniummanufacture.com/sitemap.xml'],
  },
}
