'use strict';

module.exports = function(grunt)
{
	var path = require('path');

	grunt.registerTask('copy', 'Copy src files to dest', function() {
		var options = grunt.config('copy');

		if (options.files.length < 1) {
			grunt.verbose.warn('Destination not written because no source files were provided.');
		}

		options.files.forEach(function(files)
		{
			grunt.file.expand({cwd: files.cwd, filter: 'isFile'}, files.src).forEach(function(file)
			{
				grunt.file.copy(path.join(files.cwd, file), path.join(files.dest, file));
			});
		});
	});
};
