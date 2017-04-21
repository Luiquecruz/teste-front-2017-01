///////////////// required modules /////////////////

var gulp = require('gulp'),
	 sass = require('gulp-sass'),
	 autoPrefixer = require('gulp-autoprefixer'),
	 concat = require('gulp-concat'),
	 uglifycss = require('gulp-uglifycss'),
	 rename = require('gulp-rename'),
	 plumber = require('gulp-plumber'),
	 browserSync = require('browser-sync'),
	 reload = browserSync.reload;

///////////////// tasks /////////////////

// browserSync task
gulp.task('browser-sync', function() {
	browserSync({server: true});
});

// html task
gulp.task('html', function() {
	gulp.src('../teste-front-2017-01/*.html')
	.pipe(reload({stream: true})); // live reload
});

// combine .scss and .css files and minify into a main.min.css file
gulp.task('styles', function() {
	gulp.src([
		'assets/scss/*.scss',
	 	'!assets/scss/*min.scss'
	])
	.pipe(plumber())
	.pipe(sass())
	.pipe(concat('main.css'))
	.pipe(autoPrefixer())
	.pipe(uglifycss({'uglyComments': true}))
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('assets/css'))
	.pipe(reload({stream: true})); // live reload
});

///////////////// watch /////////////////

gulp.task('watch', function() {
  gulp.watch('assets/scss/*.scss', ['styles']);
  gulp.watch('../teste-front-2017-01/*.html', ['html']);
});

///////////////// default /////////////////

gulp.task('start', ['styles', 'html', 'browser-sync', 'watch']);