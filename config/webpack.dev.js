const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlPluginReload = require('webpack-html-plugin-reload')
const webpackCommonConf = require('./webpack.common')
const config = require('./index')
const helper = require('./helper')

const { host, port } = config

module.exports = webpackMerge(webpackCommonConf, {

  entry: [
    './src/js/bootstrap.js'
  ],

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [helper.root('src')]
      },
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
        ],
        include: [helper.root('src')]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlPluginReload()
  ],

  devServer: {
    host,
    port,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    clientLogLevel: 'none',
    overlay: { warnings: false, errors: true },
    hot: true
  }
})
