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
      "utfs.io",
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY,
  }
};

export default nextConfig;