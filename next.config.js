/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    loader: 'akamai',
    path: ''
  },

  eslint: {

    ignoreDuringBuilds: true,
  },

}


module.exports = nextConfig