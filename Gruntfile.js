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
				files: '*',
				tasks: [''],
				options: {
					debounceDelay: 250,
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['connect', 'watch']);

}