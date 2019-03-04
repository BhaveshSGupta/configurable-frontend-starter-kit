/* eslint-disable */
const gulp = require('gulp')
const sass = require('gulp-sass')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const baseDir = './src'
const distDir = './dist'

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: distDir
    }
  })
})

gulp.task('babel', function () {
  return gulp.src(baseDir + '/javascripts/*.js')
    .pipe(
      plumber({
        errorHandler (err) {
          notify.onError({
            title: `Gulp error in ${err.plugin}`,
            message: err.toString()
          })(err)
        }
      })
    )
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest(distDir + '/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('html', function () {
  return gulp.src([baseDir + '/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('sass', function () {
  return gulp.src(baseDir + '/stylesheets/*.scss')
    .pipe(
      plumber({
        errorHandler (err) {
          notify.onError({
            title: `Gulp error in ${err.plugin}`,
            message: err.toString()
          })(err)
        }
      })
    )
    .pipe(sass())
    .pipe(autoprefixer({
      // Use any option here https://github.com/browserslist/browserslist#full-list
      browsers: ['cover 99.5%'],
      cascade: false
    }))
    .pipe(gulp.dest(distDir + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})
gulp.task('watch', ['browserSync', 'html', 'sass','babel'], function () {
	gulp.watch(baseDir + '/stylesheets/*.scss', ['sass'])
  gulp.watch(baseDir + '/*.html', ['html'])
  gulp.watch(baseDir + '/javascripts/*.js', ['babel'])
})
