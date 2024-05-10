/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    }};

export default nextConfig;
