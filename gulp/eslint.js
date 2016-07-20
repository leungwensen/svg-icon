'use strict';
const path = require('path');
const lang = require('zero-lang');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const config = require('./config');

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

lang.each(config.lintingDirs, (dir) => {
  gulp.task(
    `eslint-${dir}`, () => {
      const srcPath = path.resolve(__dirname, `../${dir}/**/*.js`);
      gulp.src(srcPath)
        .pipe(eslint())
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(path.resolve(__dirname, `../${dir}/**/*.js`))))
        .pipe(eslint.failAfterError());
    }
  );
});

gulp.task('eslint', lang.map(config.lintingDirs, (dir) => `eslint-${dir}`));
