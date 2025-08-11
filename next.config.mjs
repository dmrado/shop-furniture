/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname:  '/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'avatars.yandex.net', // <--- ДОБАВЬТЕ ЭТУ ЗАПИСЬ
                port: '',
                pathname:  '/**',
                search: '', // Необязательно
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}
export default nextConfig;
