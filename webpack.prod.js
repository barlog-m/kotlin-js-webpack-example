const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: 'js/[name].[chunkhash].js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist', 'kotlin_build']),
        new KotlinWebpackPlugin({
            src: path.join(__dirname, 'src'),
            optimize: true,
            verbose: true,
            librariesAutoLookup: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
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
    }
});
