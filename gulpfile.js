'use strict';

/* - Includes - */
const gulp = require('Gulp');
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const image = require('gulp-image');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

/* - File paths - */
const files = {
  htmlPath: "src/*.html",
  sassPath: "src/**/*.scss",
  jsPath: "src/js/*.js",
  imgPath: "src/img/*"
}

// Task: Generate source map, compile SASS-files, add prefixes and rename CSS-file.
function sassTask()
{
  return gulp.src(files.sassPath)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({ browsers: ['IE 6','Chrome 9', 'Firefox 14']}))
  .pipe(rename("styles.css"))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('pub/css'))
  .pipe(browserSync.stream());
}

// Task: Generate sourcemap and minify Javascript.
function jsTask()
{
  return gulp.src(files.jsPath)
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('pub/js'))
  .pipe(browserSync.stream());
}

// Task: Copy HTML.
function htmlTask()
{
  return gulp.src(files.htmlPath)
  .pipe(gulp.dest('pub'))
  .pipe(browserSync.stream());
}

// Task: Optimize images.
function imgTask()
{
  return gulp.src(files.imgPath)
  .pipe(image())
  .pipe(gulp.dest('pub/img'))
  .pipe(browserSync.stream());
}

// Task: Watcher.
function watchTask()
{
  // - Establish local server connection.
  browserSync.init({
    server: {
        baseDir: 'pub/'
    }
  });

  // - Watch files.
  gulp.watch([files.htmlPath, files.sassPath, files.jsPath, files.imgPath],
    gulp.parallel(htmlTask, sassTask, jsTask, imgTask)
  ).on('change', browserSync.reload);
}

/* - Default - */
exports.default = gulp.series(
  gulp.parallel(htmlTask, sassTask, jsTask, imgTask),
  watchTask
);