/** @type {import('next').NextConfig} */
const nextConfig = {

    // enable load images from external sources
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
