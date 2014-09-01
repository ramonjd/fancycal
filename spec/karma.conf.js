module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [

            //vendor
            'src/js/vendor/jquery/jquery.js',

            // code
            'src/locale/de-DE/fc.settings.js',
            'src/js/fc.views.js',
            'src/js/fc.utils.js',
            'src/js/fc.calendar.js',
            'src/js/fc.fancycal.js',

            //tests
            'spec/*.spec.js'
        ],
        singleRun: true,
        colors: true,
        browserNoActivityTimeout: 60000,
        port: 9876,

        browsers: ['PhantomJS'],
        //browsers: ['Chrome'],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress'],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ]

    });
};