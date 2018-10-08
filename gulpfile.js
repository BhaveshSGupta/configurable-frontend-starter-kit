const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

const baseDir = './src';

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

gulp.task('sass', function() {
    return gulp.src(baseDir + '/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(baseDir + '/stylesheets/*.scss', ['sass'])

  gulp.watch(baseDir + '/javascripts/*.js', browserSync.reload)
})