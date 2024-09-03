/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.foodandwine.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
