/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run in development; don't fail production builds over style rules.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
