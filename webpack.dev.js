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
            src: path.join(__dirname, 'main'),
            verbose: true,
            librariesAutoLookup: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './asset/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'source-map',

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
