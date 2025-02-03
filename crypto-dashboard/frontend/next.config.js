/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    config.resolve.fallback = { fs: false };
    return config;
  }
};

module.exports = nextConfig;