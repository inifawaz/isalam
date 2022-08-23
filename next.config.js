/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["placekitten.com", "api.isalamwakaf.com"],
    },
};

module.exports = nextConfig;
