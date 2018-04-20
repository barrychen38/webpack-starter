const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');

const config = require('./index')
const helper = require('./helper')
const headTags = require('./head-meta-config')

const metadata = {
  isDev: helper.isWebpackDevServer()
}

module.exports = {

  resolve: {
    extensions: ['.js', '.scss']
  },

  module: {
    rules: [
      {
        test: /[^index]\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: true
          }
        }
      },
      {
        test: /index.html$/,
        use: 'raw-loader',
        exclude: [helper.root('src/index.html')]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader', 'postcss-loader'],
        exclude: [helper.root('src')]
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader?url=false',
          'postcss-loader',
          'sass-loader?url=false'
        ],
        exclude: [helper.root('src')]
      },
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
      template: helper.root('src/index.html'),
      metadata,
      inject: true
    }),
    new HtmlElementsWebpackPlugin({
      headTags
    })
  ]
}
