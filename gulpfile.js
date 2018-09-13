// settings
var fs = require('fs');
var requireDir = require('require-dir')('./source/gulp/tasks', { recurse: true });
var settings = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var path = require('./source/gulp/paths.js');

// includes
var gulp = require('gulp');

// tasks
gulp.task('start', [
    'build',
    'serve',
    'watch'
]);

gulp.task('build', [
    'build:styles',
    'build:scripts',
    'build:images',
    'build:html'
]);