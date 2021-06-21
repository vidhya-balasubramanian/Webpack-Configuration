const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    index: "index.html",
    port: 9000,
    writeToDisk: true
  },
  plugins: [
    // new TerserPlugin(), we don't need to minify our code in dev
    // new MiniCssExtractPlugin({ filename: "style.[contenthash].css" }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    // new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "Hello World",
      template: "src/index.hbs",
      description: "some description"
    })
  ],
  module: {
    rules: [
      // for reference
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset/resource'
      // }
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset/inline'
      // }
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb upto this size it will treat as assets inline
          },
        },
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: ["style-loader", 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", "css-loader", "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/env"],
            plugins: [ "@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"]
      },
    ],
  }
};
