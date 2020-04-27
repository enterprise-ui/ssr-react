const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
    mode: 'production',

    output: {
        filename: '[name].production.min.js',
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                extractComments: false,
                parallel: true,
            }),
        ],
    },

    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
