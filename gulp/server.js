// -------------------------------------------------------------------
// :: GULP SERVER
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-watch
// - https://www.npmjs.org/package/gulp-livereload
// - https://www.npmjs.org/package/run-sequence

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var run = require('run-sequence');

gulp.task('server', function(callback) {

    return run('clean', ['sass', 'render-templates', 'sass-lint'], function () {
        livereload.listen();
        gulp.start('connect');
        gulp.watch('src/styles/**/*.scss', ['sass', 'sass-lint']);
        gulp.watch('src/index.njk', ['render-templates']);
        gulp.watch([
            '.tmp/**/*.css',
            '.tmp/**/*.html'
        ]).on('change', livereload.changed);

        callback();
    });

});


// -------------------------------------------------------------------
// :: CONNECT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/serve-static
// - https://www.npmjs.org/package/serve-index
// - https://www.npmjs.org/package/connect
// - https://www.npmjs.org/package/connect-livereload
// - https://www.npmjs.org/package/http

var serveStatic = require('serve-static');
var	serveIndex = require('serve-index');
var connect = require('connect');
var connectLivereload = require('connect-livereload');
var http = require('http');

gulp.task('connect', function() {

    // Create the middleware and add the live-reload script
    var app = connect().use(connectLivereload({port: 35729}))
         .use(serveStatic('.tmp'))
         .use(serveIndex('.tmp'))
         .use(serveStatic('src'));

    // Create server and start listening
    return http.createServer(app).listen(9000);

});

