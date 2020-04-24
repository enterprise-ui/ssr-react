const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  mode: 'development',

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'public')
  },

  resolve: {
    modules: ['node_modules']
  },

  externals: [webpackNodeExternals()],

  plugins: [new CleanWebpackPlugin()]
};

module.exports = merge(baseConfig, config);
