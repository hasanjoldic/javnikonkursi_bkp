const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  context: path.resolve(__dirname, ".."),
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(png|jpg|gif)$/i,
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
            loader: require.resolve("file-loader"),
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
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../build"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: false,
    }),

    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
