const gulp = require('gulp')
const sass = require('gulp-sass')
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create()

const baseDir = './src';

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

gulp.task('html', function() {
  return gulp.src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src(baseDir + '/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'html', 'sass'], function (){
  gulp.watch(baseDir + '/stylesheets/*.scss', ['sass'])

  gulp.watch(baseDir + '/javascripts/*.js', browserSync.reload)
})