/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  output: "export",
  distDir: './out'
}

module.exports = nextConfig;