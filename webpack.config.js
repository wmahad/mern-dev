// const webpack = require('webpack');
const path = require('path');
// const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './src/browser/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.min.js',
    },
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    plugins: [
        // new LiveReloadPlugin(),
        // new webpack.DefinePlugin({
        //     STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
        // }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}