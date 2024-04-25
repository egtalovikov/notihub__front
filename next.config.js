const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.w7.pngwing.com',
			}
		]
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, './'),
		};
		return config;
	}
}

module.exports = nextConfig
