const gulp = require('gulp');
const util = require('gulp-util');
const webpack = require('webpack');
const webpackConf = require('../webpack.config');

gulp.task('pack', () => {
  webpack(webpackConf, (err, stats) => {
    if (err) {
      throw new util.PluginError('webpack', err);
    }
    util.log('[webpack]', stats.toString({
      colors: true
    }));
  });
});
