// -------------------------------------------------------------------
// :: COPY
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-rename
// - https://www.npmjs.com/package/merge-stream

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var merge = require('merge-stream');

gulp.task('copy', function() {

    var fontsStream = gulp.src('src/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/fonts'));

    var stylesStream = gulp.src('src/styles/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/styles'));

    return merge(fontsStream, stylesStream);

});
