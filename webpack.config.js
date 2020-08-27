const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader'
                }
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },

            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },

            {
                test: /\.s[ca]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            fileName: '[name].css',
            chunkFilename: '[id].css'
        })
    ],

    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
    }
};