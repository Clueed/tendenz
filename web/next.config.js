/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@tendenz/types'],
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
