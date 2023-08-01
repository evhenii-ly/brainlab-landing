const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence').use(gulp);
const log = require('fancy-log');

const config = require('../config');

const assets = ['images', 'webp', 'fonts', 'static', 'sprite'];

if (config.html.run) {
  assets.push('html');
}

if (config.pug.run) {
  assets.push('pug');
}

gulp.task('default', (cb) => {
  config.production
    ? runSequence('clean', assets, ['css', 'js'], 'sizeReport', cb)
    : runSequence('css', 'watch', cb);
});
