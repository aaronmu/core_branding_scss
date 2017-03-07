// -------------------------------------------------------------------
// :: GULP CONFIGURATION
// -------------------------------------------------------------------


// -------------------------------------------------------------------
// :: COMMON TASKS
// -------------------------------------------------------------------
//
// - gulp: defaults to 'gulp server' and opens it in the browser

'use strict';

var gulp = require('gulp');

var clean = require('./gulp/clean'),
	copy = require('./gulp/copy'),
    server = require('./gulp/server'),
    styles = require('./gulp/styles'),
    templates = require('./gulp/templates');


// -------------------------------------------------------------------
// :: GULP DEFAULT
// -------------------------------------------------------------------

gulp.task('default', ['server'], function () {
    // Auto-open browser window
    // - https://www.npmjs.org/package/opn

    require('opn')('http://localhost:9000');
});

gulp.task('build', [

	'clean-dist'

], function(callback) {
	var run = require('run-sequence').use(gulp);

	gulp.distLocation = 'dist';

	run(['sass-dist', 'copy'], function(){
		console.log('##### YEAH! #####');
		callback();
	});

});
