const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const log = require('fancy-log');

const config = require('../config');

const Log = require('./lib/logger');

gulp.task('watch', gulp.series('liveReload', (done) => {
  const tasksToWatch = ['css', 'images', 'webp', 'sprite', 'static', 'fonts', 'js'];

  if (config.html.run) {
    tasksToWatch.push('html');
  }

  if (config.pug.run) {
    tasksToWatch.push('pug');
  }

  tasksToWatch.forEach((task) => {
    if (!config[ task ]) {
      return new Log('watch', `Task "${task}" is not exist.`).error();
    }

    // watch(path.resolve(config.root.dev, config[task].dev), () => {
    //   gulp.series(task);
    // });

    gulp.watch(path.resolve(config.root.dev, config[task].dev), gulp.series(task));
  });

  done();
}));

// gulp.task('watch', function () {
//   // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
//   return watch('css/**/*.css', function () {
//     gulp.src(path.resolve(config.root.dev, config.css.dev))
//       // .pipe(gulp.dest('build'));
//   });
// });
