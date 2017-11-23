const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./index');
const helper = require('./helper');

const METADATA = {
  title: config.title,
  isDev: helper.isWebpackDevServer()
}

module.exports = {

  resolve: {
    extensions: ['.js', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: 'assets'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      metadata: METADATA,
      inject: true
    }),
  ]
}
