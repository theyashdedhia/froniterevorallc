/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Product/hero imagery is supplied later; allow common remote hosts if a CMS/CDN is wired in.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
