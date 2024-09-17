/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "placehold.co",
      "picsum.photos",
      "via.placeholder.com",
      "images.workpointtoday.com",
      "static.wixstatic.com",
      "ichef.bbci.co.uk",
      "imgproxy.republic.com",
      "uploads.republic.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
