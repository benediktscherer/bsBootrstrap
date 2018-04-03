module.exports = function (grunt){

  require('time-grunt')(grunt);

  var conf = {
    cssCwd: 'src/scss/',
    cssDest: 'dist/css/',

    vendorCwd: 'node_modules/',
    jsCwd: 'src/scripts/',
    jsDest: 'dist/js/',

    imgCwd: 'src/images',
    imgDest: 'dist/images',

    fontCwd: 'src/fonts',
    fontDest: 'dist/fonts'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Modernizr
     */
    modernizr: {
      dist: {
        "parseFiles": true,
        "customTests": [],
        "dest": conf.jsDest + "modernizr-output.js",
        "tests": [
          "touchevents"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },

    /**
     * Combine Javascript
     */
    uglify: {
      libraries: {
        files: [{
          src: [
            conf.vendorCwd + "jQuery/tmp/jquery.js"
          ],
          dest: conf.jsDest + "libraries.min.js"
        }]
      },

      components: {
        files: [{
          src: [
            conf.jsCwd + "components/*.js"
          ],
          dest: conf.jsDest + "components.min.js"
        }]
      },

      app: {
        files: [{
          src: [
            conf.jsCwd + '*.js'
          ],
          dest: conf.jsDest + "app.min.js"
        }]
      }
    },

    /**
     * Compile Sass
     */
    sass: {
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
          includePaths: [conf.cssCwd]
        },

        files: [{
          expand: true,
          cwd: conf.cssCwd,
          src: ['app.scss'],
          dest: conf.cssDest,
          ext: '.min.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions, safari 8'}), // add vendor prefixes
          require('postcss-discard-comments')({removeAll: true}) // remove comments
        ]
      },
      dist: {
        src: conf.cssDest + '*.css'
      }
    },

    /**
     * SassDoc
     * http://sassdoc.com/
     */
    sassdoc: {
      default: {
        src: conf.cssCwd + '**/*.scss',
        options: {
          dest: conf.cssDest + 'sassdoc/'
        }
      }
    },

    /**
     * Copy Files & Dependencies
     */
    copy: {
      javascript: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              conf.jsCwd + '/libraries/html5shiv.js',
              conf.jsCwd + '/libraries/modernizr-output.js'
            ],
            dest: conf.jsDest
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.imgCwd,
            src: '**',
            dest: conf.imgDest
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.fontCwd,
            src: ['*/**.otf', '*/*.eot', '*/**.svg', '*/**.ttf', '*/**.woff', '*/**.woff2'],
            dest: conf.fontDest
          }
        ]
      }
    },

    /**
     * Watch Tasks
     */
    watch: {
      scripts: {
        files: [
          conf.cssCwd + '**/*.scss',
          conf.jsCwd + '*.js'
        ],
        tasks: ['sass', 'sassdoc', 'uglify:components', 'uglify:app'],
        options: {
          spawn: false
        }
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks("grunt-modernizr");

  // Define Task(s)
  grunt.registerTask('default', ['modernizr', 'uglify', 'sass', 'postcss', 'copy']);
  grunt.registerTask('dev', ['default', 'sassdoc', 'watch']);
};