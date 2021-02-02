// -------------------------------------------------------------------
// :: ICONFONT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-svg-sprite

var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');

gulp.task('icon-sprite', function () {
    return gulp.src('src/icons/*.svg')
        .pipe(svgSprite({
            dest: 'styles',
            mode: {
                symbol: {
                    dest: '',
                    sprite: '../images/ai.svg',
                    common: 'ai',
                    inline: true,
                    prefix: '.ai-'
                },
            },
            shape: {
                dimension: {
                    maxWidth: 24,
                    maxHeight: 24
                },
                spacing: {
                    padding: 1
                }
            }
        }))
        .pipe(gulp.dest('src/styles/'));
});
