/*

 set locale (default is en-GB)
 grunt --locale=xx-YY


 */


module.exports = function (grunt) {
    'use strict';

    // Default vars
    var _localServerPortNumber = 9001,
        _locale = grunt.option('locale') || 'en-GB';

    console.log('USING LOCALE: ' + _locale);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-html-convert');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default tasks
    grunt.registerTask('default', ['env:dev', 'bower', 'compass', 'htmlConvert', 'preprocess:dev', 'jshint', 'karma']);
    grunt.registerTask('server', ['env:dev', 'express', 'open', 'watch', 'preprocess:dev']);
    grunt.registerTask('build', ['env:prod', 'clean:build', 'compass', 'htmlConvert', 'copy:build', 'concat', 'preprocess:prod', 'compress']);

    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        locale: _locale,
        karma: {
            unit: {
                configFile: 'spec/karma.conf.js'
            }
        },
        jshint: {
            files: ['src/js/*.js', 'dev/**/*.js'],
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'dev/css'
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'src/js/vendor'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:' + _localServerPortNumber
            }
        },
        express: {
            server: {
                options: {
                    port: _localServerPortNumber,
                    bases: ['dev', 'src']
                }
            }
        },
        watch: {
            html: {
                files: ['src/index-template.html'],
                tasks: ['preprocess:dev'],
                options: {
                    livereload: true
                }
            },
            preprocess: {
                files: ['dev/index.html'],
                options: {
                    livereload: true
                }
            },
            views: {
                files: ['src/views/*.html'],
                tasks: ['htmlConvert'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['src/js/*.js', 'src/locale/**/*.js', '!src/js/fc.views.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: '**/*.scss',
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        },
        clean: {
            build: ['dist'],
            dev: ['dev']
        },
        copy: {
            // incomplete - just prepares a directory to zip
            build: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['dev/css/*.css'],
                        dest: 'dist/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['js/vendor/**/*.js'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        env: {

            dev: {

                NODE_ENV: 'DEVELOPMENT'

            },

            prod: {

                NODE_ENV: 'PRODUCTION'

            }

        },
        preprocess: {
            prod: {
                options: {
                    context: {
                        DEBUG: true,
                        LOCALE: '<%= locale %>',
                        GENERATED: '<%= grunt.template.today("UTC:h:MM:ss TT Z") %>'
                    }
                },
                src: 'src/index-template.html',
                dest: 'dist/index.html'

            },
            dev: {
                options: {
                    context: {
                        DEBUG: true,
                        LOCALE: '<%= locale %>',
                        GENERATED: '<%= grunt.template.today("UTC:h:MM:ss TT Z") %>'
                    }
                },
                src: 'src/index-template.html',
                dest: 'dev/index.html'
            }
        },
        htmlConvert: {
            all: {
                options: {
                    base: 'src/views',
                    module: 'fcviews',
                    quoteChar: '\'',
                    indentString: '    ',
                    fileHeaderString: '/* fcviews */\n'
                },
                src: ['src/views/*.tpl.html'],
                dest: 'src/js/fc.views.js'
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'fancycal.zip'
                },
                files: [
                    {
                        src: ['dist/**'],
                        dest: 'fancycal/'
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("UTC:h:MM:ss TT Z") %> */'
            },

            basic: {
                src: ['src/js/fc.calendar.js', 'src/js/fc.fancycal.js'],
                dest: 'dist/js/fc-calendar-bundle.js'
            },
            extras: {
                src: ['src/locale/<%= locale %>/fc.settings.js', 'src/js/fc.utils.js', 'src/js/fc.views.js'],
                dest: 'dist/js/fc-core.js'
            }
        }
    });
};