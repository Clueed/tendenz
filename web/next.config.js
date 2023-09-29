/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@tendenz/*'],
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
