module.exports = {
	'/mfe1/static/': {
		target: 'http://localhost:4201',
		pathRewrite: { '/mfe1/static/': '/' },
	},
	'/mfe2/static/': {
		target: 'http://localhost:4202',
		pathRewrite: { '/mfe2/static/': '/' },
	},
};
