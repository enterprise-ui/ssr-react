const webpack = require('webpack');
const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',

  devtool: 'inline-source-map',

  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },

  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        routes: {
          name: 'Routes',
          chunks: 'all',
          test: 'Routes'
        },
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: 'vendors'
        }
      }
    }
  },

  // Tell webpack to root file of our server app
  entry: {
    index: './src/client/client.js',
    routes: './src/client/Routes.js',
    vendors: './src/client/vendors.js'
  },

  // Tell webpack where to put output file
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, 'public')
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    // new CleanWebpackPlugin(),
    // new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = merge(baseConfig, config);
