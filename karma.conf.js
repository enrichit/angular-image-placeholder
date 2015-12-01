module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'src/index.js',
        'specs/*.js'
    ],

    exclude: [],

    port: 8080,

    logLevel: config.LOG_DEBUG,

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: true
  });
};