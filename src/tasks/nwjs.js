'use strict';

module.exports = function(grunt)
{
	var https = require('https');

	grunt.registerTask('nwjs', 'Copy src files to dest', function() {
		var done = this.async();

		var options = grunt.config('nwjs');
		var req = https.request({
				hostname: 'api.github.com',
				path: '/repos/nwjs/nw.js/tags',
				headers: {'User-Agent': 'enigma-wallet'}
			}, function(res)
			{
				var jsonResponse = '';

				res.on('data', function(data)
				{
					jsonResponse += data
				});

				res.on('end', function()
				{
					var tags = JSON.parse(jsonResponse);

					var latest_major = 0;
					var latest_minor = 0;
					var latest_build = 0;

					tags.forEach(function(tag)
					{
						var matches;
						if(!(matches = tag.name.match(/^nw-v(\d+)\.(\d+)\.(\d+)$/i)))
						{
							return;
						}

						if(matches[1] > latest_major || (matches[1] == latest_major && matches[2] > latest_minor) || (matches[1] == latest_major && matches[2] == latest_minor && matches[3] > latest_build))
						{
							latest_major = matches[1];
							latest_minor = matches[2];
							latest_build = matches[3];
						}
					});

					var latestNwjs = 'https://api.github.com/repos/nwjs/nw.js/zipball/nw-v' + latest_major + '.' + latest_minor + '.' + latest_build;

					done(true);
				})
			});
		req.end();

		req.on('error', function(e)
		{
			done(false);
		});
	});
};
