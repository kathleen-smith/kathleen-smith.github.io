/*!
    gulp
    npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-concat gulp-watch gulp-uglify gulp-notify gulp-rename --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

// Styles
gulp.task('styles', function() {

    return gulp.src([
            'styles/scss/main.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        // .pipe(gulp.dest('../Build/wp-content/themes/THEME-NAME/styles/css'))
        .pipe(gulp.dest('styles/css'));
});

gulp.task('styleguide-styles', function() {

    return gulp.src([
            'styles/scss/styleguide.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('styleguide.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('styles/css'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src([
            'scripts/ext/jquery.min.js',
            // Add other scripts here...
            'scripts/functions.js'
        ])
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        // .pipe(gulp.dest('../Build/wp-content/themes/THEME-NAME/scripts'))
        .pipe(gulp.dest('scripts'));
});

// Default task
gulp.task('default', ['styles', 'scripts'], function() {

});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('styles/**/*.scss', ['styles', 'styleguide-styles']);

    // Watch .js files
    gulp.watch('scripts/functions.js', ['scripts']);
});