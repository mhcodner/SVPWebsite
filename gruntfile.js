module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                files: {
                    'style.css': [
                        'style-src.css',
                        'css/normalize.css',
                        'css/skeleton.css',
                        'css/loading-bar.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: false
            },
            applib: {
                src: [
                    'js/vendor/jquery-2.1.4.min.js',
                    'js/vendor/angular.min.js',
                    'js/vendor/angular-sanitize.min.js',
                    'js/vendor/angular-route.min.js',
                    'js/vendor/angular-animate.min.js',
                    'js/vendor/angular-resource.min.js',
                    'js/vendor/loading-bar.js',
                    'js/app.js',
                    'js/main.js'
                ],
                dest: 'js/bundle.js'
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css', '!js/bundle.js'],
                tasks: ['uglify', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });
    // Default task.
    grunt.registerTask('default', ['uglify', 'cssmin']);
};