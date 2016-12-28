var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    path = require('path'),
    beep = require('beepbeep'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    exec = require('child_process').exec,
    bs = require('browser-sync').create();

var onError = function (err) {
    beep();
    console.log(err);
};

gulp.task('browser-sync', ['styles-compile'], function() {
    bs.init({
        server: {
            baseDir: './'
        },
        open: false
    });
});

gulp.task('styles-compile', function() {
    return gulp.src('less/global.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles-compile task complete' }));
});

gulp.task('styles-minify', ['styles-compile'], function() {
    gulp.src('css/global.css')
        .pipe(cssmin())
        .pipe(gulp.dest('css/min'))
        .pipe(notify({ message: 'Styles-minify task complete' }));
});

gulp.task('javaScript-uglify', function() {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('js/min'))
        .pipe(notify({ message: 'javaScript-uglify task complete' }));
});

gulp.task('serve', ['styles-compile', 'watch']);

gulp.task('build', ['styles-minify', 'html', 'javaScript-uglify']);

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('less/*.less', ['styles-compile', bs.reload]);
  gulp.watch('js/*.js', [ 'tests', bs.reload]);
  gulp.watch('*.html').on('change', bs.reload);
});