import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['akcdn.detik.net.id', 'lh3.googleusercontent.com', 'asset.kompas.com']// ✅ tambahkan domain di sini
  },
  devIndicators: false
};

export default nextConfig;
