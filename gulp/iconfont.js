// -------------------------------------------------------------------
// :: ICONFONT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-imagemin
// - https://www.npmjs.org/package/gulp-iconfont
// - https://www.npmjs.org/package/gulp-consolidate
// - https://www.npmjs.org/package/lodash
// - https://www.npmjs.org/package/gulp-rename

var gulp = require('gulp');

var imagemin = require('gulp-imagemin'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    rename = require('gulp-rename');

gulp.task('icon-font', function() {
    var fontName = 'Antwerpen_Icons';

    // Set svg-sources, optimize svg
    // and start creating the font

    // disable `convertPathDate` and `mergePaths`
    // REASON: merge paths together isn't that great of an idea especialy when applying different fill colors to seperate paths
    return gulp
        .src('src/icons/*.svg')
        .pipe(
            imagemin([
                imagemin.svgo({
                    plugins: [{ convertPathData: false }, { mergePaths: false }]
                })
            ])
        )
        .pipe(
            iconfont({
                // Set file-name for the font and append
                // codepoints so we always have the same
                // CSS codes (eg. content: '\e001')

                appendCodePoints: true,
                fontName: fontName,
                fontHeight: 1001,
                formats: ['woff', 'ttf', 'eot', 'svg'],
                normalize: true
            })
        )
        .on('glyphs', function(glyphs, options) {
            // Create the _antwerp-icons-template.scss file based
            // on the template and inject font-name
            // path and CSS class-name

            gulp.src('src/icons/_antwerp-icons-template.scss')
                .pipe(
                    consolidate('lodash', {
                        className: 'icon',
                        fontName: fontName,
                        fontPath: '../../fonts',
                        glyphs: glyphs
                    })
                )
                .pipe(rename('_base.antwerpen-icons.scss'))
                .pipe(gulp.dest('src/styles/base'));
        })
        .pipe(gulp.dest('src/fonts'));
});
