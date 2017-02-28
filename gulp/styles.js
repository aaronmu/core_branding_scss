// -------------------------------------------------------------------
// :: SASS
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-sass
// - https://www.npmjs.org/package/gulp-merge-media-queries
// - https://www.npmjs.org/package/gulp-autoprefixer
// - https://www.npmjs.com/package/gulp-postcss
// - https://www.npmjs.com/package/autoprefixer
// - https://www.npmjs.com/package/cssnano

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var mergeMediaQueries = require('gulp-merge-media-queries');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

gulp.task('sass', function () {

    var sourcemapOptions = {
        includeContent: false,
        sourceRoot: "../../styles"
    };

    var postcssConfig = [
        autoprefixer({ browsers: ["last 3 versions"] }),
        cssnano()
    ];

    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: false
        }).on('error', sass.logError))
        .pipe(mergeMediaQueries({ use_external: true }))
        .pipe(postcss(postcssConfig))
        .pipe(sourcemaps.write("maps", sourcemapOptions))
        .pipe(gulp.dest('.tmp/css'));

});


// -------------------------------------------------------------------
// :: SASS LINT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-sass-lint

var sassLint = require('gulp-sass-lint');

gulp.task('sass-lint', function () {

    return gulp.src([
            'src/styles/**/*.scss',
            '!src/styles/quarks/_quarks.mixins.scss',
            '!src/styles/base/_base.normalize.scss'
        ])
        .pipe(sassLint({
            configFile: ".sass_lint.yml",
            options: {
                'merge-default-rules': true
            }
        }))
        .pipe(sassLint.format());

});
