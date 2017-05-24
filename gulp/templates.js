// -------------------------------------------------------------------
// :: TEMPLATING
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-nunjucks

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var sassVars = require('sass-vars-to-js');

gulp.task('render-templates', function () {

    return gulp.src([
        'src/**/*.njk'
    ])
    .pipe(plumber())
    .pipe(nunjucks.compile(getTemplateData()))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest('.tmp'));

});

function getTemplateData(){
	var data = {};

    data.VERSION_INFO = JSON.parse(require('fs').readFileSync('package.json', 'utf8'));
	data.COLORS = stripDefaults(sassVars('src/styles/quarks/_quarks.colors.scss'));
    data.VARIABLES = stripDefaults(sassVars('src/styles/quarks/_quarks.variables.scss'));
	
    // console.log(data);
	return data;
}

function stripDefaults(values) {
    var response = {};

    Object.keys(values).forEach(function(key) {
        if(values[key].indexOf(" !default") !== -1 && key.indexOf("instagram") === -1) {
            response[key] = values[key].replace(' !default', '');
        }
        // console.log(colors[key]);
    });

    return response;
}
