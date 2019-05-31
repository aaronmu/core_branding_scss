// -------------------------------------------------------------------
// :: BUILD
// -------------------------------------------------------------------
// - https://www.npmjs.com/package/gulp-replace

var gulp = require('gulp');
var fs = require('fs');

var replace = require('gulp-replace');

gulp.task('cdn', function (callback) {
    var nodePackageFile = JSON.parse(fs.readFileSync('./package.json'));
    var version = nodePackageFile.version;

    fs.rename('dist/travis', 'dist/' + version, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('\n----++++ https://cdn.antwerpen.be/core_branding_scss/' + version + '/main.min.css ++++----\n');
            callback();
        }
    });
});

gulp.task('replace', function() {
    return gulp.src(['.tmp/**/main.css', '.tmp/**/styleguide.css'])
        .pipe(replace('../../', '../'))
        .pipe(gulp.dest('docs'));
});
