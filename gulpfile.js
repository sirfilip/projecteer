var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('build', function() {
  return gulp.src([
    'public/js/react/components/auth.js',
    'public/js/react/app.js'
  ])
  .pipe(babel({
    plugins: ['transform-react-jsx']
  }))
  .pipe(concat('bundle.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/react/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
