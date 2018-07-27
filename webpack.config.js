const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');

const entry = {
    bundle: 'kotlinApp'
};

const dependencies = () => Object.keys(JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'})).dependencies)

if (dependencies.length > 0) {
    entry['vendor'] = dependencies;
}

const config = {
    context: path.join(__dirname, 'src'),
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['kotlin_build', 'node_modules']
    },

    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new KotlinWebpackPlugin({
            src: path.join(__dirname, 'src'),
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: '../resources/index.html'
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 1024,
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    limit: 1024,
                    name: 'fonts/[name].[ext]?[hash]'
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

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
        new KotlinWebpackPlugin({
            src: path.join(__dirname, 'src'),
            optimize: true,
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[hash].[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ];

    config.optimization = {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        warnings: true
                    }
                }
            })
        ]
    };

    config.output.path = path.join(__dirname, 'dist');
    config.output.publicPath = '/';
    config.output.filename = 'js/[hash].[name].js';
    config.devtool = 'source-map';
}

module.exports = config;
