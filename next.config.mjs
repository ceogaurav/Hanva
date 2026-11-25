/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/pricing.html', destination: '/pricing/', permanent: true },
      { source: '/contact.html', destination: '/company/contact/', permanent: true },
      { source: '/contact', destination: '/company/contact/', permanent: true },
      { source: '/contact/', destination: '/company/contact/', permanent: true },
      { source: '/services.html', destination: '/products/', permanent: true },
      { source: '/services', destination: '/products/', permanent: true },
      { source: '/services/', destination: '/products/', permanent: true },
      { source: '/about.html', destination: '/company/about/', permanent: true },
      { source: '/about', destination: '/company/about/', permanent: true },
      { source: '/about/', destination: '/company/about/', permanent: true },
      { source: '/industries', destination: '/industry/', permanent: true },
      { source: '/industries/', destination: '/industry/', permanent: true },
      { source: '/industries/:slug*', destination: '/industry/:slug*/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
