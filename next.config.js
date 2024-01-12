/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.**',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
