module.exports = function (grunt){

  require('time-grunt')(grunt);

  let conf = {
    cwd: 'src/',
    dest: 'dist/',

    cssCwd: 'src/scss/',
    cssDest: 'dist/css/',

    vendorCwd: 'node_modules/',
    jsCwd: 'src/scripts/',
    jsDest: 'dist/js/',
    jsCompile: 'src/scripts/_tmp/',

    imgCwd: 'src/images',
    imgDest: 'dist/images',

    fontCwd: 'src/fonts',
    fontDest: 'dist/fonts',

    tmplCwd: 'src/templates/',
    tmplDest: 'dist/templates/',

    incCwd: 'src/inc/',
    incDest: 'dist/inc/'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Compile TypeScript
     * https://www.npmjs.com/package/grunt-ts
     */
    ts: {
      options: {
        allowJs: false,
        target: 'es5',
        rootDir: conf.jsCwd,
        sourceMap: false,
        strictNullChecks: false,
        noImplicitReturns: false,
        noImplicitThis: false,
        noUnusedLocals: false,
        pretty: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      },

      default: {
        src: [
          conf.jsCwd + '**/*.ts'
        ],
        outDir: conf.jsCompile,
        reference: conf.jsCwd + 'typings/references.ts'
      }
    },


    /**
     * Minify files with UglifyJS and move to dist
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      libraries: {
        files: [{
          src: [
            conf.vendorCwd + "jQuery/tmp/jquery.js",
            conf.vendorCwd + "nunjucks/browser/nunjucks.js"
          ],
          dest: conf.jsDest + "libraries.min.js"
        }]
      },

      components: {
        files: [{
          src: conf.jsCompile + 'components/**/*.js',
          dest: conf.jsDest + 'components.min.js'
        }]
      },

      helper: {
        files: [{
          src: conf.jsCompile + 'helper/**/*.js',
          dest: conf.jsDest + 'helper.min.js'
        }]
      },

      app: {
        files: [{
          src: conf.jsCompile + '*.js',
          dest: conf.jsDest + 'app.min.js'
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
      index: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: './',
            src: 'index.html',
            dest: conf.dest
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
      },
      templates: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.tmplCwd,
            src: ['**.html', '**.json'],
            dest: conf.tmplDest
          }
        ]
      },
      inc: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.incCwd,
            src: ['**.*'],
            dest: conf.incDest
          }
        ]
      }
    },


    /**
     * Watch Tasks
     */
    watch: {
      css: {
        files: [
          conf.cssCwd + '**/*.scss'
        ],
        tasks: ['sass', 'sassdoc'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: [
          conf.jsCwd + '**/*.ts'
        ],
        tasks: ['ts', 'uglify'],
        options: {
          spawn: false
        }
      },
      index: {
        files: './index.html',
        tasks: ['copy:index'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: [
          conf.tmplCwd + "**/*.html",
          conf.tmplCwd + "**/*.json"
        ],
        tasks: ['copy:templates'],
        options: {
          spawn: false
        }
      }
    }
  });


  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sassdoc');

  grunt.registerTask("set_dev_options", "Set Config variables for dev tasks", function (){
    grunt.config.set("uglify.options.sourceMap", true);
    grunt.config.set("uglify.options.mangle", false);
    grunt.config.set("uglify.options.beautify", true);
  });

  // Define Task(s)
  grunt.registerTask('default', ['ts', 'uglify', 'sass', 'postcss', 'copy']);
  grunt.registerTask('dev', ['set_dev_options', 'default', 'sassdoc', 'watch']);
};