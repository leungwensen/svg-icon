const path = require('path');
const _ = require('underscore');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jsdoc = require('gulp-jsdoc3');
const plumber = require('gulp-plumber');
const config = require('./config');

_.each(config.jsdocDirs, (dir) => {
  const c = _.extend({}, config.jsdocConfig, {
    opts: {
      destination: path.resolve(__dirname, `../doc/jsdoc/${dir}`)
    }
  });
  gulp.task(`jsdoc-${dir}`, () =>
      gulp.src(path.resolve(__dirname, `../${dir}/**/*.js`), {
        read: false
      })
        .pipe(plumber())
        .pipe(jsdoc(c))
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
  );
});

gulp.task('jsdoc', _.map(config.jsdocDirs, (dir) => `jsdoc-${dir}`));
