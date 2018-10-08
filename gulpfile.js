const gulp = require('gulp')
const sass = require('gulp-sass')
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create()
const babel = require("gulp-babel");

const baseDir = './src';

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

gulp.task("babel", function () {
  return gulp.src(baseDir + '/javascripts/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', function() {
  return gulp.src([baseDir + '/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function() {
    return gulp.src(baseDir + '/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'html', 'sass', 'babel'], function (){
  gulp.watch(baseDir + '/stylesheets/*.scss', ['sass'])
  gulp.watch(baseDir + '/*.html', ['html'])
  gulp.watch(baseDir + '/javascripts/*.js', ['babel'])
})
