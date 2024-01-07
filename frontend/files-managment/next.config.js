/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/groups",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
