'use strict'
const path = require('path');

module.exports = {
    entry: {
        main: ['/public/src/main.js']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [],
    devServer: {
        host: 'localhost',
        port: 8080
    }
}