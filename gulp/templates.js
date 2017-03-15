// -------------------------------------------------------------------
// :: TEMPLATING
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-nunjucks

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');

gulp.task('render-templates', function () {

    return gulp.src([
        'src/**/*.njk'
    ])
    .pipe(plumber())
    .pipe(nunjucks.compile())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest('.tmp'));

});
