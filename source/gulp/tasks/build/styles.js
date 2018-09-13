var gulp = require('gulp');
var concat = require("gulp-concat");
var rename = require('gulp-rename');
var rigger = require('gulp-rigger');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var cssmin = require('gulp-minify-css');
var csso = require('gulp-csso');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = require('../../paths.js');
var error = require('../../error.js');

gulp.task('build:styles', function () {
    gulp.src(path.src.styles)
        .pipe(rigger())
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compressed',
            sourceMap: false,
            errLogToConsole: true
        }))
        .on('error',error.handler)
        .pipe(cssmin())
        .pipe(csso())
        .pipe(concat('wishlist.min.css'))
        .pipe(gulp.dest(path.build.styles))
        .pipe(reload({stream: true}));
});
