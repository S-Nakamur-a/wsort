/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/wsort' : '';
const assetPrefix = isProd ? '/wsort/' : '';

const nextConfig = {
    output: 'export',
    basePath,
    assetPrefix,
}

export default nextConfig
