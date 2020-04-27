const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
    mode: 'development',

    output: {
        filename: '[name].development.js',
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
});
