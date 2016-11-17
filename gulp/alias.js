const gulp = require('gulp');

gulp.task('dev', [
  'webpack-dev',
]);

gulp.task('lint', [
  'eslint',
]);

gulp.task('watch', [
  'watch-templates',
]);

gulp.task('default', [
  'watch',
  'dev',
]);
