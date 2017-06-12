let sharedConfig = require('./shared.conf.js')

module.exports = function(config) {
  let conf = {
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/*.js',
      'app/test/*.spec.js'
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true
  }

  config.set(Object.assign(conf, sharedConfig))
}