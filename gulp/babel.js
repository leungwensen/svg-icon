'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const lang = require('zero-lang');
const config = require('./config');

lang.each(config.babelTasks, (task, key) => {
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

gulp.task('babel', lang.map(config.babelTasks, (tasks, key) => `babel-${key}`));
