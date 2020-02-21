// -------------------------------------------------------------------
// :: ICONFONT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-svg-sprite

var gulp = require('gulp');
var cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    svgSprite = require('gulp-svg-sprite');

gulp.task('icon-sprite', function () {
    return gulp.src('src/icons/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: {xmlMode: true}
        }))
        // Cheerio plugin sometimes creates unnecessary string '&gt;'
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            dest: 'styles',
            // transform: [
            //     {
            //         svgo: {
            //             plugins: [
            //                 {
            //                     mergePaths: false
            //                 }
            //             ]
            //         }
            //     }
            // ],
            mode: {
                symbol: {
                    dest: '',
                    sprite: '../images/ai.svg',
                    common: 'ai',
                    prefix: '.ai-'
                },
                css: {
                    dest: '',
                    // example: true,
                    sprite: '../images/sprite.svg',
                    common: 'ai',
                    prefix: '.ai-',
                    render: {
                        scss: {
                            dest: '_antwerpen-icons.scss'
                        }
                    }
                }
            },
            shape: {
                dimension: {
                    maxWidth: 48,
                    maxHeight: 48
                },
                spacing: {
                    box: 'padding',
                    padding: 1
                }
            }
        }))
        .pipe(gulp.dest('src/styles/'));
});
