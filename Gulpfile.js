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
    server = require('./gulp/server'),
    styles = require('./gulp/styles'),
    templates = require('./gulp/templates');


// -------------------------------------------------------------------
// :: GULP DEFAULT
// -------------------------------------------------------------------

gulp.task('default', ['server'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('build', ['clean-dist'], function(callback) {
	var run = require('run-sequence').use(gulp);

	run(['icon-font', 'sass-dist', 'copy'], function(){
		console.log('############################\n##### Build succeeded! #####\n############################');
		callback();
	});

});
