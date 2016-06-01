const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const _ = require('underscore');
const config = require('./config');

_.each(config.babelTasks, (task, key) => {
  gulp.task(`babel-${key}`, () =>
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(babel({
        presets: [
          'es2015'
        ]
      }))
      .on('error', (err) => {
        gutil.log(gutil.colors.red(err.message));
      })
      .pipe(gulp.dest(task.dest))
  );
});

gulp.task('babel', _.map(config.babelTasks, (tasks, key) => `babel-${key}`));
