var gulp = require('gulp');
var rename = require('gulp-rename');
var image = require('gulp-image');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = require('../../paths.js');

gulp.task('build:images', function () {
    gulp.src([path.src.images.jpg,path.src.images.gif,path.src.images.png,path.src.images.svg])
/*        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))*/
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});
