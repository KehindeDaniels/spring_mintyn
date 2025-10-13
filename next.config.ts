/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://mint-frontend-test.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
