module.exports = (ctx) => {
	return {
		plugins: [
			require('autoprefixer'),
			...ctx.options.env === 'production' ? [
				require('cssnano')({
					preset: 'default',
				})
			] : []
		]
	}
}
