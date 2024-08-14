module.exports = [
	{
		source: '/',
		destination: '/sentinel',
		permanent: true,
	},
	{
		source: '/sentinel/commands/config',
		destination: '/sentinel/configuration',
		permanent: true,
	},
	// disallow '.html' or '/index.html' in favor of cleaner, simpler paths
	{ source: '/:path*/index', destination: '/:path*', permanent: true },
	{ source: '/:path*.html', destination: '/:path*', permanent: true },
]
