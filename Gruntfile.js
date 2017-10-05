module.exports = function (grunt) {

	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		conf: {
			cssCwd: 'scss',
			cssDest: 'public/css',

			vendorCwd: 'vendor/components',
			jsCwd: 'scripts',
			jsDest: 'public/js'
		},

		/**
		 * Modernizr
		 */
		modernizr: {
			dist: {
				"parseFiles": true,
				"customTests": [],
				// "devFile": "/PATH/TO/modernizr-dev.js",
				"dest": "<%= conf.jsCwd %>/libraries/modernizr-output.js",
				"tests": [
					// Tests
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
						"<%= conf.vendorCwd %>/jquery/jquery.min.js",
						"<%= conf.jsCwd %>/libraries/modernizr-output.js"
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

		/**
		 * Compile Sass
		 */
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
			dist: { // = distPortal
				src: '<%= conf.cssDest %>/*.css'
			}
		},

		/**
		 * Watch Tasks
		 */
		watch: {
			scripts: {
				files: ['<%= conf.cssCwd %>/**/*.scss', '<%= conf.jsCwd %>/*.js'],
				tasks: ['sass', 'uglify:components', 'uglify:app'],
				options: {
					spawn: false
				}
			}
		}
	});


	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-composer");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks("grunt-modernizr");


	// Define Task(s)
	grunt.registerTask('default', 'composer:install', 'modernizr', 'uglify', 'sass', 'postcss');

	grunt.registerTask('dev', ['default', 'watch']);
	grunt.registerTask('composer', 'composer:install');
};