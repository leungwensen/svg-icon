const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConf = require('../webpack.config');

gulp.task('pack', ['eslint', 'babel'], (done) => {
  webpack(webpackConf, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
    done();
  });
});
