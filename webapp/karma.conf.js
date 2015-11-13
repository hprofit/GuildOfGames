module.exports = function (config) {
    var TEST_ROOT = 'tests/spec/',
        SCRIPT_ROOT = 'src/',
        DIST_ROOT = 'dist/',
        BOWER_COMP_ROOT = 'bower_components/',
        NODE_MODULE_ROOT = 'node_modules/';

    config.set({
        basePath: '',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            BOWER_COMP_ROOT + 'jquery/dist/jquery.js',
            BOWER_COMP_ROOT + 'angular/angular.js',
            BOWER_COMP_ROOT + 'angular-mocks/angular-mocks.js',
            BOWER_COMP_ROOT + 'angular-ui-router/release/angular-ui-router.js',
            BOWER_COMP_ROOT + 'angular-bootstrap/ui-bootstrap.js',
            BOWER_COMP_ROOT + 'lodash/lodash.js',
            BOWER_COMP_ROOT + '/restangular/dist/restangular.js',

            DIST_ROOT + 'templates/guildOfGames-templates.js',

            SCRIPT_ROOT + '**/*.js',

            TEST_ROOT + '*.js'
        ],

        preprocessors: {
            '**/directives/**/*.js': 'coverage',
            '**/controllers/**/*.js': 'coverage',
            '**/models/**/*.js': 'coverage',
            '**/services/**/*.js': 'coverage'
            //'src/app.js': 'coverage'
            //'exampleSvg.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'guildOfGames.templates'
        },

        coverageReporter: {
            dir: 'tests/jstest/coverage',
            reporters: [
                {
                    type: 'html'
                },
                {
                    type: 'text'
                }
            ]
        },

        // list of files / patterns to exclude
        exclude: [
            SCRIPT_ROOT + 'app.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        htmlReporter: {
            outputDir: 'tests/karma_html',
            templatePath: 'node_modules/karma-html-reporter/jasmine_template.html'
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // web server port
        port: 8082,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};