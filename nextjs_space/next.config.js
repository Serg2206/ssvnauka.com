/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  // next/image is not used; disabling the optimizer closes /_next/image,
  // which has unpatched RCE advisories on the Next.js 14 line.
  images: { unoptimized: true },
};

module.exports = nextConfig;
