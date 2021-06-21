const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    "hello-world": './src/index.js',
    "kiwi-page": './src/kiwi.js'
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  mode: "production",
  plugins: [
    // new TerserPlugin(), in production env this terser plugin is included by default
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    // new CleanWebpackPlugin(
    new HTMLWebpackPlugin({
      title: "Hello World",
      description: "Hello world description",
      filename: 'hello-world.html',
      template: 'src/index.hbs',
      minify: false
    }),
    new HTMLWebpackPlugin({
      title: "KIWI",
      description: "This is kiwi page",
      filename: 'kiwi.html',
      template: 'src/kiwi.hbs',
      minify: false

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
          MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
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
