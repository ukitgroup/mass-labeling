const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
	entry: {},

	cache: true,
	mode: 'development',
	// mode: 'production',
	target: 'web',
	watch: true,

	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: 'vendor',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},

	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
	},

	output: {
		path: path.resolve(__dirname, './public/bundles/'),
		filename: '[name].js',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// css: extractLess.extract({
						// 	use: [{ loader: 'css-loader' }],
						// 	fallback: 'style-loader',
						// }),
					},
				},
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									node: '8.10',
								},
							},
						],
					],
				},
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},

			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader?name=images/[name].[ext]',
			},

			{
				test: /\.(woff|ttf|eot|svg|woff2)(\?.*)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
			},
		],
	},

	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css',
		}),

		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessorOptions: { discardComments: { removeAll: true } },
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],
};


['layout', 'index', 'assessment', 'broken', 'config', 'slider']
	.forEach((entryName) => {
		webpackConfig.entry[entryName] = path
			.resolve(__dirname, `./public/js/${entryName}.js`);
	});


module.exports = webpackConfig;
