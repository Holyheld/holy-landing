const path = require('path');
const glob = require('glob');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');

const pages = [];

const rootPages = glob.sync('src/pages/*.pug');
rootPages.forEach(template => {
	const name = path.basename(template, path.extname(template));
	const data = require(`./src/data/${name}.json`);

	pages.push({
		filename: `${name === 'index' ? '' : `${name}/`}index.html`,
		template,
		data
	});
});

const faqPages = glob.sync('src/pages/faq/*.pug');
faqPages.forEach(template => {
	const dynamicItems = glob
		.sync(`src/data/faq/*.json`)
		.map(pathStr => ({
			...require('./' + pathStr),
			pageName: path.basename(pathStr, path.extname(pathStr))
		}))
		.filter(item => item.pageName !== 'index')
		.sort((a, b) => a.body.order - b.body.order);

	const name = path.basename(template, path.extname(template));

	if (name === 'index') {
		const data = require('./src/data/faq/index.json');
		pages.push({
			filename: 'faq/index.html',
			template,
			data: {
				...data,
				body: {
					...data.body,
					list: dynamicItems.map(data => ({
						title: data.body.title,
						previewImage: data.body.previewImage,
						previewSmImage: data.body.previewSmImage,
						href: `/faq/${data.pageName}/`
					}))
				}
			}
		});
		return;
	}

	dynamicItems.forEach(data => {
		pages.push({
			filename: `faq/${data.pageName}/index.html`,
			template,
			data: {
				...data,
				body: {
					...data.body,
					backLink: `/faq/`
				}
			}
		});
	});
});

const promoPages = glob.sync('src/pages/promo/*.pug');
promoPages.forEach(template => {
	const dynamicItems = glob
		.sync(`src/data/promo/*.json`)
		.map(pathStr => ({
			...require('./' + pathStr),
			pageName: path.basename(pathStr, path.extname(pathStr))
		}))
		.sort((a, b) => a.body.order - b.body.order);

	dynamicItems.forEach(data => {
		pages.push({
			filename: `promo/${data.pageName}/index.html`,
			template,
			data: {
				...data,
				body: {
					...data.body,
					list: dynamicItems.map(_data => ({
						title: _data.body.title,
						href: `/promo/${_data.pageName}/`,
						current: data.pageName === _data.pageName
					}))
				}
			}
		});
	});
});

module.exports = {
	mode: 'development',
	entry: {
		main: './src/scripts/index.js'
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			},
			{
				test: /\.txt$/,
				use: 'raw-loader'
			},
			{
				test: /\.(woff|woff2|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/fonts/',
							publicPath: '/assets/fonts/'
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: [/node_modules\/(?!(swiper|dom7|bunnyjs)\/).*/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							spriteFilename: `assets/svg/icons.svg`
						}
					},
					'svgo-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new WriteFilePlugin(),
		new CopyPlugin([
			{
				from: path.resolve(__dirname, 'src/images'),
				to: path.resolve(__dirname, 'dist/assets/images')
			},
			{
				from: path.resolve(__dirname, 'public'),
				to: path.resolve(__dirname, 'dist')
			}
		]),
		...pages.map(page => {
			return new HtmlWebpackPlugin({
				filename: page.filename,
				template: page.template,
				data: page.data,
				generalData: require(`./src/data/general.json`),
				inject: 'body',
				minify: {
					collapseWhitespace: true,
					preserveLineBreaks: false
				},
				pages
			});
		}),
		new PreloadWebpackPlugin({
			rel: 'preload',
			as(entry) {
				if (/\.(woff2)$/.test(entry)) return 'font';
				if (/\.(css)$/.test(entry)) return 'style';
			},
			fileWhitelist: [/\.(woff2|css)$/],
			include: 'allAssets'
		}),
		new SpritePlugin({
			plainSprite: true,
			spriteAttrs: {
				style: 'width:0; height:0; visibility:hidden; display: none;'
			}
		})
	]
};
