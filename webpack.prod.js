"use strict";

const webpack = require("webpack"),
  path = require("path"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CompressionPlugin = require('compression-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  OfflinePlugin = require("offline-plugin"),
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  


const TerserPlugin = require("terser-webpack-plugin");

const merge = require("webpack-merge"),
  common = require("./webpack.common.js");

const externals = [];

const PRODUCTION = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "src/sw.js"),
    path.resolve(__dirname, "src/index.js")  
  ],
  output: {
    publicPath: ""
  },
  optimization: {
    minimize: true,
    mangleWasmImports: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          mangle: true
        }
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
    new CleanWebpackPlugin("dist", {}),
    new webpack.AutomaticPrefetchPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CopyWebpackPlugin(
      [{ from: "src/assets", to: "assets" }]
    ),
    new CompressionPlugin(),
    new OfflinePlugin()
  ]
};

module.exports = merge(common, PRODUCTION);
