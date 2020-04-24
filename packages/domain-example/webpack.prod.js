const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
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

    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
