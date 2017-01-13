module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    conf: {
        cssCwd: 'css',
        cssDest: 'css',
        
        jsCwd: 'js',
        jsDest: 'js'
    },

    // combine javascript
    // ===================================
    concat: {
      options: {
        stripBanners: false,
      },
      js: {
        src: ['<%= conf.jsCwd %>/*.js', '<%= conf.jsCwd %>/helper/*.js', '!<%= conf.jsCwd %>/script.js'],
        dest: '<%= conf.jsDest %>/script.js'
      }
    },

    min: {
      dist: {
        src: ['<%= conf.jsDest %>/script.js'],
        dest: '<%= conf.jsDest %>/script.min.js'
      }
    },


    // compile sass > css > css.min
    // ==================================
    sass: {
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
          includePaths: ['<%= conf.cssCwd %>/']
        },

        files: [{
          expand: true,
          cwd: '<%= conf.cssCwd %>/',
          src: ['app.scss'],
          dest: '<%= conf.cssDest %>/',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: '<%= conf.cssCwd %>/',
          src: ['*.css'],
          dest: '<%= conf.cssDest %>/',
          ext: '.min.css'
        }]
      }
    },


    // ===================================
    watch: {
      scripts: {
        files: ['<%= conf.cssCwd %>/**/*.scss', '<%= conf.jsCwd %>/*.js'],
        tasks: ['sass', 'concat:js'],
        options: {
          spawn: false,
        },
      },
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-min');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Define Task(s)
  grunt.registerTask('default', 'sass');
  grunt.registerTask('dev', ['sass', 'concat', 'watch']);
  grunt.registerTask('live', ['sass', 'cssmin', 'concat', 'min']);


};