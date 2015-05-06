module.exports = function(grunt) {

	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: '*',
				}
			}
		},
		watch: {
			all: {
				files: 'scss/*.scss',
				tasks: ['sass', 'autoprefixer'],
				options: {
					debounceDelay: 250,
				},
			},
		},
		sass: {
			dist: {
				files: {
					'build/style.css': 'scss/style.scss'
				}
			}
		},
		autoprefixer: {
			single_file: {
		    	options: {
		    		browsers: ['last 2 versions', 'ie 9'],
		    		map: true
		    	},
		    	src: 'build/style.css',
		    	dest: 'style.css'
		    },
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer')

	grunt.registerTask('default', ['connect', 'watch']);

}