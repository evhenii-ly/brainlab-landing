const fileInclude = require('gulp-file-include');
const gulp = require('gulp');
const pug = require('gulp-pug');
const pugbem = require('gulp-pugbem');
const notify = require('gulp-notify');
const path = require('path');
const plumber = require('gulp-plumber');
const { reload } = require('browser-sync');

const config = require('../config');

gulp.task('pug', () =>
  gulp
    .src(path.join(config.root.dev, config.pug.dev, './*.pug'))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      pretty: true,
      plugins: [pugbem],
    }))
    .pipe(gulp.dest(path.join(config.root.dist, config.pug.dist)))
    .pipe(reload({ stream: true })));

