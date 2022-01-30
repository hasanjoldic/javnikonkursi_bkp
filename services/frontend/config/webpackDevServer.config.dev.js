const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Dotenv = require("dotenv-webpack");

module.exports = (options) => {
  return {
    mode: "development",
    entry: [
      // required to support async/await
      "@babel/polyfill",

      "./src/index.tsx",
    ],
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../build"),
      publicPath: "/",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: "url-loader",
              options: {
                limit: 10000,
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: /\.(j|t)sx?$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                },
              },
            },
            {
              test: /\.(graphql|gql)$/,
              exclude: /node_modules/,
              loader: "graphql-tag/loader",
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: "style-loader", // creates style nodes from JS strings
                },
                {
                  loader: "css-loader", // translates CSS into CommonJS
                },
              ],
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: "style-loader", // creates style nodes from JS strings
                },
                {
                  loader: "css-loader", // translates CSS into CommonJS
                },
                {
                  loader: "sass-loader", // compiles Sass to CSS
                },
              ],
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: "svg-sprite-loader",
                  options: {
                    extract: true,
                    spriteFilename: "sprite-[hash:16].svg",
                  },
                },
              ],
            },
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
    },
    devServer: {
      host: "0.0.0.0",
      port: 8080,
      historyApiFallback: true,
      hot: true,
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    plugins: [
      new CopyWebpackPlugin([{ from: "static/**/*", to: "static/.", context: "./public" }]),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: true,
      }),
      new ForkTsCheckerWebpackPlugin(),
      new SpriteLoaderPlugin(),
      new BundleAnalyzerPlugin(),
      new Dotenv(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
      hints: false,
    },
    watchOptions: {
      poll: true,
    },
  };
};
