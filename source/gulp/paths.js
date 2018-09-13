module.exports = {
    build: {
        html: 'build/',
        scripts: 'build/js/',
        styles: 'build/css/',
        images: 'build/images/wishlist/'
    },
    src: {
        html: 'source/templates/*.html',
        scripts: [
            'source/js/app.js'
        ],
        styles: [
            'source/scss/app.scss'
        ],
        images: {
            jpg: 'source/images/**/*.jpg',
            gif: 'source/images/**/*.gif',
            svg: 'source/images/**/*.svg',
            png: 'source/images/**/*.png'
        }
    },
    watch: {
        html: 'source/templates/**/*.html',
        scripts: 'source/js/**/*.js',
        styles: 'source/**/*.scss',
        images: 'source/images/**/*.*',
        js: 'build/js/teafinder.min.js'
    }
};
