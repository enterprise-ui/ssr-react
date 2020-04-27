const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

/**
 * Migration to v5 from v4.
 * When passing a function in an external option, it has now a different signature ({ context, request }, callback).
 */
const nodeExternals = (options) => ({context, request}, callback) => webpackNodeExternals(options)(context, request, callback);

const config = {
    target: 'node',

    mode: 'development',

    entry: path.resolve(__dirname, './src/index.ts'),

    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'public'),
    },

    resolve: {
        modules: ['node_modules'],
    },

    externals: [
        nodeExternals({
            modulesDir: path.resolve(__dirname, './node_modules'),
        }),
        nodeExternals({
            modulesDir: path.resolve(__dirname, '../../node_modules'),
        }),
    ],
};

module.exports = merge(baseConfig, config);
