
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');  

gulp.task('connect', connect.server({
  root: ['app'],
  port: 4000,
  livereload: true
}));

gulp.task('html', function () {
  return gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src('./app/sass/*.scss')
    .pipe(sass({style: 'compressed'}))
    .pipe(autoprefixer('last 5 version'))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/sass/*.scss'], ['css']);
});

gulp.task('default', ['connect', 'watch']);








