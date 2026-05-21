/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://totoaluminiummanufacture.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  additionalPaths: async () => [
    { loc: '/',                                    changefreq: 'weekly',  priority: 1.0 },
    { loc: '/produk',                              changefreq: 'weekly',  priority: 0.9 },
    { loc: '/harga',                               changefreq: 'monthly', priority: 0.9 },
    { loc: '/galeri',                              changefreq: 'weekly',  priority: 0.7 },
    { loc: '/blog',                                changefreq: 'weekly',  priority: 0.7 },
    { loc: '/tentang-kami',                        changefreq: 'monthly', priority: 0.6 },
    { loc: '/kontak',                              changefreq: 'monthly', priority: 0.6 },
    { loc: '/kusen-aluminium-lengkung-bekasi',     changefreq: 'weekly',  priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-jakarta',    changefreq: 'weekly',  priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-bandung',    changefreq: 'weekly',  priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-surabaya',   changefreq: 'weekly',  priority: 0.9 },
    { loc: '/kusen-aluminium-lengkung-bogor',      changefreq: 'weekly',  priority: 0.8 },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://totoaluminiummanufacture.com/sitemap.xml',
    ],
  },
}
