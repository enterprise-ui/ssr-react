const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // mode: 'development',
  target: 'node',

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

  // optimization: {
  //   minimizer: [
  //     // we specify a custom UglifyJsPlugin here to get source maps in production
  //     new UglifyJSPlugin({
  //       cache: true,
  //       parallel: true,
  //       uglifyOptions: {
  //         compress: false,
  //         ecma: 6,
  //         mangle: true
  //       },
  //       sourceMap: false
  //     })
  //   ],
  // },

  // Tell webpack to root file of our server app
  entry: {
    index: './src/index.js',
  },

  // Tell webpack where to put output file
  output: {
    globalObject: 'this',
    library: 'index',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'react-redux': 'react-redux',
    'redux-saga': {
      root: 'ReduxSaga',
      commonjs: 'redux-saga',
      commonjs2: 'redux-saga'
    },
    'redux-saga/effects': {
      root: 'ReduxSagaEffects',
      commonjs: 'redux-saga/effects',
      commonjs2: 'redux-saga/effects'
    },
    '@babel/runtime/regenerator': {
      root: 'regeneratorRuntime',
      commonjs: '@babel/runtime/regenerator',
      commonjs2: '@babel/runtime/regenerator'
    }
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    // new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  },
};
