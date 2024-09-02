/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "images.workpointtoday.com",
      "static.wixstatic.com",
      "ichef.bbci.co.uk",
    ],
  },
};

export default nextConfig;
