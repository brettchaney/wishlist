var gulp = require('gulp');
var browserSync = require("browser-sync");

var config = require('../config.js');

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: config.deploy.base
        },
        tunnel: config.serve.tunnel,
        host: config.serve.host,
        port: config.serve.port,
        logPrefix: config.serve.log
    });
});
