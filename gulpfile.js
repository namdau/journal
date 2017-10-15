require('es6-promise').polyfill();

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    size = require('gulp-size'),
    zip = require('gulp-zip');
    

var config = {
    proxy: 'localhost:2368',
    open: false,
    injectChanges: true,
    files: ["assets/styles/*.css", "assets/scripts/*.js"]
};

gulp.task('browser-sync', function() {
    browserSync(config);
});

gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/images/'));
});

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('assets/styles/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/styles/'));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/scripts/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/scripts/'));
});

gulp.task('fonts', function() {
    return gulp.src('./node_modules/font-awesome/fonts/*.*').pipe(gulp.dest('assets/fonts/'))
});

// Static Server + watching scss/html files
gulp.task('default', ['styles', 'scripts', 'fonts', 'images', 'browser-sync'], function() {
    gulp.watch("src/styles/**/*.scss", ['styles']);
    gulp.watch("src/scripts/**/*.js", ['scripts']);
    gulp.watch(config.nodeDir + '/font-awesome/fonts/*', ['fonts']);
    gulp.watch("*.hbs").on('change', browserSync.reload);
});

gulp.task('zip', function(){
    gulp.src(['./**', '!node_modules', '!node_modules/**', '!zip', '!zip/**'])
    .pipe(zip('built.zip'))
    .pipe(gulp.dest('zip'))
})

gulp.task('build', ['styles', 'scripts', 'images', 'fonts', 'zip'], function() {
    return gulp.src(['src/**/*.*']).pipe(size({
        title: 'build',
        gzip: true
    }));
});
