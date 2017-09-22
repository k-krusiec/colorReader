var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var cssnano = require('gulp-cssnano');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('js', function () {
  return browserify({entries: './src/js/app.js', debug: true})
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

gulp.task('copyImages', function () {
  return gulp.src('./src/images/**/*')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', ['sass', 'js', 'copyImages'], function () {
  livereload.listen();
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'copyImages', 'watch']);
