// -------------------------------------------------------------------
// :: GIT
// -------------------------------------------------------------------
// - https://www.npmjs.com/package/gulp-git

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var git = require('gulp-git');

gulp.task('git', function() {

	var fs = require('fs');
	var p = JSON.parse(fs.readFileSync('./package.json'));
	var version = p.version;
	console.log(version);

	return gulp.src(['./dist/*', './bower.json', './package.json'])
		.pipe(git.add())
		.pipe(git.commit('Release v' + version));
});
