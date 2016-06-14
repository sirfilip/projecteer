var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');



gulp.task('build', function() {
  return browserify(
    glob.sync('public/js/react/**/*.js')
      .concat(['public/js/app.js'])
  , { debug: true })
  .transform(babelify, {presets: 'react'})
  .bundle()
  .on('error', console.error)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public/js'));
});


// gulp.task('build', function() {
//   return gulp.src([
//     'public/js/react/components/LoginForm.js',
//     'public/js/react/components/RegistrationForm.js',
//     'public/js/react/components/Dashboard.js',
//     'public/js/react/app.js'
//   ])
//   .pipe(babel({
//     plugins: ['transform-react-jsx']
//   }))
//   .pipe(concat('bundle.js'))
//   .pipe(rename({suffix: '.min'}))
//   .pipe(uglify())
//   .pipe(gulp.dest('public/js/'));
// });

gulp.task('sass', function() {
  return gulp.src([
    'public/scss/style.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/react/**/*.js', ['build']);
  gulp.watch('public/scss/**/*.scss', ['sass']);
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['build', 'sass', 'watch', 'start']);
