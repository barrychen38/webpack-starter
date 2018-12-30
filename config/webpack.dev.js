/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlPluginReload = require('webpack-html-plugin-reload')
const SpritesmithPlugin = require('webpack-spritesmith')
const webpackCommonConf = require('./webpack.common')
const config = require('./index')
const helper = require('./helper')

const { host, port, isProxy, proxyTable } = config

let proxy = {}

if (isProxy) {
    proxy = proxyTable
}

module.exports = webpackMerge(webpackCommonConf, {

    entry: [
        './src/js/bootstrap.js',
    ],

    devtool: 'cheap-module-source-map',

    resolve: {
        modules: [ 'node_modules', 'spritesmith-generated' ],
    },

    module: {
        rules: [ {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader', 'postcss-loader' ],
            include: [ helper.root('src') ],
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                'postcss-loader',
                'sass-loader?url=false',
            ],
            include: [ helper.root('src') ],
        },
        {
            test: /\.png$/,
            loaders: [
                'file-loader?name=i/[hash].[ext]',
            ],
        } ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlPluginReload(),
        new SpritesmithPlugin({
            src: {
                cwd: helper.root('src/sprite'),
                glob: '*.(png|jpg|jpeg)',
            },
            target: {
                image: helper.root('src/assets/images/sprite.png'),
                css: helper.root('src/sass/_sprite.scss'),
            },
            apiOptions: {
                cssImageRef: '../assets/images/sprite.png',
            },
        }),
    ],

    devServer: {
        host,
        port,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        clientLogLevel: 'none',
        overlay: {
            warnings: false,
            errors: true,
        },
        hot: true,

        // See https://webpack.js.org/configuration/dev-server/#devserver-proxy
        proxy,
    },
})
