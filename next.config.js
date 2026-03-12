/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Optimize for Nigerian bandwidth
	images: {
		formats: ["image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96],
	},
	// Enable compression
	compress: true,
};

module.exports = nextConfig;
