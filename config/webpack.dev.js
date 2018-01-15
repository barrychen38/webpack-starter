const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackCommonConf = require('./webpack.common')
const config = require('./index')

const { host, port } = config

module.exports = webpackMerge(webpackCommonConf, {

  entry: [
    './src/js/bootstrap.js'
  ],

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader?url=false'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    host,
    port,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    hot: true
  }
})
