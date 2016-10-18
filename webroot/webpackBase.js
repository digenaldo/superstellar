const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: ["babel-polyfill", "./js/game.js"],
        vendor: ['protobufjs', 'pixi.js']
    },
    output: {
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: path.resolve(__dirname, 'node_modules', 'pixi.js'),
            loader: 'ify'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.DefinePlugin({
            'BACKEND_HOST': JSON.stringify(process.env.BACKEND_HOST || 'localhost'),
            'BACKEND_PORT': JSON.stringify(process.env.BACKEND_PORT || '8080'),
            '__DEBUG__': process.env.DEBUG

        })
    ],
    postLoaders: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform/cacheable?brfs'
    }]
};