const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    mode: 'development',

    devtool: 'inline-source-map',

    entry: {
        main: path.resolve(__dirname, './src/client/client.tsx'),
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },

    plugins: [new LoadablePlugin()],
};

module.exports = merge(baseConfig, config);
