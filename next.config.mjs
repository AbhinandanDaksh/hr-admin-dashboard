/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // ✅ Static export enable
  images: {
    unoptimized: true, // optional (agar images use kar rahe ho)
  },
};

export default nextConfig;
