// VERSIONING -------------------------------------------------------------
// Keep track of the versioning of this project.
//
// - https://www.npmjs.com/package/yargs
// - https://www.npmjs.com/package/gulp-bump

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var bump = require('gulp-bump');
var yargs = require('yargs');

gulp.task('semver', function(){

	var argv = yargs.usage('Usage: gulp release --<versionType>')
		// .example('gulp release --patch', 'updates the version with 1 patch number')
		.option('patch', {
			demand: false,
			describe: 'Patch release',
			type: 'boolean'
		})
		.option('minor', {
			demand: false,
			describe: 'Minor release',
			type: 'boolean'
		})
		.option('major', {
			demand: false,
			describe: 'Major release',
			type: 'boolean'
		})
		.help('h')
		.argv;

	var fs = require('fs');
	var p = JSON.parse(fs.readFileSync('./package.json'));
	var version = p.version;

	if(argv.patch){
		version = 'patch'
	} else if(argv.minor) {
		version = 'minor'
	} else if(argv.major) {
		version = 'major'
	}

	// update the version

	return gulp.src('./*.json')
	  .pipe(bump({
	  	type: version
	  }))
	  .pipe(gulp.dest('./'));

});

// inject the version info into distributionfiles:

// var gulpIf = require('gulp-if');
// // var replace = require('gulp-replace');
// var insert = require('gulp-insert');
// var config = require('../gulp/config/config.json');


// gulp.task('inject-versioning', function(){
// 	var versions = require('../'+versionsFilePath);

// 	return gulp.src(['dist/**'])
// 		.pipe(plumber())
// 		.pipe(gulpIf('*.css', insert.prepend("/* "+config.PROJECT_TITLE + " v"+versions.current_version + " */\n\n")))
// 		.pipe(gulpIf('*.js', insert.prepend("/* "+config.PROJECT_TITLE + " v"+versions.current_version + " */\n\n")))

// 		.pipe(gulp.dest(function(file) { return file.base; }),{overwrite: true});
// });