/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep the production build resilient; lint is run separately via `npm run lint`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
