const LoadablePlugin = require('@loadable/webpack-plugin');
// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');

const config = {
    mode: 'production',

    devtool: 'inline-source-map',

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                extractComments: false,
                parallel: true,
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },

    entry: {
        index: path.resolve(__dirname, './src/client/client.tsx'),
        routes: path.resolve(__dirname, './src/client/Routes.ts'),
    },

    output: {
        filename: '[name].[fullhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.resolve(__dirname, 'public'),
    },

    plugins: [
        new LoadablePlugin(),
        new BundleAnalyzerPlugin(),
        // new CleanWebpackPlugin(),
        // new CompressionPlugin(),
    ],
};

module.exports = merge(baseConfig, config);
