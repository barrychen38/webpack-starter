const path = require('path')

module.exports = {
  isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
  },
  root(pathName) {
    return path.resolve('./', pathName)
  }
}
