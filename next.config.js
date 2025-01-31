/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hiring-manager-demo',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
