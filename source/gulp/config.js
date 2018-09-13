module.exports = {
    serve: {
        host:   'localhost',
        port:   5000,
        tunnel: false,
        log:    'T2 Wishlist'
    },
    deploy: {
        base: './build',
        repository: 'https://github.com/brettt2/wishlist.git',
        files: [
            'build/assets/**',
            'build/*.html'
        ]
    }
};
