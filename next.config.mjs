/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Increase allowed request body for middleware/edge API routes (bytes)
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024, // 50MB
  },
};

export default nextConfig;
