var gulp = require('gulp');

// package.json
// var pkg = require('./package.json');

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');


gulp.task('css', function() {
	return gulp.src('sass/app.scss')
		.pipe(sass({style: 'compressed'}))
		.pipe(autoprefixer('last 5 version'))
		.pipe(gulp.dest('css'));
});


// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('css');

  gulp.watch('sass/**/*.scss', function() {
  	gulp.run('css');
  });

});


