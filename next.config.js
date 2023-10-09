/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUD_UPDATE_PRESET: process.env.CLOUD_UPDATE_PRESET,
    CLOUD_NAME:process.env.CLOUD_NAME,
CLOUD_API:process.env.CLOUD_API,
  },
};

module.exports = nextConfig;
