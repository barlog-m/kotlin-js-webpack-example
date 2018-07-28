const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: 'kotlinApp',

    context: path.join(__dirname, 'src'),

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },

    resolve: {
        modules: ['kotlin_build', 'node_modules']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../kotlin_build'),
                exclude: [/kotlin\.js$/],
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
    }
};
