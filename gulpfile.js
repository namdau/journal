var gulp = require('gulp')

// gulp plugins and utils
var gutil = require('gulp-util')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var zip = require('gulp-zip')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var cache = require('gulp-cache')
var browserSync = require('browser-sync').create()

// postcss plugins
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var easyimport = require('postcss-easy-import')

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost:2368',
    open: false,
    injectChanges: true,
    files: ['assets/styles/*.css', 'assets/scripts/*.js'],
  })
})

var swallowError = function swallowError(error) {
  gutil.log(error.toString())
  gutil.beep()
  this.emit('end')
}

gulp.task('images', function() {
  gulp
    .src('src/images/**/*')
    .pipe(
      cache(
        imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }),
      ),
    )
    .pipe(gulp.dest('assets/built/images'))
})

gulp.task('css', function() {
  var processors = [
    easyimport,
    autoprefixer(['last 2 version']),
    cssnano({
      discardComments: { removeAll: true },
      mergeidents: true,
      discardDuplicates: true,
      discardEmpty: true,
      mergeRules: true,
      mergeLonghand: true,
      minifyFontValues: true,
      normalizeWhitespace: true,
      reduceInitial: true,
      reduceTransforms: true,
      uniqueSelectors: true,
    }),
  ]

  return gulp
    .src('assets/styles/main.css')
    .on('error', swallowError)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/built/'))
})

gulp.task('js', function() {
  return gulp
    .src('assets/scripts/**/*.js')
    .on('error', swallowError)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/built/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/built/'))
})

gulp.task('watch', function() {
  gulp.watch('assets/styles/**/*.css', ['css'])
  gulp.watch('assets/scripts/**/*.js', ['js'])
  gulp.watch('*.hbs').on('change', browserSync.reload)
})

gulp.task('default', ['css', 'js', 'images', 'browser-sync'], function() {
  gulp.start('watch')
})

gulp.task('zip', ['css', 'js', 'images'], function() {
  var targetDir = 'dist/'
  var themeName = require('./package.json').name
  var filename = themeName + '.zip'

  return gulp
    .src(['**', '!node_modules', '!node_modules/**', '!dist', '!dist/**'])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir))
})