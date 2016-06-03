var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('transform', function() {
  gulp.src('public/js/src/**/*.js')
    .pipe(babel({
      plugins: ['transform-react-jsx']
    }))
    .pipe(gulp.dest('public/js/dist'));
});

gulp.task('concat', function() {
  gulp.src([
    'public/js/dist/components/auth.js',
    'public/js/dist/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/src/**/*.js', ['transform', 'concat']);
});

gulp.task('default', ['watch']);
