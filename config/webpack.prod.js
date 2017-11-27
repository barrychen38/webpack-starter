const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common')

const config = require('./index')
const helper = require('./helper')

const METADATA = {
  title: config.title,
  isDev: helper.isWebpackDevServer()
}

module.exports = webpackMerge(webpackCommonConf, {

  entry: {
    app: './src/js/bootstrap.js'
  },

  output: {
    path: helper.root('dist'),
    filename: 'js/[name].[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      metadata: METADATA,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      inject: true
    }),
    new ExtractTextPlugin('css/[name].[contenthash:20].css'),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      compress: {
        drop_console: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      }
    })
  ]
})
