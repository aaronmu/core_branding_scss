// -------------------------------------------------------------------
// :: GIT
// -------------------------------------------------------------------
// - https://www.npmjs.com/package/gulp-git

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var git = require('gulp-git');

var fs = require('fs');
var p = JSON.parse(fs.readFileSync('./package.json'));
var version = p.version;

gulp.task('git-add', function(){
  return gulp.src('./dist/*')
    .pipe(git.add());
});

gulp.task('git-commit', function(){
  return gulp.src('./dist/*')
    .pipe(git.commit('Release v' + version));
});
