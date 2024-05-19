/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["instilla-sales-tax-problem.s3.eu-central-1.amazonaws.com"], // Add the domain(s) you want to allow
  },
};

export default nextConfig;
