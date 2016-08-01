const gulp = require('gulp');

gulp.task('data', ['demo-data']);
gulp.task('lint', ['eslint']);
gulp.task('default', [
  'watch',
  'dev'
]);
