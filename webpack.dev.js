const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',

    output: {
        filename: 'js/[name].js',
    },

    plugins: [
        new KotlinWebpackPlugin({
            src: path.join(__dirname, 'src'),
            verbose: true,
            librariesAutoLookup: true
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'inline-source-map',

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
});
