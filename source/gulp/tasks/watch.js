var gulp = require('gulp');
var watch = require('gulp-watch');

var path = require('../paths.js');

gulp.task('watch', function(){
    watch([path.watch.images], function(event, cb) {
        gulp.start('build:images');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('build:styles');
    });
    watch([path.watch.scripts], function(event, cb) {
        gulp.start('build:scripts');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('deploy:ftp');
    });
});
