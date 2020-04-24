const path = require('path');

module.exports = {
    devtool: 'inline-source-map',

    entry: {
        articles: './src/pages/ArticleListPage.ts',
        home: './src/pages/HomePage.ts',
        index: './src/index.ts',
        routes: './src/Routes.ts',
    },

    output: {
        globalObject: 'this',
        library: 'main',
        libraryTarget: 'umd',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'public'),
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
    },

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
