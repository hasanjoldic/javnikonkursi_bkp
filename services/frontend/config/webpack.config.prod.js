const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Dotenv = require("dotenv-webpack");

module.exports = function (env) {
  return {
    mode: "production",
    bail: true,
    context: path.resolve(__dirname, ".."),
    entry: [
      // required to support async/await
      "@babel/polyfill",

      "./src/index.tsx",
    ],
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
                  babelrc: false,
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: {
                          chrome: "79",
                          firefox: "72",
                        },
                      },
                    ],
                    "@babel/preset-typescript",
                    "@babel/preset-react",
                  ],
                  plugins: [
                    [
                      "@babel/plugin-proposal-class-properties",
                      { loose: true },
                    ],
                    [
                      "@babel/plugin-proposal-private-property-in-object",
                      { loose: true },
                    ],
                    ["@babel/plugin-proposal-private-methods", { loose: true }],
                    [
                      "babel-plugin-import",
                      {
                        libraryName: "@material-ui/core",
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: "esm",
                        camel2DashComponentName: false,
                      },
                      "core",
                    ],
                    [
                      "babel-plugin-import",
                      {
                        libraryName: "@material-ui/icons",
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: "esm",
                        camel2DashComponentName: false,
                      },
                      "icons",
                    ],
                  ],
                },
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
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      path: path.resolve(__dirname, "../build"),
      publicPath: "/",
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: "static/**/*", to: "static/.", context: "./public" },
      ]),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env || "production"),
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: true,
      }),
      // new CleanWebpackPlugin({
      //   clea: [path.resolve(__dirname, "../build")],
      // }),
      new SpriteLoaderPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /chartjs$/),
      new Dotenv(),
      // new BundleAnalyzerPlugin(),
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
  };
};
