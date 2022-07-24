const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //[contenthash] is to making a hash
        clean: true, // for making just 1 bundle.js file and keeping dist folder clean
        assetModuleFilename: '[name][ext]' // doesn't rename your imges!
    },
    devtool: 'source-map', // to create a map which could help us with debugging
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            { // style-loader, css-loader, sass-loader
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            { // babel-loader (to make code backwards compatible with older browsers)
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
            { //img-loader
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Webpack Plus Sass Project',
            filename: 'index.html',
            template: 'src/template.html',
        }),
    ],
}
