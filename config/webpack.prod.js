/* eslint-disable import/no-extraneous-dependencies */
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common')

const config = require('./index')
const helper = require('./helper')

const METADATA = {
    isDev: helper.isWebpackDevServer(),
}

module.exports = webpackMerge(webpackCommonConf, {

    entry: {
        app: './src/js/bootstrap.js',
    },

    output: {
        path: helper.root('dist'),
        filename: `js/[name].[hash:${config.hashLen}].js`,
    },

    module: {
        rules: [ {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader',
            }),
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!sass-loader',
            }),
        } ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            metadata: METADATA,

            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                caseSensitive: true,
                keepClosingSlash: true,
                collapseBooleanAttributes: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyJS: true,
                minifyCSS: true,
            },
            inject: true,
        }),
        new ExtractTextPlugin(`css/[name].[contenthash:${config.hashLen}].css`),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                beautify: false,
                output: {
                    comments: false,
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
                    negate_iife: false,
                },
            },
        }),
    ],
})
