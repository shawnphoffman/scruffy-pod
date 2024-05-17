module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'deow9bq0xqvbj.cloudfront.net',
				port: '',
				pathname: '/**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/studio',
				destination: 'https://pod-content-studio.vercel.app/studio',
				permanent: false,
			},
		]
	},
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/links',
	// 			destination: '/',
	// 			permanent: true,
	// 		},
	// 	]
	// },
}
