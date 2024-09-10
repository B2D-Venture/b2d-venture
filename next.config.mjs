/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "placehold.co",
      "via.placeholder.com",
      "images.workpointtoday.com",
      "static.wixstatic.com",
      "ichef.bbci.co.uk",
      "imgproxy.republic.com",
      "uploads.republic.com",
    ],
  },
};

export default nextConfig;
