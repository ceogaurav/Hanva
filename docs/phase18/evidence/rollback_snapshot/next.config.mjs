/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
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
      { source: '/location', destination: '/locations/', permanent: true },
      { source: '/location/', destination: '/locations/', permanent: true },
      { source: '/location/:slug*', destination: '/locations/:slug*/', permanent: true },
      { source: '/resources/how-does-ivr-work/', destination: '/resources/how-ivr-systems-work/', permanent: true },
      { source: '/resources/whatsapp-business-api-vs-app/', destination: '/resources/whatsapp-business-api-guide/', permanent: true },
      { source: '/resources/cloud-telephony-pricing-guide-india/', destination: '/resources/cloud-telephony-pricing-guide/', permanent: true },
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self' mailto:",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
