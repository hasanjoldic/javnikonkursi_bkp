const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new BundleAnalyzerPlugin()],
  performance: {
    hints: false,
  },
  watchOptions: {
    poll: true,
  },
});
