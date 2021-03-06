module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		env: {
			options: {
				//Shared Options Hash
			},
			development: {
				NODE_ENV: 'development',
				PORT: 3000
			},
			production: {
				NODE_ENV: 'production',
				PORT: 3000
			}
		},
		coffeelint: {
			options: {
				'no_tabs': {
					'level': 'ignore'
				},
				'indentation': {
					'level': 'ignore'
				}
				,
				'max_line_length': {
					'level': 'ignore'
				}
			},
			app: ['index.coffee', 'tests/**/*.coffee', 'app/**/ *.coffee', 'public/**/*.coffee']
		},
		karma: {
			single: {
				configFile: 'config/karma.coffee',
				singleRun: true
			},
			watch: {
				configFile: 'config/karma.coffee',
				singleRun: false
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "./public/js/",
					name: "main",
					mainConfigFile: "./config/requirejs.js",
					out: "./public/js/optimized.js"
				}
			}
		},
		copy: {
				production: {
					files: [
						{src: ['public/js/optimized.js'], dest: 'public/js/main.js', filter: 'isFile'}
					]
				},
				development: {
					files: [
						{src: ['config/requirejs.js'], dest: 'public/js/main.js', filter: 'isFile'}
					]
				}
		},
		concat: {
			allLessFilesToOneMain: {
					src: ['public/css/dev/**/*.less'],
					dest: 'public/css/main.less'
				}
		},
		concurrent: {
	      development: {
	          tasks: [ 'watch','nodemon'],
	          options: {
	              logConcurrentOutput: true
	          }
	      }
	  },
   	nodemon: {
	      development: {
	          options: {
	              watchedFolders: ['app', 'config'],
	              delayTime: 5
	          }
	      }
	  },
		watch: {
			files: ['index.coffee', 'tests/**/*.coffee', 'public/**/*.coffee', 'public/css/dev/**/*.less', 'app/**/*.coffee'],
			tasks: ['coffeelint', 'coffee', 'mochaTest', 'concat:allLessFilesToOneMain','less:development', 'karma:single']
		},
		coffee: {
			compile_app: {
				expand: true,
				flatten: false,
				cwd: 'app/',
				src: ['./**/*.coffee'],
				dest: 'app/',
				ext: '.js'
			},
			compile_index : {
				files: {
					'index.js': 'index.coffee'
				}
			},
			compile_frontend: {
				expand: true,
				flatten: false,
				cwd: 'public/js/',
				src: ['**/*.coffee'],
				dest: 'public/js/',
				ext: '.js'
			},
			compile_config : {
				files: {
					'config/requirejs.js': 'config/requirejs.coffee'
				}
			}
		},
		less: {
			development: {
				files: {
					"public/css/main.css": "public/css/main.less"
				}
			},
			production: {
				options: {
					yuicompress: true
				},
				files: {
					"public/css/main.css": "public/css/main.less"
				}
			}
		},
		clean: {
				all: [
					"app/**/*.js",
					"app/*.js",
					'config/*.js',
					'index.js',
					'public/js/**/*.js',
					'tests/client/**/*.js',
					'!public/js/vendor/**/*.js'
					]
		},
		mochaTest: {
			allServerTests: {
				options: {
					reporter: 'nyan',
					compilers: 'coffee-script',
					timeout: '3000'
				},
				src: ['tests/server/**/*.coffee']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-coffeelint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('test', ['env:development', 'coffeelint', 'coffee', 'mochaTest', 'karma:single']);
	grunt.registerTask('production', ['env:production','coffee', 'copy:development', 'requirejs', 'copy:production', 'concat:allLessFilesToOneMain', 'less:production']);
	grunt.registerTask('development', ['env:development', 'coffee', 'copy:development', 'concat:allLessFilesToOneMain', 'less:development']);
	grunt.registerTask('default', ['test', 'development',  'concurrent:development', 'clean']);
};
