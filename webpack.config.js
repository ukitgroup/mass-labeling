const path = require('path');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const extractLess = new ExtractTextPlugin('[name].css');


// function getFullPath(relPath = '') {
// 	return path.join(__dirname, relPath);
// }

const BUILD_MODES = {
	PRODUCTION: 'production',
	DEVELOPMENT: 'development',
};


const webpackConfig = {
	entry: {
		assessment: path.resolve(__dirname, './public/js/assessment.js'),
	},

	cache: true,
	mode: 'development',
	target: 'web',

	output: {
		path: path.resolve(__dirname, './public/bundles/'),
		filename: '[name].js',
	},

	resolve: {
		alias: {

		},
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

			// {
			// 	test: /\.less$/,
			// 	exclude: /node_modules/,
			// 	loader: extractLess.extract({
			// 		use: [{
			// 			loader: 'css-loader',
			// 		}, {
			// 			loader: 'less-loader',
			// 		}],
			//
			// 		fallback: 'style-loader',
			// 	}),
			// },
			//
			// {
			// 	test: /\.css$/,
			// 	include: [
			// 		/node_modules\/jquery-ui/,
			// 		/node_modules\/codemirror/,
			// 	],
			// 	loader: extractLess.extract({
			// 		use: [{
			// 			loader: 'css-loader',
			// 			options: {
			// 				minimize: process.env.NODE_ENV === BUILD_MODES.PRODUCTION,
			// 			},
			// 		}],
			//
			// 		fallback: 'style-loader',
			// 	}),
			// },

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
		// extractLess,

		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor.min',
		// 	minChunks: Infinity,
		// }),
	],
};


if (process.env.NODE_ENV === BUILD_MODES.PRODUCTION) {
	webpackConfig.plugins.push(new ParallelUglifyPlugin({
		workerCount: 4,
		uglifyJS: {
			mangle: true,
			compress: {
				drop_console: true,
			},
			output: {
				comments: false,
			},
		},
	}));

	// webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
	// 	assetNameRegExp: /\.css$/g,
	// 	cssProcessorOptions: { discardComments: { removeAll: true } },
	// }));
}


if (process.env.NODE_ENV === BUILD_MODES.DEVELOPMENT) {
	webpackConfig.watch = true;
}


module.exports = webpackConfig;
