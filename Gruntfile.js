module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		conf: {
			cssCwd: 'scss',
			cssDest: 'public/css',

			jsCwd: 'scripts',
			jsDest: 'public/js'
		},

		// combine javascript
		// ===================================
		uglify: {
			libraries: {
				files: [{
					src: [
						// "<%= conf.jsCwd %>/libraries/jquery/dist/jquery.js"
					],
					dest: "<%= conf.jsDest %>/libraries.min.js"
				}]
			},

			components: {
				files: [{
					src: [
						"<%= conf.jsCwd %>/helper/*.js"
					],
					dest: "<%= conf.jsDest %>/components.min.js"
				}]
			},

			app: {
				files: [{
					src: [
						'<%= conf.jsCwd %>/*.js'
					],
					dest: "<%= conf.jsDest %>/app.min.js"
				}]
			}
		},

		// compile sass
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

		postcss: {
			options: {
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions, safari 8'}) // add vendor prefixes
				]
			},
			dist: { // = distPortal
				src: '<%= conf.cssDest %>/*.css'
			}
		},

		// ===================================
		watch: {
			scripts: {
				files: ['<%= conf.cssCwd %>/**/*.scss', '<%= conf.jsCwd %>/*.js'],
				tasks: ['sass', 'concat:js'],
				options: {
					spawn: false
				}
			}
		}
	});


	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-min');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-uglify");


	// Define Task(s)
	grunt.registerTask('default', 'sass', 'postcss', 'uglify');
	grunt.registerTask('dev', ['sass', 'uglify', 'watch']);
};