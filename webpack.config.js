// const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 80000,
                        name: './img/[name]_[hash].[ext]'
                    }
                }
            },
        ],
    },
    plugins: [
        new LiveReloadPlugin(),
        new MiniCssExtractPlugin({ filename: 'styles.min.css' }),
        // new webpack.DefinePlugin({
        //     STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
        // }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}