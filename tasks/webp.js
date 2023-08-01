const gulp = require('gulp');
const gulpif = require('gulp-if');
const imageminWebp = require('imagemin-webp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const path = require('path');
const { reload } = require('browser-sync');

const config = require('../config');

gulp.task('webp', () =>
  gulp
    .src(path.join(config.root.dev, config.webp.dev, config.webp.extensions))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(newer(path.join(config.root.dist, config.webp.dist)))
    .pipe(webp(gulpif(
      config.production,
      imageminWebp({
        lossless: true,
        quality: 100,
        alphaQuality: 100
      }))))
    .pipe(gulp.dest(path.join(config.root.dist, config.webp.dist)))
    .pipe(debug({
      'title': 'Images'
    }))
    .pipe(reload({stream: true})));
