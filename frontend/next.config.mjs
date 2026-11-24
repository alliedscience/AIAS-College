/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Use IPv4 loopback by default so Windows does not resolve `localhost`
    // to an unavailable IPv6 listener during local development.
    const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:5000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
