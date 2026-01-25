/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports if needed
  // output: 'standalone',

  async redirects() {
    return [
      // non-www to www redirect (301 for SEO)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'learn402.xyz',
          },
        ],
        destination: 'https://www.learn402.xyz/:path*',
        permanent: true, // 301 redirect
      },
    ]
  },
}

module.exports = nextConfig
