module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'deow9bq0xqvbj.cloudfront.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'pbcdn1.podbean.com',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/goodpods-images-bucket/**',
			},
		],
	},
	// // Add experimental features for better error handling
	// experimental: {
	// 	// Enable better error handling during build
	// 	serverComponentsExternalPackages: [],
	// 	// Increase build timeout
	// 	buildTimeout: 120000, // 2 minutes
	// },
	// // Add webpack configuration for better error handling
	// webpack: (config, { isServer }) => {
	// 	if (isServer) {
	// 		// Add timeout for server-side operations
	// 		config.watchOptions = {
	// 			...config.watchOptions,
	// 			poll: 1000,
	// 			aggregateTimeout: 300,
	// 		}
	// 	}
	// 	return config
	// },
	async redirects() {
		return [
			{
				source: '/studio',
				destination: 'https://pod-content-studio.vercel.app/studio',
				permanent: false,
			},
			{
				source: '/refresh',
				destination: '/api/revalidate/episodes',
				permanent: true,
			},
		]
	},
}
