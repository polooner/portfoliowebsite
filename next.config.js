/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
