module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
