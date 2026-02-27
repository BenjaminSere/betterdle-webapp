/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/api/**', // Autorise les images venant de l'API locale
            },
        ],
    },
};

export default nextConfig;
