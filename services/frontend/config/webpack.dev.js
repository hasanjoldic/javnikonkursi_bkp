const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const Dotenv = require("dotenv-webpack");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
  ],
  performance: {
    hints: false,
  },
});
