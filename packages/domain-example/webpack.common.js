const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',

    entry: {
        articles: './src/pages/ArticleListPage.tsx',
        home: './src/pages/HomePage.tsx',
        index: './src/index.ts',
        routes: './src/routes.ts'
    },

    output: {
        globalObject: 'this',
        library: 'domain',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'public/cjs'),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
        },
        'react-redux': 'react-redux',
        redux: {
            root: 'Redux',
            commonjs: 'redux',
            commonjs2: 'redux',
        },
        'redux-saga': {
            root: 'ReduxSaga',
            commonjs: 'redux-saga',
            commonjs2: 'redux-saga',
        },
        'redux-saga/effects': {
            root: 'ReduxSagaEffects',
            commonjs: 'redux-saga/effects',
            commonjs2: 'redux-saga/effects',
        },
        '@babel/runtime/regenerator': {
            root: 'regeneratorRuntime',
            commonjs: '@babel/runtime/regenerator',
            commonjs2: '@babel/runtime/regenerator',
        },
        'react-router-config': 'react-router-config',
        'react-router-dom': 'ReactRouterDOM',
        'react-lazy-load-image-component': 'react-lazy-load-image-component',
        'react-helmet': 'react-helmet',
    },

    plugins: [new CopyPlugin([{from: path.resolve(__dirname, './src/cjs/index.js'), to: path.resolve(__dirname, 'public')}])],

    module: {
        rules: [
            {
                test: /\.ts|.tsx$/,
                exclude: /(node_modules|public)/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    },
};
