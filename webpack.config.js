const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    myAppName: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: production ? '[name].[contenthash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !production,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !production
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".scss"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack & React",
      template: path.resolve(__dirname, "src/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css'
    }),
    !production && new ReactRefreshPlugin()
  ].filter(Boolean),
  devServer: {
    port: 3000,
    open: true,
    client: {
      overlay: false,
      logging: 'warn' // Want to set this to 'warn' or 'error', What the odd thing is about the "warning", is that it is not a warning at all, it is just an info message dressed up as a warning.
    }
  },
  mode: production ? "production" : "development"
}

