const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');

const dependencies = () => Object.keys(JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'})).dependencies)

const ENV = process.env.NODE_ENV || 'development';

const config = {
	context: path.join(__dirname, 'src'),
	entry: {
		bundle: './index.js',
		vendor: dependencies()
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/bundle.js',
		publicPath: '/'
	},
	resolve: {
		modules: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'kotlin_build')]
	},

	devtool: 'cheap-module-eval-source-map',

	plugins: [
		new KotlinWebpackPlugin({
			src: path.join(__dirname, 'src'),
			verbose: true
		}),
		new webpack.DefinePlugin({
			development: true,
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js'
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, '../kotlin_build'),
				use: ['source-map-loader'],
				enforce: 'pre',
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]?[hash]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]?[hash]'
				}
			}
		]
	},

	devServer: {
		port: 8080,
		disableHostCheck: true,

		historyApiFallback: true,
		hot: true,

		proxy: {
			'/api/': {
				target: 'http://localhost:8081/api',
				secure: false,
				prependPath: false
			}
		}
	}
};

if (ENV === 'production') {
	config.plugins = [
		new KotlinWebpackPlugin({
			src: path.join(__dirname, 'src'),
			optimize: true,
			verbose: true
		}),
		new webpack.DefinePlugin({
			development: false,
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/[hash].vendor.js'
		}),
		new ExtractTextPlugin({
			filename: 'css/[hash].[name].css',
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true,
			compress: {
				pure_funcs: ['console.debug'],
				warnings: false
			}
		}),
		new webpack.NoEmitOnErrorsPlugin()
	];

	config.output.path = path.join(__dirname, 'dist');
	config.output.publicPath = '/';
	config.output.filename = 'js/[hash].bundle.js';
	config.devtool = 'source-map';
}

module.exports = config;
