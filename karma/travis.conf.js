let sharedConfig = require('./shared.conf.js');

module.exports = function(config) {
  let conf = {
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/src/*.js',
      'app/test/*.spec.js'
    ],
    preprocessors: {
      'app/src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    browsers: ['ChromeHeadless'], 
    singleRun: true,
  }

  config.set(Object.assign(conf, sharedConfig))
}