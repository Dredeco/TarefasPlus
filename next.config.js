/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    unoptimized: true
  },
  distDir: './out'
}

module.exports = nextConfig;