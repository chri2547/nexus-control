module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        cwd: 'assets',
                        expand: true,
                        src: ['images/**/*', 'fonts/**/*'],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/css/main.css': 'build/css/main.css'
                }
            }
        },
        deconst_assets: {
            assets: {
                options: {
                    files: ['build/fonts/**/*', 'build/images/**/*'],
                    output: [
                        {
                            dest: 'assets/less/drc/deconst-variables.less',
                            format: 'less'
                        }
                    ]
                }
            },
            css_js: {
                options: {
                    files: ['build/css/main.css', 'build/js/main.js']
                }
            }
        },
        empty: {
            less_vars: {
                options: {
                    files: ['assets/less/drc/deconst-variables.less']
                }
            }
        },
        less: {
            dev: {
                options: {
                    dumpLineNumbers: 'comments'
                },
                files: {
                    'assets/css/main.css': 'assets/less/drc/main.less'
                }
            },
            build: {
                files: {
                    'build/css/main.css': 'assets/less/drc/main.less'
                }
            }
        },
        uglify: {
            dev: {
                files: {
                    'assets/js/main.js': [
                        'assets/js/drc/lib/jquery/jquery-1.11.1.js',
                        'assets/js/drc/lib/jquery/jquery.cookie-1.4.1.js',
                        'assets/js/drc/lib/bootstrap/collapse.js',
                        'assets/js/drc/lib/bootstrap/dropdown.js',
                        'assets/js/drc/lib/bootstrap/tooltip.js',
                        'assets/js/drc/lib/bootstrap/tab.js',
                        'assets/js/drc/core.js',
                        'assets/js/drc/pages/sponsorship.js',
                        'assets/js/drc/pages/docs.js',
                        'assets/js/drc/pages/devtrial.js',
                        'assets/js/drc/pages/signup.js',
                        'assets/js/drc/pages/user-guides.js',
                        'assets/js/drc/pages/home.js',
                        'assets/js/drc/app.js'
                    ]
                }
            },
            build: {
                files: {
                    'build/js/main.js': [
                        'assets/js/drc/lib/jquery/jquery-1.11.1.js',
                        'assets/js/drc/lib/jquery/jquery.cookie-1.4.1.js',
                        'assets/js/drc/lib/bootstrap/collapse.js',
                        'assets/js/drc/lib/bootstrap/dropdown.js',
                        'assets/js/drc/lib/bootstrap/tooltip.js',
                        'assets/js/drc/lib/bootstrap/tab.js',
                        'assets/js/drc/core.js',
                        'assets/js/drc/pages/sponsorship.js',
                        'assets/js/drc/pages/docs.js',
                        'assets/js/drc/pages/devtrial.js',
                        'assets/js/drc/pages/signup.js',
                        'assets/js/drc/pages/user-guides.js',
                        'assets/js/drc/pages/home.js',
                        'assets/js/drc/app.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['assets/less/drc/**/*.less'],
                options: {

                },
                tasks: ['less:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-deconst-assets');

    grunt.registerMultiTask('empty', function () {
        var files = grunt.file.expand({filter: 'isFile'}, this.options().files);
        files.forEach(function (file, index, scope) {
            grunt.log.writeln('Emptying ' + file);
            grunt.file.write(file, '');
        });
    });

    grunt.registerTask('dev', [
        'empty:less_vars',
        'less:dev',
        'uglify:dev'
    ]);

    grunt.registerTask('build', [
        'copy:build',
        'deconst_assets:assets',
        'less:build',
        'cssmin:build',
        'uglify:build',
        'deconst_assets:css_js'
    ]);

};
