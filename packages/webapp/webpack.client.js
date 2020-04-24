const LoadablePlugin = require('@loadable/webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  // mode: 'development',
  // Tell webpack to root file of our server app
  entry: {
    main: './src/client/client.js'
  },

  // Tell webpack where to put output file
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [new LoadablePlugin()]
};

module.exports = merge(baseConfig, config);
