const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: __dirname + '/postcss.config.js',
								ctx: {
									env: 'production'
								}
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/main.[hash].css',
			chunkFilename: '[id].css'
		})
	],
	output: {
		filename: 'assets/js/main.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	}
});
