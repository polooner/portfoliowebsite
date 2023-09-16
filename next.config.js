/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ['vscode-oniguruma', 'shiki'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

const withMDX = require('@next/mdx')({
  // ...
  options: {
    providerImportSource: '@mdx-js/react',
  },
});
module.exports = withMDX(nextConfig);
