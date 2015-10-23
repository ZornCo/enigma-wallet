'use strict';

module.exports = function(grunt)
{
	grunt.loadTasks('src/tasks');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		react: {
			jsx: {
				files: [
					{
						expand: true,
						cwd: 'src/app',
						src: [ '**/*.jsx' ],
						dest: 'build/app',
						ext: '.js'
					}
				]
			}
		},

		watch: {
			react: {
				files: 'src/app/**/*.jsx',
				tasks: ['react']
			},
			copy: {
				files: ['src/**/*', '!src/app/**/*', '!src/tasks/**/*'],
				tasks: ['copy']
			}
		},

		copy: {
			files: [
				{
					cwd: 'src',
					src: ['**/*', '!app/**/*', '!tasks/**/*'],
					dest: 'build'
				}
			]
		},

		clean: ['build']
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-react');

	grunt.registerTask('default', ['react', 'copy']);
};
