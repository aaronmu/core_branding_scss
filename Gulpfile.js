// -------------------------------------------------------------------
// :: GULP CONFIGURATION
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/opn


// -------------------------------------------------------------------
// :: COMMON TASKS
// -------------------------------------------------------------------
//
// - gulp: defaults to 'gulp server' and opens it in the browser

'use strict';

var gulp = require('gulp');

var clean = require('./gulp/clean'),
	copy = require('./gulp/copy'),
	copy = require('./gulp/iconfont'),
    git = require('./gulp/git'),
    semver = require('./gulp/semver'),
    server = require('./gulp/server'),
    styles = require('./gulp/styles'),
    templates = require('./gulp/templates');


// -------------------------------------------------------------------
// :: GULP DEFAULT
// -------------------------------------------------------------------

// Default task = run server
gulp.task('default', ['server'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('build', ['clean-dist'], function(callback) {
	var run = require('run-sequence').use(gulp);

	run(['icon-font', 'sass-dist', 'copy'], function(){
		callback();
	});

});

gulp.task('release', ['build'], function(callback) {
	var run = require('run-sequence').use(gulp);

	run(['semver'], 'git', function(){

		// Log the new version
		var fs = require('fs');
		var p = JSON.parse(fs.readFileSync('./package.json'));
		var version = p.version;

		console.log('\n----++++ Version ' + version + ' released! ++++----\n');
		callback();
	});

});
