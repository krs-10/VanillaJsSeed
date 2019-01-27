"use strict";

const webpack = require("webpack"),
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const merge = require("webpack-merge"), 
  common = require('./webpack.common.js');

const externals = [];

const PRODUCTION = {
  mode: "production",
  entry: {
    client: path.resolve(__dirname, "src/index.js")
  },
  output: {
    publicPath: ""
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              mergeIdents: true,
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\/]node_modules[\\/](${externals.join("|")})[\\/]`
          ),
          chunks: "all",
          name: "vendors",
          reuseExistingChunk: true
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          { loader: "postcss-loader" }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("build", {}),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    // new BundleAnalyzerPlugin({ open: true })
    // new WebpackMd5Hash
  ]
};


module.exports = merge(common, PRODUCTION)
