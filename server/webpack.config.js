const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: [ "@babel/polyfill", "../client/src/" ],
    output: {
        path: path.join(__dirname, '..', 'client', 'build'),
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '..', 'client', 'src'),
        port: 8080,
        host: `localhost`,
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: [
                    /node_modules/,
                    path.join(__dirname, 'tests'),
                    path.join(__dirname, 'src')
                ], 
                loader: "babel-loader" 
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ttf$/,
                loaders: [
                  'url-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "../client/src/index.html", to: "./index.html" },
                { from: "../client/src/main.css", to: "./main.css" }
            ]
        })
    ]
};