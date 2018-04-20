const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

config = {
  entry:  './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
            path.resolve(__dirname, 'node_modules')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
                ['env', { modules: false }],
                'react'
            ]
          }
        }]
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'less-loader'}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  "mode": process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      inject: 'body'
    })
  ]
}

module.exports = config