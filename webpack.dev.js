'use strict';

const webpack = require("webpack");
const path = require("path");

const merge = require("webpack-merge"),
  common = require('./webpack.common.js');



const externals = [];

const DEVELOPMENT = {
  mode: 'development',
  entry: {
    // vendor: ['@babel/polyfill'],
    client: path.resolve(__dirname, "src/index.js")
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial", 
          name: "vendor", 
          reuseExistingChunk: true,
          priority: -10,
          enforce: true
        }, 
      }
    }
  },
  devServer: {

    contentBase: path.resolve(__dirname, "src"),
    watchContentBase: true,
    host: "0.0.0.0",
    port: 8080,
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = merge(common, DEVELOPMENT)
