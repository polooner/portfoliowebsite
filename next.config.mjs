import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true,
    // useLightningcss: true,
  },
  // swcMinify: true,
  images: {},
  reactStrictMode: true,
  pageExtensions: ["md", "tsx", "ts", "jsx", "js", "md", "mdx"],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
