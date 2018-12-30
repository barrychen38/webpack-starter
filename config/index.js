module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 5386,

    // Build hash length for css and js files
    hashLen: 10,

    // Should enable the proxy
    isProxy: false,

    /**
    * Http Proxy Middleware
    * Default used by webpack-dev-server
    *
    * See https://github.com/chimurai/http-proxy-middleware#options
    */
    proxyTable: {
        '/api': {
            target: 'http://example.com',
            changeOrigin: true,
            logLevel: 'debug',
        },
    },
}
