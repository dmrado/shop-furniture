/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
                search: ''
            },
            {
                protocol: 'https',
                hostname: 'avatars.yandex.net',
                port: '',
                pathname: '/**',
                search: '' // Необязательно
            },
            {
                protocol: 'https',
                hostname: 'd46140d3-6c850d2f-c0cc-4077-86c6-d5d4d7bdfa74.s3.twcstorage.ru',
                port: '',
                pathname: '/**',
                search: ''
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    }
}
export default nextConfig
