/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "placekitten.com",
            "api.isalamwakaf.com",
            "images.duitku.com",
        ],
    },
};

module.exports = nextConfig;
