/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'octodex.github.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
