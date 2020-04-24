const LoadablePlugin = require('@loadable/webpack-plugin');
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
  //   splitChunks: {
  //     cacheGroups: {
  //       routes: {
  //         name: 'Routes',
  //         chunks: 'all',
  //         test: 'Routes'
  //       },
  //       vendors: {
  //         name: 'vendors',
  //         chunks: 'all',
  //         test: 'vendors'
  //       }
  //     }
  //   }
  // },

  // Tell webpack to root file of our server app
  entry: {
    articles: './src/pages/ArticleListPage.js',
    home: './src/pages/HomePage.js',
    main: './src/index.js',
    routes: './src/Routes.js',
    // vendors: './src/vendors.js'
  },

  // Tell webpack where to put output file
  output: {
    globalObject: 'this',
    library: 'main',
    libraryTarget: 'umd',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'public')
  },

  externals: {
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server'
    },
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'react-redux': 'react-redux',
    redux: {
      root: 'Redux',
      commonjs: 'redux',
      commonjs2: 'redux'
    },
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
    // new LoadablePlugin()
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
