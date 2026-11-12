/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/projects/resume-analyser", destination: "/projects/resume-analyzer", permanent: true },
    ];
  },
};

export default nextConfig;
