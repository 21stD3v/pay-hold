/** @type {import('next').NextConfig} */
const nextConfig = {
	// remove output: 'export' — NextAuth requires server runtime
	images: {
		domains: ["lh3.googleusercontent.com"], // for Google profile pictures
	},
};

module.exports = nextConfig;
